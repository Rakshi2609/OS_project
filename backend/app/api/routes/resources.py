"""Resource monitoring endpoints"""
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.core.resource_monitor import resource_monitor
from app.config import settings
import asyncio
import json

router = APIRouter()


@router.get("/system")
async def get_system_resources():
    """Get current system resource usage"""
    resources = resource_monitor.get_system_resources()
    return resources


@router.get("/system/stream")
async def stream_system_resources():
    """Stream system resources via Server-Sent Events"""
    
    async def event_generator():
        """Generate SSE events"""
        while True:
            try:
                resources = resource_monitor.get_system_resources()
                data = resources.model_dump_json()
                yield f"data: {data}\n\n"
                await asyncio.sleep(settings.monitor_interval)
            except Exception as e:
                print(f"Stream error: {e}")
                break
    
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )


@router.get("/process/{pid}")
async def get_process_resources(pid: int):
    """Get resource usage for a specific process"""
    resources = resource_monitor.get_process_resources(pid)
    if resources:
        return resources
    return {"error": "Process not found or not tracked"}


@router.post("/process/{pid}/track")
async def track_process(pid: int, command: str):
    """Start tracking a process"""
    resource_monitor.track_process(pid, command)
    return {"status": "tracking", "pid": pid}


@router.post("/process/{pid}/stop")
async def stop_tracking_process(pid: int):
    """Stop tracking a process and get summary"""
    summary = resource_monitor.stop_tracking(pid)
    if summary:
        return summary
    return {"error": "Process not found"}
