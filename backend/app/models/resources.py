"""Resource monitoring Pydantic models"""
from pydantic import BaseModel
from typing import Optional


class SystemResources(BaseModel):
    """System-wide resource usage"""
    cpu_percent: float
    memory_percent: float
    memory_used_gb: float
    memory_total_gb: float
    disk_percent: float
    disk_used_gb: float
    disk_total_gb: float
    timestamp: str


class ProcessResources(BaseModel):
    """Per-process resource usage"""
    pid: int
    command: str
    cpu_percent: float
    memory_mb: float
    status: str
    duration_seconds: Optional[float] = None
