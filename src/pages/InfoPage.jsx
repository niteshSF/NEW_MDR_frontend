import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function InfoPage() {
  const { branch, topic, id, type } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/api/v1/manuscripts/${id}/`);
        setData(res.data);
      } catch (err) {
        console.error("Error loading manuscript:", err);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[clamp(1.2rem,2vw,1.8rem)] font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  const info = data.additional_info?.[0] || {};

  /* ===== SECTION COMPONENTS ===== */

  const OriginalManuscriptInfo = () => (
    <Section title="Original Manuscript Information">
      <Field label="Accession Number" value={data.accession_number} />
      <Field label="Name" value={data.name} />
      <Field label="Name (Indic)" value={data.indic_name} />
      <Field label="Name (Diacritical)" value={data.diacritical_name} />

      <Field label="Manuscript: Collection code" value={data.manuscript_code} />
      <Field label="Language" value={data.language?.name} />
      <Field label="Script" value={data.script?.name} />
      <Field label="Category" value={data.category?.name} />
      <Field label="Type" value={data.type?.name} />

      <Field
        label="Topic"
        value={
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
            {data.subject?.discipline?.name}
          </span>
        }
      />

      <Field
        label="Subject"
        value={
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
            {data.subject?.name}
          </span>
        }
      />
    </Section>
  );

  const ContentDetails = () => (
    <Section title="Content Details">
      <Field label="Summary" value={data.summary} full />
      <Field label="Table of Contents" value={data.toc} full />
      <Field
        label="Contribution to Subject"
        value={info.subject_contribution}
        full
      />
      <Field label="Uniqueness of Work" value={info.work_uniqueness} full />
    </Section>
  );

  const AuthorOrigin = () => (
    <Section title="Author & Origin">
      <Field label="Author Name" value={info.author_name} />
      <Field label="Author (Indic)" value={info.author_indic_name} />
      <Field
        label="Author (Diacritical)"
        value={info.author_diacritical_name}
      />
      <Field label="Date of Composition" value={data.date_of_composition} />
      <Field label="Source" value={data.source} />
      <Field label="Pg. in Source" value={data.pg_in_source} />
    </Section>
  );

  const PublicationArchive = () => (
    <Section title="Publication & Archive">
      <Field label="Complete?" value={data.is_complete ? "Yes" : "No"} />
      <Field label="Published?" value={data.published ? "Yes" : "No"} />
      <Field label="No. of Folios" value={data.no_of_folios} />

      <Field
        label="Tags"
        value={
          <div className="flex flex-wrap gap-2">
            {data.tags?.map((tag) => (
              <span
                key={tag.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        }
        full
      />

      <Field label="Published Title" value={data.book?.published_title} />
      <Field label="Translator" value={data.book?.translator_name} />
      <Field label="Publisher" value={data.book?.publisher_name} />
      <Field label="Editor" value={data.book?.editor_name} />
      <Field label="Year" value={data.book?.publication_year} />
      <Field label="Place" value={data.book?.publication_place} />
      <Field label="No. of Pages" value={data.book?.no_of_pages} />
      <Field label="Archive Link" value={data.book?.archive_link} full />
      <Field label="Beginning Line" value={data.book?.beginning_line} />
      <Field label="Ending Line" value={data.book?.ending_line} />
      <Field label="Colophon" value={data.book?.colophon} full />
      <Field label="Remarks" value={info.notes} full />
    </Section>
  );

  /* ===== ORDER BASED ON TYPE ===== */

  const sectionOrder =
    type?.toLowerCase() === "manuscripts"
      ? [
          <OriginalManuscriptInfo key="1" />,
          <ContentDetails key="2" />,
          <AuthorOrigin key="3" />,
          <PublicationArchive key="4" />,
        ]
      : [
          <AuthorOrigin key="1" />,
          <PublicationArchive key="2" />,
          <ContentDetails key="3" />,
          <OriginalManuscriptInfo key="4" />,
        ];

  return (
    <>
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-500 text-white shadow-xl">
        <div className="max-w-[95vw] mx-auto flex justify-between items-center px-[clamp(1rem,2vw,2rem)] py-[clamp(0.8rem,1.5vw,1.4rem)]">
          <div className="text-[clamp(1.2rem,2vw,2rem)] font-bold max-w-[80%]">
            {data.name}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="bg-white text-blue-900 px-5 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            ⮜ Back
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="min-h-screen bg-gradient-to-br from-[#cfd8ff] to-[#eaeaff] pb-20 px-6">
        <div className="w-full max-w-[95vw] mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="p-[clamp(1.2rem,2vw,3rem)] space-y-[clamp(2rem,3vw,4rem)]">
            <div className="w-full flex justify-center">
              <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-3 text-center">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {type} Detailed Information
                  </h1>
                </div>
              </div>
            </div>

            {/* DYNAMIC SECTION ORDER */}
            {sectionOrder}

            <div className="text-center pt-6">
              <button
                onClick={() =>
                  navigate(
                    `/branches-of-science/${branch}/${topic}/${type}/${id}/view`,
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold rounded-full shadow-md"
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

/* ===== SECTION ===== */

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-[clamp(1.6rem,2vw,2.2rem)] font-bold text-blue-900 border-l-4 border-blue-500 pl-3 mb-6">
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

/* ===== FIELD ===== */

function Field({ label, value, full }) {
  return (
    <div className={full ? "col-span-full" : ""}>
      <p className="text-[clamp(1rem,1.1vw,1.3rem)] font-semibold text-gray-600 mb-2">
        {label}
      </p>

      <div className="bg-gray-100 p-[clamp(0.8rem,1vw,1.3rem)] rounded-lg min-h-[60px] break-words">
        <span className="text-[clamp(1.1rem,1.3vw,1.5rem)] font-bold text-gray-800">
          {value || "—"}
        </span>
      </div>
    </div>
  );
}
