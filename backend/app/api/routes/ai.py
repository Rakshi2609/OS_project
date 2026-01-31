"""AI command suggestion endpoints"""
from fastapi import APIRouter, HTTPException
from app.core.ai_service import ai_service
from app.models.ai import AutocompleteRequest, CommandContext, SuggestionResponse

router = APIRouter()


@router.post("/autocomplete", response_model=SuggestionResponse)
async def get_autocomplete(request: AutocompleteRequest):
    """Get as-you-type command autocomplete suggestions"""
    try:
        # This is a simplified context for autocompletion
        context = CommandContext(
            current_command=request.current_input,
            command_history=[],
            current_directory="." 
        )
        suggestions = await ai_service.get_autocomplete_suggestions(context)
        return suggestions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/next-commands", response_model=SuggestionResponse)
async def get_next_commands(context: CommandContext):
    """Get suggestions for next commands to run"""
    try:
        suggestions = await ai_service.get_next_command_suggestions(context)
        return suggestions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/git-status")
async def get_git_status():
    """Get current git status"""
    status = ai_service.get_git_status()
    return {"status": status}
