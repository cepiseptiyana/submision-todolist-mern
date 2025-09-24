const API_BASE = "http://127.0.0.1:3000/api/todos";

// GET TODO
export const getTodo = async (page = 1, perPage = 10, search = "") => {
  const res = await fetch(
    `${API_BASE}?page=${page}&perPage=${perPage}&search=${encodeURIComponent(
      search
    )}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) throw new Error("Failed to Get todo");
  return res.json();
};

// GET TODO getById
export const getById = async (params) => {
  const res = await fetch(`${API_BASE}/${params}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to Get todo");
  return res.json();
};

// DELETE TODO
export const deleteTodo = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to Get todo");
  return res.json();
};

// UPDATE TODO
export const updateTodo = async (id, todoData) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });

  const data = await res.json();

  if (!res.ok) {
    // lempar error lengkap, termasuk message dari backend
    throw { status: res.status, ...data };
  }

  return data;
};

// CREATE NEW TODO
export const createTodo = async (todoData) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });
  if (!res.ok) throw new Error("Failed to Create todo");
  return res.json();
};
