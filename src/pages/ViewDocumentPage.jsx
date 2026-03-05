import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ViewDocumentPage() {
  const { accession_number } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/api/v1/manuscripts/${accession_number}`);
        setData(res.data);

        const pdfRes = await api.get(
          `/api/v1/viewDocument/${accession_number}`,
        );
        setPdfs(pdfRes.data.files);
      } catch (err) {
        console.error("Error loading manuscript:", err);
      } finally {
        setLoading(false);
      }
    }

    if (accession_number) fetchData();
  }, [accession_number]);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="text-center mt-20 text-lg">Manuscript not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8ecff] to-[#f5f7ff] py-6 sm:py-10 px-4 sm:px-6">
      <div className="w-full max-w-[1900px] mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-blue-900 to-blue-600 text-white px-5 sm:px-8 py-4 sm:py-5">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {data.name}
            </h1>
            <p className="text-xs sm:text-sm opacity-80 mt-1">
              Code: {data.accession_number}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto bg-white text-blue-900 font-semibold px-5 py-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            ⮜ Back
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2">
            📂 Total Documents
            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {pdfs.length}
            </span>
          </h2>

          {pdfs.length === 0 ? (
            <div className="text-gray-500 italic text-center py-10">
              No documents available
            </div>
          ) : (
            /* AUTO RESPONSIVE GRID */
            <div
              className="grid gap-6 justify-center"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
              }}
            >
              {pdfs.map((file, index) => {
                const fileUrl = `http://localhost:8000/api/v1/viewDocument/${accession_number}/${encodeURIComponent(file)}`;

                const openFile = () => {
                  window.open(fileUrl, "_blank");
                };

                return (
                  <div
                    key={index}
                    onClick={openFile}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer p-5 sm:p-6 flex flex-col items-center text-center"
                  >
                    {/* ICON */}
                    <div className="text-red-600 text-4xl sm:text-5xl mb-4">
                      📄
                    </div>

                    {/* FILE NAME */}
                    <p className="font-semibold text-gray-800 break-words text-sm sm:text-base mb-2">
                      {file}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500 mb-4">
                      PDF Document
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openFile();
                      }}
                      className="mt-auto w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm font-semibold"
                    >
                      Open
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
