import json
import os
from datetime import datetime
from typing import List, Dict, Any, Optional
from pathlib import Path
import subprocess
import asyncio

class HistoryService:
    def __init__(self, data_file: str = "data.json"):
        self.data_file = Path(data_file)
        self.ensure_data_file()
    
    def ensure_data_file(self):
        """Ensure the data.json file exists with proper structure"""
        if not self.data_file.exists():
            initial_data = {
                "commands": [],
                "git_commits": [],
                "sessions": [],
                "favorites": [],
                "metadata": {
                    "created": datetime.now().isoformat(),
                    "last_updated": datetime.now().isoformat(),
                    "version": "1.0.0"
                }
            }
            self.save_data(initial_data)
    
    def load_data(self) -> Dict[str, Any]:
        """Load data from JSON file"""
        try:
            with open(self.data_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            self.ensure_data_file()
            return self.load_data()
    
    def save_data(self, data: Dict[str, Any]):
        """Save data to JSON file"""
        data["metadata"]["last_updated"] = datetime.now().isoformat()
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    
    def add_command(self, command: str, exit_code: int = 0, duration: float = 0.0, 
                   directory: str = "/", output: str = "") -> Dict[str, Any]:
        """Add a command to history"""
        data = self.load_data()
        
        command_record = {
            "id": len(data["commands"]) + 1,
            "command": command,
            "exit_code": exit_code,
            "duration_seconds": duration,
            "directory": directory,
            "output": output[:500] if output else "",  # Truncate output
            "timestamp": datetime.now().isoformat(),
            "is_favorite": False
        }
        
        data["commands"].append(command_record)
        
        # Keep only last 1000 commands
        if len(data["commands"]) > 1000:
            data["commands"] = data["commands"][-1000:]
        
        self.save_data(data)
        return command_record
    
    def get_commands(self, limit: int = 100, search: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get command history with optional search"""
        data = self.load_data()
        commands = data["commands"]
        
        if search:
            commands = [cmd for cmd in commands if search.lower() in cmd["command"].lower()]
        
        return commands[-limit:] if limit else commands
    
    def get_git_commits(self, limit: int = 10, repo_path: str = ".") -> List[Dict[str, Any]]:
        """Get recent git commits"""
        try:
            # Get git log in JSON format
            cmd = [
                "git", "log", f"--max-count={limit}", 
                "--pretty=format:{\"hash\":\"%H\",\"author\":\"%an\",\"email\":\"%ae\",\"date\":\"%ai\",\"message\":\"%s\"}",
                "--no-merges"
            ]
            
            result = subprocess.run(
                cmd, cwd=repo_path, capture_output=True, text=True, timeout=10
            )
            
            if result.returncode != 0:
                return []
            
            commits = []
            for line in result.stdout.strip().split('\n'):
                if line.strip():
                    try:
                        commit = json.loads(line)
                        commit["short_hash"] = commit["hash"][:7]
                        commits.append(commit)
                    except json.JSONDecodeError:
                        continue
            
            # Update stored commits
            data = self.load_data()
            data["git_commits"] = commits
            self.save_data(data)
            
            return commits
            
        except (subprocess.TimeoutExpired, subprocess.SubprocessError, FileNotFoundError):
            return []
    
    def get_statistics(self) -> Dict[str, Any]:
        """Get usage statistics"""
        data = self.load_data()
        commands = data["commands"]
        
        if not commands:
            return {"total_commands": 0, "most_used": [], "avg_duration": 0}
        
        # Count command frequency
        command_count = {}
        total_duration = 0
        
        for cmd in commands:
            base_cmd = cmd["command"].split()[0] if cmd["command"] else "unknown"
            command_count[base_cmd] = command_count.get(base_cmd, 0) + 1
            total_duration += cmd.get("duration_seconds", 0)
        
        # Get top 10 most used commands
        most_used = sorted(command_count.items(), key=lambda x: x[1], reverse=True)[:10]
        
        return {
            "total_commands": len(commands),
            "most_used": [{
                "command": cmd,
                "count": count,
                "percentage": round((count / len(commands)) * 100, 2)
            } for cmd, count in most_used],
            "avg_duration": round(total_duration / len(commands), 2) if commands else 0,
            "last_command_time": commands[-1]["timestamp"] if commands else None
        }
    
    def export_data(self, export_path: str = None) -> str:
        """Export all data to a file"""
        if not export_path:
            export_path = f"history_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        data = self.load_data()
        with open(export_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        return export_path

# Global instance
history_service = HistoryService("data.json")