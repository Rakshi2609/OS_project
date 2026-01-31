"""AI-related Pydantic models"""
from pydantic import BaseModel
from typing import List, Optional


class AutocompleteRequest(BaseModel):
    """Request model for autocomplete"""
    current_input: str

class CommandContext(BaseModel):
    """Context for AI command suggestions"""
    current_command: str
    command_history: List[str] = []
    current_directory: str
    last_output: Optional[str] = None
    git_status: Optional[str] = None


class CommandSuggestion(BaseModel):
    """AI-generated command suggestion"""
    command: str
    description: str
    confidence: float  # 0-1


class SuggestionResponse(BaseModel):
    """Response containing command suggestions"""
    suggestions: List[CommandSuggestion]
    reasoning: Optional[str] = None
