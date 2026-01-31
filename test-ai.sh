#!/bin/bash

echo "🤖 Testing Groq AI Suggestions..."
echo ""

# Test autocomplete
echo "1️⃣ Testing autocomplete for 'git ' command:"
curl -s -X POST http://localhost:8000/api/ai/autocomplete \
  -H "Content-Type: application/json" \
  -d '{
    "current_command": "git ",
    "command_history": ["cd myproject", "ls -la", "git status"],
    "current_directory": "/home/appu/projects",
    "git_status": "M  file.txt"
  }' | python3 -m json.tool

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test next commands
echo "2️⃣ Testing next-command suggestions after 'git add .':"
curl -s -X POST http://localhost:8000/api/ai/next-commands \
  -H "Content-Type: application/json" \
  -d '{
    "current_command": "",
    "command_history": ["git status", "git add ."],
    "current_directory": "/home/appu/projects/ubuntu_terminal",
    "last_output": "Changes staged for commit",
    "git_status": "A  new_file.txt\nA  README.md"
  }' | python3 -m json.tool

echo ""
echo "✅ Test complete! Check Groq console for usage: https://console.groq.com"
