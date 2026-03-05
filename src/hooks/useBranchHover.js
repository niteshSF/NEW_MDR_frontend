import { useState } from "react";
import { serverUrl } from "../utils/serverUrl";

export function useBranchHover() {
  const [tooltips, setTooltips] = useState({});

  const fetchBranchData = (circleId, subsQuery) => {
    // Only fetch if not already fetched
    if (tooltips[circleId]) return;

    fetch(serverUrl() + `/subs/sciencetechnology?subs=${subsQuery}`)
      .then((res) => res.json())
      .then((json) => {
        const data = json["sciencetechnology"];
        if (data) {
          const summary = Object.entries(data)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ");
          setTooltips((prev) => ({ ...prev, [circleId]: summary }));
        }
      })
      .catch(() => {
        setTooltips((prev) => ({ ...prev, [circleId]: "" }));
      });
  };

  return { tooltips, fetchBranchData };
}
