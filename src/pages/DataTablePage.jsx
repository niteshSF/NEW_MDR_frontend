import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function DataTablePage() {
  const { branch, topic, type } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let response;

        if (type === "Books") {
          response = await api.get("/api/v1/books", {
            params: { subject: topic },
          });
        } else if (type === "Manuscripts") {
          response = await api.get("/api/v1/manuscripts/", {
            params: { subject: topic },
          });
        } else if (type === "Articles") {
          setData([]); // no article data yet
          return;
        }

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (topic) {
      fetchData();
    }
  }, [topic, type]);

  const filteredData = data.filter((item) => {
    const searchText = search.toLowerCase();

    if (type === "Books") {
      const title = item.published_title?.toLowerCase() || "";
      const publisher = item.publisher_name?.toLowerCase() || "";

      return title.includes(searchText) || publisher.includes(searchText);
    }

    const name = item.name?.toLowerCase() || "";
    const author = item.additional_info?.[0]?.author_name?.toLowerCase() || "";
    const code = item.manuscript_code?.toLowerCase() || "";
    const accession = String(item.accession_number || "").toLowerCase();

    return (
      name.includes(searchText) ||
      author.includes(searchText) ||
      code.includes(searchText) ||
      accession.includes(searchText)
    );
  });

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat font-epilogue"
      style={{
        backgroundImage: "url(/assets/dashboard-bg.png)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* NAV */}
      <nav className="sticky top-0 z-50 flex justify-end px-4 md:px-16 py-2 bg-[#A6C4FF] gap-6 md:gap-10 text-[#646464] font-semibold text-sm md:text-base">
        <div
          className="text-[#2b1c35] font-bold cursor-pointer hover:underline"
          onClick={() => navigate("/branches-of-science")}
        >
          🏠︎ Home
        </div>
        <div
          className="text-[#2b1c35] font-bold cursor-pointer hover:underline"
          onClick={() => navigate(-1)}
        >
          🡄 Back
        </div>
      </nav>

      {/* TITLE SECTION */}
      <div className="py-2 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center">
          {/* LEFT EMPTY SPACE (for perfect centering on desktop) */}
          <div className="hidden md:block"></div>

          {/* CENTER TITLE */}
          <div className="flex justify-center">
            <div className="relative w-[clamp(200px,25vw,500px)]">
              <img
                src="/assets/center_title.png"
                alt="title background"
                className="w-full h-auto"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white font-bold text-[clamp(16px,2vw,30px)] drop-shadow-[3px_3px_0_black]">
                  List of {type}
                </h1>

                <h2 className="text-cyan-300 font-extrabold text-[clamp(18px,2.5vw,40px)] drop-shadow-[3px_3px_0_black]">
                  {topic}
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CONTROLS */}
          <div className="flex flex-col items-center mt-6 md:mt-2">
            {/* SEARCH */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-2 w-[220px] sm:w-[260px] bg-[#FFEEEE] rounded-lg shadow-md focus:outline-none"
            />

            {/* TOTAL SECTION */}
            <div className="flex flex-col items-center mt-6">
              <h4 className="text-[#94E5FF] font-bold text-lg text-center">
                Total {type}
              </h4>

              <p className="bg-[#776993] text-white px-8 py-1 rounded-xl mt-2 text-center min-w-[60px]">
                {filteredData.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="px-4 md:px-10 pb-1">
        <div className="rounded-lg max-h-[62vh] overflow-y-auto">
          {type === "Manuscripts" ? (
            // MANUSCRIPT TABLE
            <table
              className="w-full border-separate min-w-[600px]"
              style={{ borderSpacing: "0 8px" }}
            >
              <thead className="sticky top-0 z-10 bg-[#5e5374]">
                <tr className="text-[#96E6FF] text-[clamp(14px,1.2vw,24px)]">
                  <th className="py-2 text-center">Sl.No</th>
                  <th className="py-2 pl-4 md:pl-10 text-left">Name</th>
                  <th className="py-2 text-left">Author</th>
                  <th className="py-2 text-left">{type}: Collection code</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="bg-[#776993] text-white py-3 text-center rounded-lg"
                    >
                      No Result Found
                    </td>
                  </tr>
                )}
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`${item.id}`)}
                    className="bg-[#776993] hover:opacity-80 cursor-pointer text-white text-[clamp(14px,1.1vw,22px)]"
                  >
                    <td className="py-3 text-center">{index + 1}</td>
                    <td className="pl-4 md:pl-10">{item.name}</td>
                    <td>{item.additional_info?.[0]?.author_name || "—"}</td>
                    <td>{item.manuscript_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // OTHER TYPES TABLE (Books, Articles)
            <table
              className="w-full border-separate min-w-[900px]"
              style={{ borderSpacing: "0 8px" }}
            >
              <thead className="sticky top-0 z-10 bg-[#5e5374]">
                <tr className="text-[#96E6FF] text-[clamp(14px,1.2vw,24px)]">
                  <th className="py-2 text-center">Sl.No</th>
                  <th className="py-2 pl-4 md:pl-10 text-left">
                    Original Title
                  </th>
                  <th className="py-2 text-left">Author</th>
                  <th className="py-2 text-left">Publisher Name</th>
                  <th className="py-2 text-left">Published Title</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="bg-[#776993] text-white py-3 text-center rounded-lg"
                    >
                      No Result Found
                    </td>
                  </tr>
                )}
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (type === "Books") {
                        navigate(
                          `/branches-of-science/${branch}/${topic}/Books/${item.manuscript_id}`,
                        );
                      } else if (type === "Manuscripts") {
                        navigate(`${item.id}`);
                      }
                    }}
                    className="bg-[#776993] hover:opacity-80 cursor-pointer text-white text-[clamp(14px,1.1vw,22px)]"
                  >
                    <td className="py-3 text-center">{index + 1}</td>
                    <td className="pl-4 md:pl-10">
                      {item.original_title || "—"}
                    </td>

                    <td>{item.author_name || "—"}</td>
                    <td>{item.publisher_name || "—"}</td>
                    <td className="pl-4 md:pl-10">
                      {item.published_title || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
