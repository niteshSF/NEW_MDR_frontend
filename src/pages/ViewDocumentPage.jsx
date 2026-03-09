import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function ViewDocumentPage() {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch manuscript details by id
        const res = await api.get(`/api/v1/manuscripts/${id}`);
        setData(res.data);

        // Fetch documents by manuscript name
        const fileRes = await api.get(`/api/v1/viewDocument/${res.data.name}`);
        setFiles(fileRes.data.files);
        console.log("TYPE:", data.type);
        console.log("FILES:", files);
      } catch (err) {
        console.error("Error loading manuscript:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="text-center mt-20 text-lg">Manuscript not found</div>
    );
  }

  const imageFiles = files.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  const pdfFiles = files.filter((f) => /\.pdf$/i.test(f));

  let displayFiles = [];

  if (type === "Manuscripts") {
    displayFiles = imageFiles;
  }

  if (type === "Books") {
    displayFiles = pdfFiles;
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
              Subject : {data.subject?.name}
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
              {displayFiles.length}
            </span>
          </h2>

          {displayFiles.length === 0 ? (
            <div className="text-gray-500 italic text-center py-10">
              No documents available
            </div>
          ) : (
            <div
              className="grid gap-6 justify-center"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
              }}
            >
              {type === "Manuscripts" ? (
                <PhotoProvider>
                  {displayFiles.map((file, index) => {
                    const fileUrl = `http://localhost:8000/api/v1/viewDocument/${data.name}/${encodeURIComponent(file)}`;

                    return (
                      <PhotoView key={index} src={fileUrl}>
                        <img
                          src={fileUrl}
                          alt={file}
                          className="rounded-xl shadow-md cursor-pointer hover:scale-105 transition"
                        />
                      </PhotoView>
                    );
                  })}
                </PhotoProvider>
              ) : (
                displayFiles.map((file, index) => {
                  const fileUrl = `http://localhost:8000/api/v1/viewDocument/${data.name}/${encodeURIComponent(file)}`;

                  return (
                    <div
                      key={index}
                      onClick={() => window.open(fileUrl, "_blank")}
                      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer p-5 flex flex-col items-center text-center"
                    >
                      <div className="text-red-600 text-5xl mb-4">📄</div>

                      <p className="font-semibold text-gray-800 break-words mb-2">
                        {file}
                      </p>

                      <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Open
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
