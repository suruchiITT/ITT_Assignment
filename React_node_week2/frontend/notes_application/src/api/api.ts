const API_BASE_URL = "http://localhost:5000/api";

export const loginUser = async (emailAddress: string, passwordValue: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailAddress, passwordValue })
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const registerUser = async (
  fullName: string,
  emailAddress: string,
  passwordValue: string
) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, emailAddress, passwordValue })
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export const fetchNotes = async () => {
  const tokenValue = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${tokenValue}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to load notes");
  }

  return response.json();
};

export const createNote = async (titleText: string, bodyText: string) => {
  const tokenValue = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenValue}`
    },
    body: JSON.stringify({ titleText, bodyText })
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return response.json();
};

export const deleteNote = async (noteId: string) => {
  const tokenValue = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenValue}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }

  return response.json();
};
