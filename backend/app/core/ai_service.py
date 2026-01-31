"""Groq AI service for command suggestions"""
import os
from groq import AsyncGroq
from app.config import settings
from app.models.ai import CommandContext, CommandSuggestion, SuggestionResponse
from typing import List
import subprocess
import json


class AIService:
    """Service for generating AI-powered command suggestions"""
    
    def __init__(self):
        self.client = AsyncGroq(api_key=settings.groq_api_key)
        self.model = settings.groq_model
        
    async def get_autocomplete_suggestions(
        self,
        context: CommandContext,
        max_suggestions: int = 3
    ) -> SuggestionResponse:
        """Get as-you-type command autocomplete suggestions"""
        
        # Build context prompt
        prompt = self._build_autocomplete_prompt(context)
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful Linux command-line assistant. Provide concise, accurate command suggestions. Return ONLY valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.3,
                max_tokens=500,
            )
            
            content = response.choices[0].message.content
            suggestions = self._parse_suggestions(content, max_suggestions)
            
            return SuggestionResponse(
                suggestions=suggestions,
                reasoning=None
            )
            
        except Exception as e:
            print(f"AI Service Error: {e}")
            return SuggestionResponse(suggestions=[])
    
    async def get_next_command_suggestions(
        self,
        context: CommandContext,
        max_suggestions: int = 5
    ) -> SuggestionResponse:
        """Get suggestions for next commands after execution"""
        
        prompt = self._build_next_command_prompt(context)
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert Linux system administrator. Suggest logical next commands based on what was just executed. Return ONLY valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.4,
                max_tokens=800,
            )
            
            content = response.choices[0].message.content
            suggestions = self._parse_suggestions(content, max_suggestions)
            
            return SuggestionResponse(
                suggestions=suggestions,
                reasoning=None
            )
            
        except Exception as e:
            print(f"AI Service Error: {e}")
            return SuggestionResponse(suggestions=[])
    
    def _build_autocomplete_prompt(self, context: CommandContext) -> str:
        """Build prompt for autocomplete"""
        history_str = "\n".join(context.command_history[-5:]) if context.command_history else "None"
        
        git_info = ""
        if context.git_status:
            git_info = f"\nGit Status:\n{context.git_status}"
        
        return f"""Complete this command and suggest alternatives.

Current Directory: {context.current_directory}
Recent Commands:
{history_str}
{git_info}

Partial Command: {context.current_command}

Provide 3 command completions in JSON format:
{{
  "suggestions": [
    {{"command": "full command", "description": "what it does", "confidence": 0.9}},
    ...
  ]
}}"""
    
    def _build_next_command_prompt(self, context: CommandContext) -> str:
        """Build prompt for next command suggestions"""
        history_str = "\n".join(context.command_history[-5:]) if context.command_history else "None"
        last_cmd = context.command_history[-1] if context.command_history else "None"
        
        git_info = ""
        if context.git_status:
            git_info = f"\nGit Status:\n{context.git_status}"
        
        output_info = ""
        if context.last_output:
            # Truncate long output
            output = context.last_output[:500]
            output_info = f"\nCommand Output:\n{output}"
        
        return f"""Suggest the next logical commands to run.

Current Directory: {context.current_directory}
Recent Commands:
{history_str}

Last Executed: {last_cmd}
{output_info}
{git_info}

Provide up to 5 next command suggestions in JSON format:
{{
  "suggestions": [
    {{"command": "full command", "description": "why run this next", "confidence": 0.85}},
    ...
  ]
}}"""
    
    def _parse_suggestions(self, content: str, max_suggestions: int) -> List[CommandSuggestion]:
        """Parse AI response into CommandSuggestion objects"""
        try:
            # Try to extract JSON from response
            content = content.strip()
            
            # Remove markdown code blocks if present
            if content.startswith("```"):
                lines = content.split("\n")
                content = "\n".join(lines[1:-1])
            
            data = json.loads(content)
            suggestions = []
            
            for item in data.get("suggestions", [])[:max_suggestions]:
                suggestions.append(CommandSuggestion(
                    command=item.get("command", ""),
                    description=item.get("description", ""),
                    confidence=float(item.get("confidence", 0.5))
                ))
            
            return suggestions
            
        except Exception as e:
            print(f"Error parsing suggestions: {e}")
            # Fallback: try to extract commands from text
            return []
    
    @staticmethod
    def get_git_status() -> str:
        """Get git status if in a git repository"""
        try:
            result = subprocess.run(
                ["git", "status", "--short"],
                capture_output=True,
                text=True,
                timeout=2
            )
            if result.returncode == 0:
                return result.stdout
        except Exception:
            pass
        return ""


# Global AI service instance
ai_service = AIService()
