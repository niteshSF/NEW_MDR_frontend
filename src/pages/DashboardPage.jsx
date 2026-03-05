import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DashboardCard from "../components/Dashboard/DashboardCard";

const ORDER = ["Documents", "Manuscripts", "Books", "Articles"];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Documents: 0,
    Manuscripts: 0,
    Books: 0,
    Articles: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard counts from backend
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/manuscripts/dashboard-counts-branch?branch=st",
        );
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  // Set viewport height for mobile devices
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div
      className="w-screen relative overflow-hidden bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('/assets/dashboard-bg.png')",
        backgroundSize: "100% 100%",
        minHeight: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      {/* Logo Top-Left */}
      <div
        className="absolute top-10 left-3 sm:top-6 sm:left-6 lg:top-10 lg:left-12 z-50 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/assets/name-logo.png"
          alt="Home Logo"
          className="w-[140px] sm:w-[150px] md:w-[220px] lg:w-[340px] xl:w-[420px] h-auto"
        />
      </div>

      {/* Top-Right Nav Icons */}
      <div className="absolute top-10 right-3 sm:top-6 sm:right-6 lg:top-10 lg:right-14 z-50 flex gap-2 sm:gap-4 lg:gap-8">
        <img
          src="/assets/contact.png"
          alt="Contact"
          className="w-11 sm:w-[60px] md:w-[80px] lg:w-[110px] cursor-pointer h-auto"
          onClick={() => navigate("/contact")}
        />
        <img
          src="/assets/about-the-project.png"
          alt="About"
          className="w-16 sm:w-[90px] md:w-[130px] lg:w-[190px] cursor-pointer h-auto"
          onClick={() => navigate("/about")}
        />
        <img
          src="/assets/credits.png"
          alt="Credits"
          className="w-11 sm:w-[60px] md:w-[80px] lg:w-[110px] cursor-pointer h-auto"
          onClick={() => navigate("/credit")}
        />
      </div>

      {/* Dashboard Content */}
      <div
        className="flex items-center justify-center w-full px-2 sm:px-4"
        style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
      >
        {loading && <p className="text-white text-2xl">Loading...</p>}
        {error && <p className="text-white text-xl font-bold">{error}</p>}

        {!loading && !error && (
          <>
            {/* MOBILE PORTRAIT: 2x2 grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm sm:hidden pt-20 pb-16">
              {ORDER.map((key) => (
                <MobileCard key={key} cardKey={key} value={data[key]} />
              ))}
            </div>

            {/* TABLET + DESKTOP: single row */}
            <div className="hidden sm:flex flex-nowrap justify-center items-end gap-6 md:gap-6 lg:gap-16 w-full pt-20 pb-16">
              {ORDER.map((key) => (
                <DashboardCard key={key} cardKey={key} value={data[key]} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Enter Button - Bottom Right */}
      <div className="absolute right-14 bottom-12 sm:right-14 sm:bottom-6 md:bottom-6 md:right-24 lg:right-44 lg:bottom-10 z-50">
        <img
          src="/assets/sciencetechnology/enter-front.png"
          alt="Enter"
          className="cursor-pointer w-[80px] sm:w-[10vw] md:w-[10vw] lg:w-[12vw] max-w-[190px]"
          onClick={() => navigate("/branches-of-science")}
        />
      </div>
    </div>
  );
}

// Mobile card component
function MobileCard({ cardKey, value }) {
  const images = {
    Documents: "/assets/documents.png",
    Articles: "/assets/articles.png",
    Books: "/assets/books.png",
    Manuscripts: "/assets/manuscripts.png",
  };

  return (
    <div className="flex flex-col items-center justify-end">
      <img
        src={images[cardKey]}
        alt={cardKey}
        className="object-contain w-full max-h-[15vh]"
      />
      <h4 className="bg-purple-400 bg-opacity-70 rounded-lg mt-1 px-2 py-1 w-[90%] text-center text-white font-semibold text-sm">
        {cardKey}
      </h4>
      <h3 className="bg-purple-400 bg-opacity-70 rounded-lg mt-1 px-2 py-1 w-[50%] text-center text-white font-bold text-sm">
        {value}
      </h3>
      <div className="mb-3"></div>
    </div>
  );
}
