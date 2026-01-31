"""Terminal WebSocket endpoint"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.pty_manager import pty_manager
from app.models.terminal import TerminalMessage
import asyncio
import json

router = APIRouter()


@router.websocket("/ws")
async def terminal_websocket(websocket: WebSocket):
    """WebSocket endpoint for terminal I/O"""
    await websocket.accept()
    
    # Create a new PTY session
    session = pty_manager.create_session(cols=80, rows=24)
    
    print(f"✅ Terminal session created: {session.session_id} (PID: {session.pid})")
    
    # Send session info to client
    await websocket.send_json({
        "type": "connected",
        "session_id": session.session_id,
        "pid": session.pid
    })

    loop = asyncio.get_running_loop()
    
    def pty_output_handler():
        """Handle output from the PTY"""
        try:
            data = session.read(1024)
            if data:
                # Ensure data is a string, not bytes
                if isinstance(data, bytes):
                    data = data.decode('utf-8', errors='replace')
                
                # Schedule the send operation on the event loop
                asyncio.run_coroutine_threadsafe(
                    websocket.send_json({"type": "output", "data": data}),
                    loop
                )
        except Exception as e:
            print(f"PTY read error: {e}")
            if session.fileno() != -1:
                loop.remove_reader(session.fileno())
            pty_manager.close_session(session.session_id)

    # Add a reader for the PTY file descriptor
    if session.fileno() != -1:
        loop.add_reader(session.fileno(), pty_output_handler)
    
    try:
        while True:
            # Wait for client messages
            message_json = await websocket.receive_text()
            message = TerminalMessage.parse_raw(message_json)
            
            if message.type == "input":
                session.write(message.data)
            elif message.type == "resize":
                if message.cols and message.rows:
                    session.resize(message.cols, message.rows)
            elif message.type == "close":
                break
                
    except WebSocketDisconnect:
        print(f"🔌 WebSocket disconnected for session: {session.session_id}")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        print(f"Closing terminal session: {session.session_id}")
        if session.fileno() != -1:
            loop.remove_reader(session.fileno())
        pty_manager.close_session(session.session_id)


@router.get("/sessions")
async def list_sessions():
    """List active terminal sessions"""
    sessions = []
    for sid, session in pty_manager.sessions.items():
        sessions.append({
            "session_id": sid,
            "pid": session.pid,
            "created_at": session.created_at.isoformat(),
            "status": "active" if session.is_alive() else "closed"
        })
    return {"sessions": sessions}
