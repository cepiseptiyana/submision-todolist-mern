import { useState, useEffect } from "react";
import { getTodo } from "@/api/todoApi";

export const useTodos = (page, perPage, searchTerm) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0); // total data dari backend

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodo(page, perPage, searchTerm);
      setTodos(response.data);
      setTotal(response.pagination?.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch setiap page / searchTerm berubah
  useEffect(() => {
    fetchTodos();
  }, [page, perPage, searchTerm]);

  return { todos, loading, error, total };
};
