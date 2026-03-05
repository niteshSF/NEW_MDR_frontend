import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SubtopicsPage() {
  const { branch } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [branchImage, setBranchImage] = useState("");
  const [counts, setCounts] = useState({});

  // AUTO LOAD IMAGES FROM FOLDER
  useEffect(() => {
    async function loadData() {
      try {
        // Load static branch structure
        const response = await fetch("/assets/sub-branches/branches.json");
        const data = await response.json();
        const branchData = data.find((item) => item.id === branch);

        if (branchData) {
          setImages(branchData.subs);
          setBranchImage(branchData.image);

          // Fetch counts for this branch
          const countsResponse = await fetch(
            `http://127.0.0.1:8000/api/v1/manuscripts/discipline-counts?discipline=${branch}`,
          );

          const countsData = await countsResponse.json();
          setCounts(countsData);
        }
      } catch (err) {
        console.error("Error loading data", err);
      }
    }

    loadData();
  }, [branch]);

  // =============================
  // SEMI-CIRCLE SETTINGS
  // =============================

  let radius = 440;
  const centerX = 49.2;
  const centerY = 93;
  const totalItems = images.length;

  let arcDegrees;

  switch (totalItems) {
    case 1:
      arcDegrees = 0;
      break;
    case 2:
      arcDegrees = 60;
      break;
    case 3:
      arcDegrees = 85;
      break;
    case 4:
      arcDegrees = 130;
      break;
    case 5:
    default:
      arcDegrees = 140;
      radius = 450;
      break;
  }

  const arcRadians = (arcDegrees * Math.PI) / 180;

  const startAngle = Math.PI / 2 - arcRadians / 2;
  const angleStep = totalItems > 1 ? arcRadians / (totalItems - 1) : 0;

  return (
    <div
      className="min-h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/bos/subtopics-bg.png')",
      }}
    >
      {/* NAV */}
      <nav className="flex justify-end p-2 pr-16 gap-10 bg-[#7EFEFE]">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer font-bold text-[#2b1c35]"
        >
          🡄 Back
        </div>
      </nav>

      {/* HEADER IMAGE */}
      {branchImage && (
        <div className="flex justify-center mt-3">
          <img
            src={`/assets/sub-branches/${branchImage}`}
            alt="Branch Header"
            className="w-[250px] h-auto sm:w-[200px] lg:w-[28vw] object-contain"
          />
        </div>
      )}

      {/* SEMI CIRCLE */}
      <div className="relative h-[45vh] w-full">
        {images.map((img, index) => {
          let angle =
            totalItems === 1 ? Math.PI / 2 : startAngle + index * angleStep;

          // Pull only the extreme edges inward slightly
          if (totalItems > 3) {
            const compressionFactor = 0.33;

            if (index === 0) {
              angle += angleStep * -compressionFactor;
            }

            if (index === totalItems - 1) {
              angle -= angleStep * -compressionFactor;
            }
          }

          let x = centerX + (radius * Math.cos(angle)) / 11;
          let y = centerY - (radius * Math.sin(angle)) / 11;

          // Push extreme ends slightly downward
          if (totalItems > 2) {
            const tiltOffset = 25;

            if (index === 0 || index === totalItems - 1) {
              y += tiltOffset;
            }
          }

          return (
            <img
              key={index}
              src={`/assets/sub-branches/${img}`}
              alt={img}
              onClick={() =>
                navigate(
                  `/branches-of-science/${branch}/${img.replace(".png", "")}`,
                )
              }
              className="absolute w-[180px] h-[180px] sm:w-[150px] sm:h-[150px] lg:w-[22vw] lg:h-[40vh] cursor-pointer transition-transform duration-300 hover:scale-110"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>

      {/* ================= TOTAL SECTION ================= */}
      <div className="flex flex-wrap justify-center items-end gap-[clamp(12px,2vw,60px)] mt-[120px] sm:mt-[60px] lg:mt-[40px] pb-[clamp(10px,1vh,40px)]">
        {["Manuscripts", "Books", "Articles"].map((item) => (
          <div
            key={item}
            className="flex flex-col items-center 
                 w-[clamp(90px,10vw,200px)]"
          >
            {/* Image */}
            <div className="h-[clamp(80px,9vw,180px)] flex items-end">
              <img
                src={`/assets/topics/${item}.png`}
                alt={item}
                className="max-h-full object-contain"
              />
            </div>
            {/* Count */}
            <div
              className="mt-[clamp(1px,0vh,1px)] 
                   bg-[#7A78A6] text-white 
                   px-[clamp(16px,3vw,50px)] 
                   py-[clamp(2px,0vh,10px)] 
                   rounded-lg 
                   text-[clamp(10px,1.5vw,18px)] 
                   font-bold"
            >
              {counts[item] || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
