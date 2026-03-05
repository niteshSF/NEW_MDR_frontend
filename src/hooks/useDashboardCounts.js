import { useState, useEffect } from "react";
import { serverUrl } from "../utils/serverUrl";

export function useDashboardCounts(prefix, jsonKey) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    fetch(serverUrl() + prefix)
      .then((res) => res.json())
      .then((json) => {
        const dataArray = json[jsonKey];
        if (dataArray) setData(dataArray);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [prefix, jsonKey]);

  return { data, loading, error };
}