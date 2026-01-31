const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';

export const api = {
  // Terminal
  getTerminalWebSocketUrl: () => `${WS_BASE_URL}/api/terminal/ws`,
  
  // AI Suggestions
  getAutocompleteSuggestions: async (currentInput: string) => {
    const response = await fetch(`${API_BASE_URL}/api/ai/autocomplete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current_input: currentInput }),
    });
    return response.json();
  },

  getAutocomplete: async (context: any) => {
    const response = await fetch(`${API_BASE_URL}/api/ai/autocomplete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(context),
    });
    return response.json();
  },
  
  getNextCommands: async (context: any) => {
    const response = await fetch(`${API_BASE_URL}/api/ai/next-commands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(context),
    });
    return response.json();
  },
  
  // Resources
  getSystemResources: async () => {
    const response = await fetch(`${API_BASE_URL}/api/resources/system`);
    return response.json();
  },
  
  getSystemResourcesStream: () => `${API_BASE_URL}/api/resources/system/stream`,
  
  // History
  getCommandHistory: async (params?: { limit?: number; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    const response = await fetch(`${API_BASE_URL}/api/history/commands?${query}`);
    return response.json();
  },
  
  saveCommand: async (record: any) => {
    const response = await fetch(`${API_BASE_URL}/api/history/commands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    return response.json();
  },
  
  toggleFavorite: async (commandId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/history/commands/${commandId}/favorite`, {
      method: 'PATCH',
    });
    return response.json();
  },
  
  getSequences: async () => {
    const response = await fetch(`${API_BASE_URL}/api/history/sequences`);
    return response.json();
  },
  
  saveSequence: async (sequence: any) => {
    const response = await fetch(`${API_BASE_URL}/api/history/sequences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sequence),
    });
    return response.json();
  },
};
