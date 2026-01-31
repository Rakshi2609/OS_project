#!/bin/bash

echo "════════════════════════════════════════════════════════"
echo "  🤖 Smart Terminal - AI Features Quick Demo"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📍 WHERE TO SEE AI SUGGESTIONS:"
echo ""
echo "1. 🌐 Swagger UI (Interactive API Docs)"
echo "   → Open: http://localhost:8000/docs"
echo "   → Try: /api/ai/autocomplete"
echo "   → Try: /api/ai/next-commands"
echo ""
echo "2. 💻 Terminal App (http://localhost:5173)"
echo "   ┌─────────────────────────────────────┐"
echo "   │  Terminal Tab                       │"
echo "   │  - Type commands                    │"
echo "   │  - See real-time suggestions        │"
echo "   │    (UI integration pending)         │"
echo "   │                                     │"
echo "   │  Dashboard Tab                      │"
echo "   │  - Live CPU/RAM/Disk graphs         │"
echo "   │  - Command history                  │"
echo "   │  - Resource monitoring              │"
echo "   └─────────────────────────────────────┘"
echo ""
echo "3. 📊 Groq Usage Dashboard"
echo "   → https://console.groq.com"
echo "   → See: API calls, tokens used, rate limits"
echo ""
echo "════════════════════════════════════════════════════════"
echo ""
echo "🧪 TESTING AI SUGGESTIONS NOW..."
echo ""

# Wait for backend to be ready
echo "⏳ Waiting for backend..."
for i in {1..10}; do
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo "✅ Backend is ready!"
        break
    fi
    sleep 1
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 TEST 1: Autocomplete 'git ' command"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

RESPONSE=$(curl -s -X POST http://localhost:8000/api/ai/autocomplete \
  -H "Content-Type: application/json" \
  -d '{
    "current_command": "git ",
    "command_history": ["cd myproject", "git status"],
    "current_directory": "/home/appu/projects",
    "git_status": "M  file.txt"
  }')

if echo "$RESPONSE" | grep -q "suggestions"; then
    echo "✅ AI Responded! Here are the suggestions:"
    echo ""
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
else
    echo "❌ Error or no suggestions:"
    echo "$RESPONSE"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 TEST 2: Next commands after 'git add .'"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

RESPONSE2=$(curl -s -X POST http://localhost:8000/api/ai/next-commands \
  -H "Content-Type: application/json" \
  -d '{
    "current_command": "",
    "command_history": ["git status", "git add ."],
    "current_directory": "/home/appu/projects/ubuntu_terminal",
    "last_output": "Changes staged",
    "git_status": "A  new_file.txt"
  }')

if echo "$RESPONSE2" | grep -q "suggestions"; then
    echo "✅ AI Responded! Next command suggestions:"
    echo ""
    echo "$RESPONSE2" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE2"
else
    echo "❌ Error or no suggestions:"
    echo "$RESPONSE2"
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ DEMO COMPLETE!"
echo ""
echo "📊 Check your Groq usage:"
echo "   https://console.groq.com/usage"
echo ""
echo "🌐 Try interactive API:"
echo "   http://localhost:8000/docs"
echo ""
echo "💡 Next: Integrate suggestions into terminal UI"
echo "════════════════════════════════════════════════════════"
