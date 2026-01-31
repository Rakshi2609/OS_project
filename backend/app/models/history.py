"""Command history Pydantic models"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CommandRecord(BaseModel):
    """Command history record"""
    id: Optional[int] = None
    command: str
    exit_code: int
    duration_seconds: float
    cpu_percent: float
    memory_mb: float
    timestamp: datetime
    directory: str
    is_favorite: bool = False


class CommandSequence(BaseModel):
    """Saved command sequence"""
    id: Optional[int] = None
    name: str
    commands: list[str]
    description: Optional[str] = None
    created_at: Optional[datetime] = None
