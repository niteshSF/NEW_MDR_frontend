import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const leftSections = [
  {
    title: "Overview",
    content: `Modern India is witnessing a unique blend of tradition and modernity, both domestically and on the international stage. On one hand, Indian Information Technology is being celebrated as a global powerhouse, and on the other, traditional Indian knowledge systems like Ayurveda, Yoga, and more are gaining serious recognition and application. The contribution of ancient Bharatiya civilizations to the fields of Science and Technology is vast and invaluable. Today, the world is turning its attention to these treasure troves of knowledge preserved in ancient manuscripts, seeking to integrate them into contemporary applications. There is, therefore, an urgent need to collate, preserve, and digitize these manuscripts for access by the scientific community, students, and anyone interested in this knowledge. The digital repository is an initiative aimed at preserving and presenting these ancient, rare manuscripts in digital format.`,
  },
  {
    title: "India's Scientific Heritage",
    content: `India has a rich and highly productive scientific heritage. It houses one of the largest collections of scientific manuscripts of any civilization in the world. While an exact count of these manuscripts remains elusive, estimates suggest that there are between 20,000 and 100,000 manuscripts. Many of these are housed in institutions such as Oriental Manuscript Libraries, Indological Research Institutions, universities, mutts, and archives, with some still in private collections. Manuscripts are also preserved in libraries across the world in countries such as the U.K., France, Germany, the U.S., and in Asian nations like Sri Lanka, Nepal, Burma, Bhutan, China (Tibet), and Thailand.`,
  },
  {
    title: "Project Initiative",
    content: `Unfortunately, there is no comprehensive or detailed data regarding the number, extent, or distribution of these scientific manuscripts. The scientific texts currently available in published form represent less than 2% of the total scientific literature contained in manuscripts. This project aims to create a comprehensive bibliography of manuscripts related to Science and Technology. It is a pioneering initiative designed to allow users to search, identify, and locate manuscripts and books in the field of science and technology.`,
  },
];

const rightSections = [
  {
    title: "Uniqueness of the Project",
    list: [
      "Comprehensive Database Access",
      "Collection of Rare and Valuable Works",
      "Advanced Search Capabilities",
      "Image-Level Tagging",
      "Comprehensive Resource for Students and Researchers",
      "Workflow Management for Manuscript Publishing",
      "Remote Collaboration Support",
      "Reporting and Filtering Features",
    ],
  },
  {
    title: "Project Goals and Impact",
    content: `This digital initiative will serve as a valuable resource for scholars, researchers, and anyone interested in exploring the rich tradition of Bharatiya science and technology. By making this information widely accessible, the project hopes to encourage academic contributions that bring this invaluable knowledge into the public domain. To address the critical gap in knowledge, the current project will develop a comprehensive, classified, electronic master catalogue of all manuscripts and books on Science and Technology. This catalogue will contain detailed information about works written in Sanskrit, English, and various regional languages of India. The project will support scholars and researchers in their respective fields, facilitating further studies and the discovery of previously unknown theories in science and technology. It will also help raise global awareness about the original contributions of ancient India to the scientific world and encourage further research into both the practical and theoretical aspects of Indian systems of science and technology.`,
  },
];

const bg = {
  backgroundImage: "url('/assets/dashboard-bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function AboutPage() {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const handle = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const isDesktop = size.w >= 1024;

  // ── MOBILE ──────────────────────────────────────────────
  if (!isDesktop) {
    return (
      <div
        style={{
          ...bg,
          minHeight: "100dvh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Epilogue, sans-serif",
        }}
      >
        <Navbar />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            color: "white",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontWeight: 300,
              fontSize: size.w < 640 ? "22px" : "28px",
              marginBottom: "16px",
            }}
          >
            About the Project
          </h1>
          {[...leftSections, ...rightSections].map((sec, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  color: "#4da6ff",
                  fontWeight: "bold",
                  fontSize: size.w < 640 ? "13px" : "15px",
                  marginBottom: "6px",
                }}
              >
                {sec.title}
              </div>
              {sec.list ? (
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    fontSize: size.w < 640 ? "11px" : "13px",
                    lineHeight: 1.6,
                  }}
                >
                  {sec.list.map((item, j) => (
                    <li key={j}>
                      {String.fromCharCode(65 + j)}. {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  style={{
                    margin: 0,
                    textAlign: "justify",
                    fontSize: size.w < 640 ? "11px" : "13px",
                    lineHeight: 1.6,
                  }}
                >
                  {sec.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────────
  // Use vmin so font scales with BOTH width and height — prevents cropping
  const vmin = Math.min(size.w, size.h);
  const fs = `${vmin * 0.018}px`; // body ~1.8vmin
  const fsHeading = `${vmin * 0.022}px`; // heading ~2.2vmin
  const fsTitle = `${vmin * 0.048}px`; // title ~4.8vmin
  const gap = `${vmin * 0.018}px`;
  const pad = `${vmin * 0.001}px ${size.w * 0.015}px`;

  return (
    <div
      style={{
        ...bg,
        height: "100dvh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Epilogue, sans-serif",
        overflow: "hidden",
      }}
    >
      <Navbar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: pad,
          overflow: "hidden",
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "inherit",
            fontSize: fsTitle,
            letterSpacing: "0.05em",
            marginBottom: `${vmin * 0.01}px`,
            flexShrink: 0,
          }}
        >
          About the Project
        </div>

        {/* Two columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: `${size.w * 0.02}px`,
            flex: 1,
            overflow: "hidden",
            color: "white",
            fontSize: fs,
            lineHeight: 1.6,
          }}
        >
          {/* LEFT */}
          <div
            style={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap,
            }}
          >
            {leftSections.map((sec, i) => (
              <div
                key={i}
                style={{ overflow: "hidden", flexShrink: i === 0 ? 1 : 0 }}
              >
                <div
                  style={{
                    color: "#4da6ff",
                    fontWeight: "bold",
                    fontSize: fsHeading,
                    marginBottom: `${vmin * 0.004}px`,
                  }}
                >
                  {sec.title}
                </div>
                <p style={{ margin: 0, textAlign: "justify" }}>{sec.content}</p>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div
            style={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap,
            }}
          >
            {rightSections.map((sec, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <div
                  style={{
                    color: "#4da6ff",
                    fontWeight: "bold",
                    fontSize: fsHeading,
                    marginBottom: `${vmin * 0.004}px`,
                  }}
                >
                  {sec.title}
                </div>
                {sec.list ? (
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: `${vmin * 0.004}px`,
                    }}
                  >
                    {sec.list.map((item, j) => (
                      <li key={j}>
                        {String.fromCharCode(65 + j)}. {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ margin: 0, textAlign: "justify" }}>
                    {sec.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
