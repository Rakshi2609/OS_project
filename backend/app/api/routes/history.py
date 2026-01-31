"""Command history endpoints with JSON storage"""
from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.history_service import history_service
from app.core.database import get_session
from app.models.history import CommandRecord, CommandSequence
from typing import List, Optional, Dict, Any
from datetime import datetime

router = APIRouter()


@router.post("/commands")
async def save_command(record: CommandRecord) -> Dict[str, Any]:
    """Save a command to history in JSON file"""
    try:
        command_record = history_service.add_command(
            command=record.command,
            exit_code=record.exit_code or 0,
            duration=record.duration_seconds or 0.0,
            directory=record.directory or "/",
            output=getattr(record, 'output', "")
        )
        return {
            "status": "success",
            "message": "Command saved to history",
            "data": command_record
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save command: {str(e)}")


@router.get("/commands")
async def get_commands(
    limit: int = Query(100, le=1000),
    search: Optional[str] = None
) -> Dict[str, Any]:
    """Get command history from JSON file"""
    try:
        commands = history_service.get_commands(limit=limit, search=search)
        return {
            "status": "success",
            "data": commands,
            "total": len(commands)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get commands: {str(e)}")


@router.get("/git-commits")
async def get_git_commits(
    limit: int = Query(10, le=50),
    repo_path: str = Query(".", description="Repository path")
) -> Dict[str, Any]:
    """Get recent git commits"""
    try:
        commits = history_service.get_git_commits(limit=limit, repo_path=repo_path)
        return {
            "status": "success",
            "data": commits,
            "total": len(commits)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get git commits: {str(e)}")


@router.get("/statistics")
async def get_statistics() -> Dict[str, Any]:
    """Get command usage statistics"""
    try:
        stats = history_service.get_statistics()
        return {
            "status": "success",
            "data": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get statistics: {str(e)}")


@router.post("/export")
async def export_history() -> Dict[str, Any]:
    """Export all history data"""
    try:
        export_path = history_service.export_data()
        return {
            "status": "success",
            "message": "History exported successfully",
            "export_path": export_path
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to export history: {str(e)}")


@router.get("/data")
async def get_raw_data() -> Dict[str, Any]:
    """Get raw JSON data"""
    try:
        data = history_service.load_data()
        return {
            "status": "success",
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get raw data: {str(e)}")


@router.get("/commands", response_model=dict)
async def get_command_history(
    limit: int = 50,
    search: str = None,
    favorites_only: bool = False,
    session: AsyncSession = Depends(get_session)
):
    """Get command history with optional filtering"""
    query = select(CommandHistory).order_by(CommandHistory.timestamp.desc())
    
    if search:
        query = query.where(CommandHistory.command.contains(search))
    
    if favorites_only:
        query = query.where(CommandHistory.is_favorite == True)
    
    query = query.limit(limit).offset(offset)
    
    result = await session.execute(query)
    records = result.scalars().all()
    
    return [
        CommandRecord(
            id=r.id,
            command=r.command,
            exit_code=r.exit_code,
            duration_seconds=r.duration_seconds,
            cpu_percent=r.cpu_percent,
            memory_mb=r.memory_mb,
            timestamp=r.timestamp,
            directory=r.directory,
            is_favorite=r.is_favorite
        )
        for r in records
    ]


@router.patch("/commands/{command_id}/favorite")
async def toggle_favorite(
    command_id: int,
    session: AsyncSession = Depends(get_session)
):
    """Toggle favorite status of a command"""
    result = await session.execute(
        select(CommandHistory).where(CommandHistory.id == command_id)
    )
    record = result.scalar_one_or_none()
    
    if not record:
        raise HTTPException(status_code=404, detail="Command not found")
    
    record.is_favorite = not record.is_favorite
    await session.commit()
    
    return {"id": command_id, "is_favorite": record.is_favorite}


@router.delete("/commands/old")
async def cleanup_old_commands(
    days: int = Query(90, ge=1),
    session: AsyncSession = Depends(get_session)
):
    """Delete commands older than specified days"""
    cutoff_date = datetime.utcnow() - timedelta(days=days)
    
    result = await session.execute(
        delete(CommandHistory).where(
            CommandHistory.timestamp < cutoff_date,
            CommandHistory.is_favorite == False
        )
    )
    await session.commit()
    
    return {"deleted": result.rowcount}


@router.get("/sequences", response_model=List[CommandSequence])
async def get_sequences(
    session: AsyncSession = Depends(get_session)
):
    """Get all saved command sequences"""
    result = await session.execute(select(CommandSequence))
    sequences = result.scalars().all()
    
    return [
        CommandSequence(
            id=s.id,
            name=s.name,
            commands=s.commands,
            description=s.description,
            created_at=s.created_at
        )
        for s in sequences
    ]


@router.post("/sequences", response_model=CommandSequence)
async def save_sequence(
    sequence: CommandSequence,
    session: AsyncSession = Depends(get_session)
):
    """Save a new command sequence"""
    db_sequence = CommandSequence(
        name=sequence.name,
        commands=sequence.commands,
        description=sequence.description
    )
    session.add(db_sequence)
    await session.commit()
    await session.refresh(db_sequence)
    
    return CommandSequence(
        id=db_sequence.id,
        name=db_sequence.name,
        commands=db_sequence.commands,
        description=db_sequence.description,
        created_at=db_sequence.created_at
    )


@router.delete("/sequences/{sequence_id}")
async def delete_sequence(
    sequence_id: int,
    session: AsyncSession = Depends(get_session)
):
    """Delete a command sequence"""
    result = await session.execute(
        delete(CommandSequence).where(CommandSequence.id == sequence_id)
    )
    await session.commit()
    
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Sequence not found")
    
    return {"status": "deleted"}


@router.get("/export")
async def export_history(
    format: str = Query("json", regex="^(json|csv)$"),
    session: AsyncSession = Depends(get_session)
):
    """Export command history"""
    result = await session.execute(
        select(CommandHistory).order_by(CommandHistory.timestamp.desc())
    )
    records = result.scalars().all()
    
    if format == "json":
        data = [
            {
                "command": r.command,
                "exit_code": r.exit_code,
                "duration_seconds": r.duration_seconds,
                "cpu_percent": r.cpu_percent,
                "memory_mb": r.memory_mb,
                "timestamp": r.timestamp.isoformat(),
                "directory": r.directory,
                "is_favorite": r.is_favorite
            }
            for r in records
        ]
        return {"format": "json", "data": data}
    
    # CSV format
    csv_lines = ["command,exit_code,duration_seconds,cpu_percent,memory_mb,timestamp,directory,is_favorite"]
    for r in records:
        csv_lines.append(
            f'"{r.command}",{r.exit_code},{r.duration_seconds},{r.cpu_percent},'
            f'{r.memory_mb},{r.timestamp.isoformat()},"{r.directory}",{r.is_favorite}'
        )
    
    return {"format": "csv", "data": "\n".join(csv_lines)}
