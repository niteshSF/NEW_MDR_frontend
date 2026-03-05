import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function InfoPage() {
  const { branch, topic, accession_number, type } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/api/v1/manuscripts/${accession_number}/`);
        setData(res.data);
      } catch (err) {
        console.error("Error loading manuscript:", err);
      }
    }

    if (accession_number) fetchData();
  }, [accession_number]);

  if (!data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center 
                      text-[clamp(1.2rem,2vw,1.8rem)] font-semibold text-gray-600"
      >
        Loading...
      </div>
    );
  }

  const info = data.additional_info || {};

  return (
    <>
      {/* ================= FIXED HEADER ================= */}
      <div
        className="sticky top-0 z-50
                   bg-gradient-to-r from-blue-900 to-blue-500 
                   text-white shadow-xl"
      >
        <div
          className="max-w-[95vw] mx-auto
                     flex justify-between items-center
                     px-[clamp(1rem,2vw,2rem)]
                     py-[clamp(0.8rem,1.5vw,1.4rem)]"
        >
          <div className="text-[clamp(1.2rem,2vw,2rem)] font-bold max-w-[80%] leading-tight">
            {/* {type} Detailed Information */}
            {data.name}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="bg-white text-blue-900 
                       text-[clamp(0.9rem,1vw,1.2rem)]
                       font-semibold 
                       px-[clamp(1rem,1.5vw,1.8rem)] 
                       py-[clamp(0.3rem,0.6vw,0.6rem)]
                       rounded-full shadow hover:bg-gray-100 transition"
          >
            ⮜ Back
          </button>
        </div>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <div
        className="min-h-screen bg-gradient-to-br from-[#cfd8ff] to-[#eaeaff] 
                    
                   pb-[clamp(2rem,4vw,5rem)]
                   px-[clamp(1rem,4vw,4rem)]"
      >
        <div className="w-full max-w-[95vw] mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div
            className="p-[clamp(1.2rem,2vw,3rem)] 
                          space-y-[clamp(2rem,3vw,4rem)]"
          >
            {/* ===== INTERNAL PAGE HEADER BOX ===== */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-lg mx-auto">
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-3 text-center">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {type} Detailed Information
                  </h1>
                </div>
              </div>
            </div>
            <Section title="Basic Information">
              <Field label="Accession Number" value={data.accession_number} />
              <Field label="Name" value={data.name} />
              <Field label="Name (Indic)" value={data.indic_name} />
              <Field label="Name (Diacritical)" value={data.diacritical_name} />

              <Field label="Manuscript Code" value={data.manuscript_code} />
              <Field label="Language" value={data.language?.name} />
              <Field label="Script" value={data.script?.name} />
              <Field label="Category" value={data.category?.name} />
              <Field label="Type" value={data.type?.name} />
              <Field
                label="Topic"
                value={
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-clip font-semibold">
                    {data.subject?.discipline?.name}
                  </span>
                }
              />
              {/* <Field label="Subject" value={data.subject?.name} /> */}
              <Field
                label="Subject"
                value={
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-wrap font-semibold">
                    {data.subject?.name}
                  </span>
                }
              />
            </Section>

            <Section title="Content Details">
              <Field label="Summary" value={data.summary} full />
              <Field label="Table of Contents" value={data.toc} full />
              <Field
                label="Contribution to Subject"
                value={info.subject_contribution}
                full
              />
              <Field
                label="Uniqueness of Work"
                value={info.work_uniqueness}
                full
              />
            </Section>

            <Section title="Author & Origin">
              <Field label="Author Name" value={info.author_name} />
              <Field label="Author (Indic)" value={info.author_indic_name} />
              <Field
                label="Author (Diacritical)"
                value={info.author_diacritical_name}
              />
              <Field
                label="Date of Composition"
                value={info.date_of_composition}
              />
              <Field label="Source" value={info.source} />
              <Field label="Pg. in Source" value={info.pg_in_source} />
            </Section>

            <Section title="Publication & Archive">
              <Field
                label="Complete?"
                value={data.is_complete ? "Yes" : "No"}
              />
              <Field label="Published?" value={data.published ? "Yes" : "No"} />
              <Field label="No. of Folios" value={info.no_of_folios} />
              <Field
                label="Tags"
                value={
                  <div className="flex flex-wrap gap-2">
                    {data.tags?.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-base font-sans"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                }
                full
              />
              <Field label="Published Title" value={info.published_title} />
              <Field label="Translator" value={info.translator_name} />
              <Field label="Publisher" value={info.publisher_name} />
              <Field label="Editor" value={info.editor_name} />
              <Field label="Year" value={info.publication_year} />
              <Field label="Place" value={info.publication_place} />
              <Field label="No. of Pages" value={info.no_of_pages} />
              <Field label="Archive Link" value={info.archive_link} full />
              <Field label="Beginning Line" value={info.beginning_line} />
              <Field label="Ending Line" value={info.ending_line} />
              <Field label="Colophon" value={info.colophon} full />
              <Field label="Remarks" value={info.notes} full />
            </Section>

            <div className="text-center pt-6">
              <button
                onClick={() =>
                  navigate(
                    `/branches-of-science/${branch}/${topic}/${type}/${accession_number}/view`,
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white 
                           text-[clamp(1rem,1.2vw,1.3rem)]
                           px-[clamp(2rem,3vw,3rem)] 
                           py-[clamp(0.6rem,1vw,1rem)]
                           font-semibold rounded-full shadow-md 
                           transition transform hover:-translate-y-0.5"
              >
                View {type}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= SECTION ================= */

function Section({ title, children }) {
  return (
    <div>
      <h2
        className="text-[clamp(1.6rem,2vw,2.2rem)] 
                   font-bold text-blue-900 
                   border-l-4 border-blue-500 
                   pl-3 mb-6"
      >
        {title}
      </h2>

      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ================= FIELD ================= */

function Field({ label, value, full }) {
  return (
    <div className={full ? "col-span-full" : ""}>
      <p
        className="text-[clamp(1rem,1.1vw,1.3rem)] 
                    font-semibold text-gray-600 mb-2"
      >
        {label}
      </p>

      <div
        className="bg-gray-100 
                      p-[clamp(0.8rem,1vw,1.3rem)] 
                      rounded-lg min-h-[60px] break-words"
      >
        <span
          className="text-[clamp(1.1rem,1.3vw,1.5rem)] 
                     font-bold text-gray-800 
                     leading-relaxed"
        >
          {value || "—"}
        </span>
      </div>
    </div>
  );
}
