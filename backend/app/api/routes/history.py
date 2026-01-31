"""Command history endpoints"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, update
from app.core.database import get_session, CommandHistory, CommandSequence
from app.models.history import CommandRecord, CommandSequence as CommandSequenceModel
from typing import List, Optional
from datetime import datetime, timedelta

router = APIRouter()


@router.post("/commands", response_model=CommandRecord)
async def save_command(
    record: CommandRecord,
    session: AsyncSession = Depends(get_session)
):
    """Save a command to history"""
    db_record = CommandHistory(
        command=record.command,
        exit_code=record.exit_code,
        duration_seconds=record.duration_seconds,
        cpu_percent=record.cpu_percent,
        memory_mb=record.memory_mb,
        timestamp=record.timestamp,
        directory=record.directory,
        is_favorite=record.is_favorite
    )
    session.add(db_record)
    await session.commit()
    await session.refresh(db_record)
    
    return CommandRecord(
        id=db_record.id,
        command=db_record.command,
        exit_code=db_record.exit_code,
        duration_seconds=db_record.duration_seconds,
        cpu_percent=db_record.cpu_percent,
        memory_mb=db_record.memory_mb,
        timestamp=db_record.timestamp,
        directory=db_record.directory,
        is_favorite=db_record.is_favorite
    )


@router.get("/commands", response_model=List[CommandRecord])
async def get_commands(
    limit: int = Query(100, le=1000),
    offset: int = Query(0, ge=0),
    search: Optional[str] = None,
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


@router.get("/sequences", response_model=List[CommandSequenceModel])
async def get_sequences(
    session: AsyncSession = Depends(get_session)
):
    """Get all saved command sequences"""
    result = await session.execute(select(CommandSequence))
    sequences = result.scalars().all()
    
    return [
        CommandSequenceModel(
            id=s.id,
            name=s.name,
            commands=s.commands,
            description=s.description,
            created_at=s.created_at
        )
        for s in sequences
    ]


@router.post("/sequences", response_model=CommandSequenceModel)
async def save_sequence(
    sequence: CommandSequenceModel,
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
    
    return CommandSequenceModel(
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
