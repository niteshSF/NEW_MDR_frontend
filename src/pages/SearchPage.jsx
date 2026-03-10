import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

export default function SearchPage() {
  const [options, setOptions] = useState({
    subjects: [],
    languages: [],
    scripts: [],
    categories: [],
    types: [],
  });

  const [results, setResults] = useState([]);

  const [form, setForm] = useState({
    document_id: "",
    document_name: "",
    subject: "",
    source_name: "",
    doc_type: "",
    language: "",
    script: "",
    category: "",
    author: "",
  });

  const navigate = useNavigate();

  // Ref for results section
  const resultsRef = useRef(null);

  useEffect(() => {
    fetch("/api/v1/search/options")
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err) => console.error("Error loading options:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const smoothScrollTo = (targetY, duration = 900) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;

      const progress = Math.min(timeElapsed / duration, 1);

      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleSearch = async () => {
    const cleaned = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== ""),
    );

    const query = new URLSearchParams(cleaned).toString();

    try {
      const res = await fetch(`/api/v1/search?${query}`);
      if (!res.ok) throw new Error("Failed to fetch search results");

      const data = await res.json();
      setResults(data);

      // Smooth scroll to results
      setTimeout(() => {
        if (resultsRef.current) {
          const y =
            resultsRef.current.getBoundingClientRect().top + window.scrollY;
          smoothScrollTo(y, 1000);
        }
      }, 300);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleResultClick = (item) => {
    const type = item.document_type === "Book" ? "Books" : "Manuscripts";

    const branch = item.subject?.discipline?.branch?.name || "UnknownBranch";
    const discipline = item.subject?.discipline?.name || "UnknownDiscipline";

    const url = `/branches-of-science/${encodeURIComponent(
      branch,
    )}/${encodeURIComponent(discipline)}/${encodeURIComponent(type)}/${item.id}`;

    navigate(url);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    { field: "name", headerName: "Name", flex: 1 },

    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      renderCell: (params) => params.row?.subject?.name || "—",
    },

    {
      field: "document_type",
      headerName: "Document Type",
      flex: 1,
    },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-gradient-to-b from-gray-200 to-gray-500 min-h-screen">
      {/* Home Button */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate("/branches-of-science")}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
        >
          🏠︎ Home
        </button>
      </div>

      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 text-center text-gray-800">
        Science & Technology Documents
      </h1>

      {/* Search Form Section */}
      <div className="bg-gradient-to-r from-indigo-300 via-blue-150 to-indigo-300 p-6 md:p-10 rounded-2xl shadow-inner mb-10">
        <h2 className="font-bold mb-6 text-lg text-gray-800 border-b pb-2">
          Documents Search :
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Document ID
            </label>
            <input
              name="document_id"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">
              Document Name
            </label>
            <input
              name="document_name"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Subject</label>
            <select
              name="subject"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 bg-white focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Unselected</option>

              {options.subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Source</label>
            <input
              name="source_name"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">
              Document Type
            </label>
            <select
              name="doc_type"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 bg-white focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Unselected</option>

              {options.types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">
              Language
            </label>
            <select
              name="language"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 bg-white focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Unselected</option>

              {options.languages.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Script</label>
            <select
              name="script"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 bg-white focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Unselected</option>

              {options.scripts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">
              Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 bg-white focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Unselected</option>

              {options.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Author</label>
            <input
              name="author"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-6 py-2 font-semibold rounded-lg shadow hover:bg-indigo-800 transition"
          >
            SUBMIT
          </button>
        </div>
      </div>

      {/* Results Table */}

      {results.length > 0 && (
        <div
          ref={resultsRef}
          className="mt-12 bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
            Search Results :
          </h2>

          <div style={{ height: 650, width: "100%" }}>
            <DataGrid
              rows={results}
              columns={columns}
              getRowId={(row) => row.id}
              pageSizeOptions={[10, 20, 50]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
              onRowClick={(params) => handleResultClick(params.row)}
              sx={{
                borderRadius: 3,
                border: "1px solid #d1d5db",
                fontSize: "14px",

                /* HEADER STYLE */
                "& .MuiDataGrid-columnHeaders": {
                  background: "linear-gradient(to right, #4338ca, #6366f1)",
                  color: "#1e293b",
                  fontWeight: "bold",
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                  borderBottom: "3px solid #312e81",
                },

                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                  textTransform: "uppercase",
                },

                /* CELL BORDER */
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #e5e7eb",
                },

                /* ALTERNATING ROW COLORS */
                "& .MuiDataGrid-row:nth-of-type(odd)": {
                  backgroundColor: "#f8fafc",
                },

                "& .MuiDataGrid-row:nth-of-type(even)": {
                  backgroundColor: "#eef2ff",
                },

                /* HOVER EFFECT */
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#dbeafe",
                  cursor: "pointer",
                  transition: "0.2s",
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
