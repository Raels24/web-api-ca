const API = "http://localhost:8080";

export const login = async (username, password) => {
  const response = await fetch(`${API}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.msg || data?.message || "Login failed");
  }
  return data;
};

export const signup = async (username, password) => {
  const response = await fetch(`${API}/api/users?action=register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.msg || data?.message || "Signup failed");
  }
  return data;
};
