#!/bin/bash

echo "🤖 Testing AI & History System..."
echo ""

# Test autocomplete
echo "1️⃣ Testing autocomplete for 'git ' command:"
curl -s -X POST http://localhost:8000/api/ai/autocomplete \
  -H "Content-Type: application/json" \
  -d '{
    "current_input": "git "
  }' | python3 -m json.tool

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test command history save
echo "2️⃣ Testing command history save:"
curl -s -X POST http://localhost:8000/api/history/commands \
  -H "Content-Type: application/json" \
  -d '{
    "command": "git status",
    "exit_code": 0,
    "duration_seconds": 0.5,
    "directory": "/home/appu/projects/ubuntu_terminal",
    "timestamp": "'$(date -Iseconds)'"
  }' | python3 -m json.tool

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test get command history
echo "3️⃣ Testing get command history:"
curl -s "http://localhost:8000/api/history/commands?limit=5" | python3 -m json.tool

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test git commits
echo "4️⃣ Testing git commits retrieval:"
curl -s "http://localhost:8000/api/history/git-commits?limit=5" | python3 -m json.tool

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test statistics
echo "5️⃣ Testing command statistics:"
curl -s "http://localhost:8000/api/history/statistics" | python3 -m json.tool

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test export
echo "6️⃣ Testing history export:"
curl -s -X POST "http://localhost:8000/api/history/export" | python3 -m json.tool

echo ""
echo "✅ Test complete! "
echo "📁 Check data.json for stored history"
echo "🔗 Check Groq console: https://console.groq.com"
echo "📊 History data is now maintained in JSON format with git commit tracking"
