import { useNavigate } from "react-router-dom";
import { useBranchHover } from "../hooks/useBranchHover";
import { useEffect, useState } from "react";

const BRANCHES = [
  {
    id: "circleEarthEnvironmentalSciences",
    src: "/assets/bos/circle_earth_environmental_sciences.png",
    route: "/branches-of-science/Earth and Environmental Sciences",
    subs: "Ecology, Geography, Botany, AtmosphericSciences",
    angle: 0,
  },
  {
    id: "circleSocialScience",
    src: "/assets/bos/circle_social_science.png",
    route: "/branches-of-science/Social Sciences",
    subs: "MilitaryScience, PoliticalScience, Linguistics, BehaviouralSciences",
    angle: 60,
  },
  {
    id: "circleHealthLifeSciences",
    src: "/assets/bos/circle_health_life_sciences.png",
    route: "/branches-of-science/Health and Life Sciences",
    subs: "Nursing, NeuroScience, Pharmacology, Toxicology",
    angle: 120,
  },
  {
    id: "circleAppliedSciences",
    src: "/assets/bos/circle_applied_sciences.png",
    route: "/branches-of-science/Applied Sciences",
    subs: "FoodScience, Engineering, Architecture, Crystallography, Gemmology",
    angle: 180,
  },
  {
    id: "circleMathematics",
    src: "/assets/bos/circle_mathematics.png",
    route: "/branches-of-science/Mathematics",
    subs: "AppliedMathematics, Measurement",
    angle: 240,
  },
  {
    id: "circlePhysicalSciences",
    src: "/assets/bos/circle_physical_science.png",
    route: "/branches-of-science/Physical Sciences",
    subs: "Astronomy, Physics, Chemistry, Biology",
    angle: 300,
  },
];

export default function BranchesOfScience() {
  const navigate = useNavigate();
  const { tooltips, fetchBranchData } = useBranchHover();

  // Track whether we are in portrait mode
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const updateOrientation = () => setIsPortrait(mq.matches);

    updateOrientation();
    mq.addEventListener("change", updateOrientation);

    return () => mq.removeEventListener("change", updateOrientation);
  }, []);

  const [circleSize, setCircleSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(
        window.innerWidth * 0.75,
        window.innerHeight * 0.8,
        1060,
      );
      setCircleSize(size);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="w-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/bos/bg-new.jpg')",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      {/* Nav */}
      <nav
        className="flex-shrink-0 flex justify-end items-center px-8 lg:px-16 bg-[#7EFEFE] gap-6 lg:gap-9"
        style={{ height: "clamp(36px, 6vh, 56px)" }}
      >
        <div
          className="flex gap-2 cursor-pointer items-center"
          onClick={() => navigate("/dashboard")}
        >
          <p className="text-[#2b1c35] font-bold text-lg">🏠︎ Home</p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        {/* SEARCH BUTTON */}
        <div className="absolute top-6 right-10 z-50">
          <button
            onClick={() => navigate("/branches-of-science/search")}
            className="bg-[white] text-[#07094e] font-semibold px-8 py-2 rounded-lg shadow-lg hover:bg-[#bbbabb]"
          >
            🔍 Search
          </button>
        </div>

        <div
          className="relative"
          style={{
            width: circleSize,
            height: circleSize,
          }}
        >
          {/* Center glow circle */}
          <img
            src="/assets/bos/center_circle.png"
            alt="Center"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: "47%", height: "47%", objectFit: "contain" }}
          />

          {/* Branch circles */}
          {BRANCHES.map((branch) => {
            // Orientation-based radii
            const radiusX = isPortrait ? 36 : 55;
            const radiusY = isPortrait ? 40 : 33;

            const rad = (branch.angle * Math.PI) / 180;
            const xPct = 50 + radiusX * Math.cos(rad);
            const yPct = 50 + radiusY * Math.sin(rad);

            return (
              <div
                key={branch.id}
                className="absolute group cursor-pointer"
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  transform: "translate(-50%, -50%)",
                  width: "45%",
                  height: "50%",
                }}
                onMouseEnter={() => fetchBranchData(branch.id, branch.subs)}
                onClick={() => navigate(branch.route)}
              >
                {tooltips[branch.id] && (
                  <div
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white rounded px-2 py-1 z-50 pointer-events-none whitespace-nowrap"
                    style={{ fontSize: "clamp(0.55rem, 1.2vmin, 0.8rem)" }}
                  >
                    {tooltips[branch.id]}
                  </div>
                )}

                <img
                  src={branch.src}
                  alt={branch.id}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
