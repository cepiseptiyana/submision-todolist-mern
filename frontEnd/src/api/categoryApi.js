const API_BASE = "http://127.0.0.1:3000/api/categories";

// GET ALL
export const getAll = async () => {
  const res = await fetch(`${API_BASE}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    // lempar error lengkap, termasuk message dari backend
    throw { status: res.status, ...data };
  }
  return data;
};

// GET CATEGORY PAGINATIONS
export const getCategoryPagination = async (
  page = 1,
  perPage = 10,
  search = ""
) => {
  const res = await fetch(
    `${API_BASE}/pagination?page=${page}&perPage=${perPage}&search=${encodeURIComponent(
      search
    )}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    // lempar error lengkap, termasuk message dari backend
    throw { status: res.status, ...data };
  }
  return data;
};

// GET CATEGORY getById
export const getById = async (params) => {
  const res = await fetch(`${API_BASE}/${params}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    // lempar error lengkap, termasuk message dari backend
    throw { status: res.status, ...data };
  }
  return data;
};

// CREATE NEW CATEGORY
export const createCategory = async (todoData) => {
  const res = await fetch(API_BASE, {
    method: "POST",
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

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    // lempar error lengkap, termasuk message dari backend
    throw { status: res.status, ...data };
  }
  return data;
};

// UPDATE CATEGORY
export const updateCategory = async (id, dataCategory) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataCategory),
  });

  const data = await res.json();

  if (!res.ok) {
    // lempar error lengkap, termasuk message dari backend
    throw { status: res.status, ...data };
  }

  return data;
};
