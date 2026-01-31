"""FastAPI main application"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.api.routes import terminal, resources, ai, history
from app.core.database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    await init_db()
    print(f"🚀 {settings.app_name} starting...")
    print(f"📡 Backend running on {settings.backend_host}:{settings.backend_port}")
    yield
    # Shutdown
    print("👋 Shutting down...")


app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(terminal.router, prefix="/api/terminal", tags=["terminal"])
app.include_router(resources.router, prefix="/api/resources", tags=["resources"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])
app.include_router(history.router, prefix="/api/history", tags=["history"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "app": settings.app_name,
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}
