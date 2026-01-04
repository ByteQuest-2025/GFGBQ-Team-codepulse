const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || 'Request failed. Please try again.';
    throw new Error(message);
  }
  return data;
};

export const authService = {
  register: async ({ name, phoneNumber, password }) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phoneNumber, password })
    });

    return handleResponse(response);
  },

  login: async ({ phoneNumber, password }) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, password })
    });

    return handleResponse(response);
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return handleResponse(response);
  }
};

export { API_BASE };
