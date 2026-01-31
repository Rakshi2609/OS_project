"""Terminal-related Pydantic models"""
from pydantic import BaseModel
from typing import Optional


class TerminalMessage(BaseModel):
    """WebSocket message model"""
    type: str  # 'input', 'output', 'resize', 'close'
    data: Optional[str] = None
    cols: Optional[int] = None
    rows: Optional[int] = None


class TerminalSession(BaseModel):
    """Terminal session information"""
    session_id: str
    pid: int
    created_at: str
    status: str  # 'active', 'closed'
