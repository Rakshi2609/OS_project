# AI Command Suggestions - Usage Guide

## 🤖 Where to See AI Suggestions

The Smart Terminal provides TWO types of AI suggestions:

### 1. **As-You-Type Autocomplete** (Not yet fully integrated in UI)
- Appears as you type commands in the terminal
- Shows real-time suggestions based on:
  - Current partial command
  - Command history
  - Current directory
  - Git status (if in a git repo)

**Coming in next update**: Dropdown menu below the terminal input

### 2. **Post-Execution Next Steps** (Ready)
- API endpoint: `/api/ai/next-commands`
- Suggests what to run next after a command completes
- Example flow:
  ```
  You run: git add .
  AI suggests:
  1. git commit -m "message"
  2. git status
  3. git diff --cached
  ```

## 📊 How to Monitor Groq API Usage

### Method 1: Check Groq Console (Recommended)
1. Visit https://console.groq.com
2. Log in with your account
3. Go to **Usage** or **API Keys** section
4. View:
   - Total requests today
   - Tokens used
   - Rate limit status
   - Cost (if applicable)

### Method 2: Test AI Suggestions via API

**Test autocomplete:**
```bash
curl -X POST http://localhost:8000/api/ai/autocomplete \
  -H "Content-Type: application/json" \
  -d '{
    "current_command": "git ",
    "command_history": ["cd myproject", "ls -la"],
    "current_directory": "/home/appu/projects",
    "git_status": "## main\n M file.txt"
  }'
```

**Test next-command suggestions:**
```bash
curl -X POST http://localhost:8000/api/ai/next-commands \
  -H "Content-Type: application/json" \
  -d '{
    "current_command": "",
    "command_history": ["git add .", "git status"],
    "current_directory": "/home/appu/projects/ubuntu_terminal",
    "last_output": "Changes staged for commit",
    "git_status": "A  new_file.txt"
  }'
```

### Method 3: Check Backend Logs

The backend logs every Groq API call. Look for:
```
AI Service Error: <any errors>
```

Or enable debug logging in the AI service to see successful calls.

### Method 4: Add Usage Tracking

You can track usage in your backend by modifying `/home/appu/projects/ubuntu_terminal/backend/app/core/ai_service.py`:

```python
# Add after successful API calls
print(f"✅ Groq API call successful - Model: {self.model}")
print(f"   Input tokens: {response.usage.prompt_tokens if hasattr(response, 'usage') else 'N/A'}")
print(f"   Output tokens: {response.usage.completion_tokens if hasattr(response, 'usage') else 'N/A'}")
```

## 🔧 How to Enable Suggestions in UI

### Currently Available:
- Terminal works ✅
- Resource monitoring works ✅
- Backend AI endpoints ready ✅

### To Add UI Suggestions (Quick Implementation):

**Option 1**: Test via Swagger UI
1. Open http://localhost:8000/docs
2. Find `/api/ai/autocomplete` endpoint
3. Click "Try it out"
4. Enter sample data
5. See AI suggestions in response

**Option 2**: Add to Terminal Component (Future Enhancement)

The frontend needs to call the AI endpoints. Here's where to add it:

In `frontend/src/components/Terminal.tsx`, add:
- Debounced API call on user input
- Display suggestions dropdown
- Handle suggestion selection

## 📈 Groq API Limits (Free Tier)

- **Requests per day**: 14,400 (as of Jan 2026)
- **Requests per minute**: 30
- **Tokens per minute**: 6,000

Your usage should be well within limits for personal use!

## 🐛 Troubleshooting

**No suggestions appearing?**
1. Check backend logs for errors
2. Verify GROQ_API_KEY is correct in `.env`
3. Test API directly: `curl http://localhost:8000/api/ai/autocomplete -X POST ...`

**"Rate limit exceeded" error?**
- Wait 1 minute and try again
- Check https://console.groq.com for quota

**Slow responses?**
- Normal - Groq typically responds in 1-3 seconds
- Consider caching frequent suggestions

## 🎯 Next Steps

To fully integrate AI suggestions in the terminal UI, you'll need to:

1. Add suggestion dropdown component in React
2. Hook up AI API calls with debouncing
3. Display suggestions as user types
4. Add keyboard navigation (Tab to accept)

Would you like me to implement this UI integration?
