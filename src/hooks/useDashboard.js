import { useState, useEffect } from "react";
import axios from "axios";

export function useDashboard(endpoint, branchName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1${endpoint}?branch=${branchName}`);
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [endpoint, branchName]);

  return { data, loading, error };
}