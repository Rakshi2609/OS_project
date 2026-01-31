"""System and process resource monitoring"""
import psutil
import asyncio
from typing import Optional, Dict
from datetime import datetime
from app.models.resources import SystemResources, ProcessResources


class ResourceMonitor:
    """Monitor system and process resources"""
    
    def __init__(self):
        self.tracked_processes: Dict[int, dict] = {}
        
    def get_system_resources(self) -> SystemResources:
        """Get current system-wide resource usage"""
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        return SystemResources(
            cpu_percent=psutil.cpu_percent(interval=0.1),
            memory_percent=memory.percent,
            memory_used_gb=round(memory.used / (1024**3), 2),
            memory_total_gb=round(memory.total / (1024**3), 2),
            disk_percent=disk.percent,
            disk_used_gb=round(disk.used / (1024**3), 2),
            disk_total_gb=round(disk.total / (1024**3), 2),
            timestamp=datetime.now().isoformat()
        )
    
    def track_process(self, pid: int, command: str):
        """Start tracking a process"""
        try:
            proc = psutil.Process(pid)
            self.tracked_processes[pid] = {
                "command": command,
                "process": proc,
                "start_time": datetime.now(),
                "cpu_samples": [],
                "memory_samples": []
            }
        except psutil.NoSuchProcess:
            pass
    
    def get_process_resources(self, pid: int) -> Optional[ProcessResources]:
        """Get resource usage for a tracked process"""
        if pid not in self.tracked_processes:
            return None
        
        tracked = self.tracked_processes[pid]
        proc = tracked["process"]
        
        try:
            cpu_percent = proc.cpu_percent(interval=0.1)
            memory_info = proc.memory_info()
            memory_mb = memory_info.rss / (1024 * 1024)
            
            # Store samples for averaging
            tracked["cpu_samples"].append(cpu_percent)
            tracked["memory_samples"].append(memory_mb)
            
            duration = (datetime.now() - tracked["start_time"]).total_seconds()
            
            return ProcessResources(
                pid=pid,
                command=tracked["command"],
                cpu_percent=cpu_percent,
                memory_mb=round(memory_mb, 2),
                status=proc.status(),
                duration_seconds=round(duration, 2)
            )
            
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            return None
    
    def get_process_summary(self, pid: int) -> Optional[dict]:
        """Get average resource usage summary for a completed process"""
        if pid not in self.tracked_processes:
            return None
        
        tracked = self.tracked_processes[pid]
        duration = (datetime.now() - tracked["start_time"]).total_seconds()
        
        cpu_samples = tracked["cpu_samples"]
        memory_samples = tracked["memory_samples"]
        
        return {
            "command": tracked["command"],
            "duration_seconds": round(duration, 2),
            "avg_cpu_percent": round(sum(cpu_samples) / len(cpu_samples), 2) if cpu_samples else 0.0,
            "max_memory_mb": round(max(memory_samples), 2) if memory_samples else 0.0,
        }
    
    def stop_tracking(self, pid: int) -> Optional[dict]:
        """Stop tracking a process and return summary"""
        summary = self.get_process_summary(pid)
        if pid in self.tracked_processes:
            del self.tracked_processes[pid]
        return summary
    
    async def monitor_system_continuously(self, callback, interval: int = 2):
        """Continuously monitor system resources and call callback"""
        while True:
            try:
                resources = self.get_system_resources()
                await callback(resources)
                await asyncio.sleep(interval)
            except Exception as e:
                print(f"Monitoring error: {e}")
                await asyncio.sleep(interval)


# Global resource monitor instance
resource_monitor = ResourceMonitor()
