"""PTY (Pseudo-Terminal) Manager for terminal sessions"""
import ptyprocess
import os
import asyncio
import uuid
from typing import Dict, Optional
from datetime import datetime


class PTYSession:
    """Represents a single PTY terminal session"""
    
    def __init__(self, session_id: str, cols: int = 80, rows: int = 24):
        self.session_id = session_id
        self.cols = cols
        self.rows = rows
        self.process: Optional[ptyprocess.PtyProcess] = None
        self.created_at = datetime.now()
        self.current_command = ""
        self.command_history: list[str] = []
        
    def start(self, shell: str = "/bin/bash"):
        """Start the PTY process"""
        env = os.environ.copy()
        env['TERM'] = 'xterm-256color'
        env['COLORTERM'] = 'truecolor'
        
        self.process = ptyprocess.PtyProcess.spawn(
            [shell],
            dimensions=(self.rows, self.cols),
            env=env
        )
        
    def resize(self, cols: int, rows: int):
        """Resize the terminal"""
        if self.process and self.process.isalive():
            self.cols = cols
            self.rows = rows
            self.process.setwinsize(rows, cols)
            
    def write(self, data: str):
        """Write data to the terminal"""
        if self.process and self.process.isalive():
            self.process.write(data.encode('utf-8'))
            
    def read(self, size: int = 1024) -> str:
        """Read data from the terminal (non-blocking)"""
        if not self.process or not self.process.isalive():
            return ""
        
        try:
            return self.process.read(size)
        except EOFError:
            return ""
        except Exception:
            return ""
            
    def close(self):
        """Close the PTY session"""
        if self.process and self.process.isalive():
            self.process.terminate(force=True)
            
    def is_alive(self) -> bool:
        """Check if the PTY process is still running"""
        return self.process is not None and self.process.isalive()
    
    @property
    def pid(self) -> Optional[int]:
        """Get the process ID"""
        return self.process.pid if self.process else None

    def fileno(self) -> int:
        """Get the file descriptor of the PTY"""
        if self.process:
            return self.process.fileno()
        return -1


class PTYManager:
    """Manages multiple PTY sessions"""
    
    def __init__(self):
        self.sessions: Dict[str, PTYSession] = {}
        
    def create_session(self, cols: int = 80, rows: int = 24) -> PTYSession:
        """Create a new PTY session"""
        session_id = str(uuid.uuid4())
        session = PTYSession(session_id, cols, rows)
        session.start()
        self.sessions[session_id] = session
        return session
        
    def get_session(self, session_id: str) -> Optional[PTYSession]:
        """Get an existing session"""
        return self.sessions.get(session_id)
        
    def close_session(self, session_id: str):
        """Close and remove a session"""
        session = self.sessions.get(session_id)
        if session:
            session.close()
            del self.sessions[session_id]
            
    def cleanup_dead_sessions(self):
        """Remove sessions that are no longer alive"""
        dead_sessions = [
            sid for sid, session in self.sessions.items()
            if not session.is_alive()
        ]
        for sid in dead_sessions:
            del self.sessions[sid]
            
    def close_all(self):
        """Close all sessions"""
        for session in self.sessions.values():
            session.close()
        self.sessions.clear()


# Global PTY manager instance
pty_manager = PTYManager()
