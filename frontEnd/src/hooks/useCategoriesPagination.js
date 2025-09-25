import { useState, useEffect } from "react";
import { getCategoryPagination } from "@/api/categoryApi";

export const useCategoriesPagination = (page, perPage, searchTerm) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0); // total data dari backend

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoryPagination(page, perPage, searchTerm);
      setCategories(response.data);
      setTotal(response.pagination?.total || 0);
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

  return { categories, loading, error, total };
};
