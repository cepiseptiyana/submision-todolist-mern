import { useState, useEffect } from "react";
import { getAll } from "@/api/categoryApi";

export const useGetCategories = (page, perPage, searchTerm) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAll();
      setCategories(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch setiap page / searchTerm berubah
  useEffect(() => {
    fetchCategories();
  }, [page, perPage, searchTerm]);

  return { categories, loading, error };
};
