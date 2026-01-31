"""Application configuration"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # API Configuration
    app_name: str = "Smart Terminal API"
    debug: bool = True
    
    # Server Configuration
    backend_host: str = "0.0.0.0"
    backend_port: int = 8000
    
    # CORS
    cors_origins: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Groq API
    groq_api_key: str
    groq_model: str = "llama-3.3-70b-versatile"
    
    # Security
    secret_key: str = "change-this-in-production"
    
    # Resource Monitoring
    monitor_interval: int = 2  # seconds
    max_history_days: int = 90
    
    # Database
    database_url: str = "sqlite+aiosqlite:///./terminal_history.db"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False
    )


settings = Settings()
