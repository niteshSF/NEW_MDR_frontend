import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function TopicDetailPage() {
  const { branch, topic } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    async function loadTopic() {
      const response = await fetch("/assets/topics/topics.json");
      const json = await response.json();

      const topicData = json.find(
        (item) => item.branch === branch && item.topic === topic,
      );

      setData(topicData);
    }

    async function loadCounts() {
      const response = await api.get(`/api/v1/manuscripts/counts`, {
        params: {
          subject: topic,
        },
      });

      setCounts(response.data);
    }

    loadTopic();
    loadCounts();
  }, [branch, topic]);

  if (!data) return null;

  const descLength = data.description.length;

  let dynamicTextSize = "text-[clamp(18px,1.2vw+0.6vh,26px)]";

  if (descLength < 400) {
    dynamicTextSize = "text-[clamp(22px,1.6vw+0.4vh,34px)]";
  } else if (descLength < 800) {
    dynamicTextSize = "text-[clamp(18px,1.3vw+0.55vh,28px)]";
  } else {
    dynamicTextSize = "text-[clamp(17px,1vw+0.6vh,22px)]";
  }

  const layoutType = data.layout || "type1";

  return (
    <div
      className={`min-h-[100svh] flex flex-col bg-cover bg-center text-${
        data.textColor || "white"
      }`}
      style={{
        backgroundImage: `url(/assets/topics/${data.backgroundImage})`,
      }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 flex justify-end px-16 py-2 gap-10 cursor-pointer font-bold shrink-0"
        style={{
          backgroundColor: data?.navBg || "white",
          color: data?.navTextColor || "#2b1c35",
        }}
      >
        <div onClick={() => navigate("/branches-of-science")}>🏠︎ Home</div>
        <div onClick={() => navigate(-1)}>🡄 Back</div>
      </nav>

      <div
        className={`flex-1 ${layoutType === "type2" ? "" : "px-4 sm:px-8 md:px-16 lg:px-24"}`}
      >
        {layoutType === "type1" && (
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-[1600px] flex flex-col items-center">
              {/* TITLE */}
              <div className="pt-6 w-full">
                <img
                  src={`/assets/topics/${data.titleImage}`}
                  alt="Title"
                  className="w-[clamp(200px,26vw+2vh,560px)]"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="flex justify-center my-[clamp(20px,4vh,80px)] w-full">
                <div
                  className={`
                max-w-[95vw]
                md:max-w-5xl
                lg:max-w-5xl
                xl:max-w-7xl
                text-justify
                leading-[clamp(1.4,1.2vw+0.8vh,2)]
                px-2
                ${dynamicTextSize}
              `}
                >
                  {data.description}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end w-full pb-8 gap-[clamp(6px,1px,124px)] flex-wrap items-end pr-4 md:pr-0">
                {["Manuscripts", "Books", "Articles"].map((item) => (
                  <div
                    key={item}
                    onClick={() =>
                      navigate(
                        `/branches-of-science/${branch}/${topic}/${item}`,
                      )
                    }
                    className="flex flex-col items-center justify-end text-center cursor-pointer w-[clamp(90px,10vw+0vh,180px)]"
                  >
                    <div className="h-[clamp(80px,8vw+2vh,150px)] flex items-end">
                      <img
                        src={`/assets/topics/${item}.png`}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <p
                      className="mt-1 px-8 py-0.5 rounded-lg bg-fuchsia-900 bg-opacity-60 text-white 
                        text-[clamp(12px,1vw+0.5vh,20px)] font-semibold"
                    >
                      {counts[item] || 0}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================================== */}

        {layoutType === "type2" && (
          <div className="flex flex-col lg:flex-row min-h-[calc(100svh-48px)]">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-1/2 flex lg:items-center">
              <div className="w-full max-w-2xl px-6 lg:pl-10 lg:pr-10 py-10 lg:py-0 flex flex-col justify-center">
                {/* TITLE (LEFT ALIGNED) */}
                <div className="w-auto">
                  <img
                    src={`/assets/topics/${data.titleImage}`}
                    alt="Title"
                    className="w-[clamp(200px,22vw+2vh,300px)]"
                  />
                </div>

                {/* DESCRIPTION */}
                <div
                  className={`
            mt-[clamp(20px,1vh,60px)]
            max-w-4xl
            text-justify
            leading-[clamp(1.4,1.2vw+0.8vh,2)]
            ${dynamicTextSize}
          `}
                >
                  {data.description}
                </div>

                {/* BUTTONS */}
                <div className="flex justify-center gap-[clamp(12px,2vw,40px)] flex-wrap mt-[clamp(30px,5vh,70px)]">
                  {["Manuscripts", "Books", "Articles"].map((item) => (
                    <div
                      key={item}
                      onClick={() =>
                        navigate(
                          `/branches-of-science/${branch}/${topic}/${item}`,
                        )
                      }
                      className="flex flex-col items-center cursor-pointer w-[clamp(90px,8vw+1vh,160px)]"
                    >
                      <div className="h-[clamp(80px,7vw+2vh,130px)] flex items-end">
                        <img
                          src={`/assets/topics/${item}.png`}
                          className="max-h-full object-contain"
                        />
                      </div>

                      <p
                        className="mt-1 px-8 py-0.5 rounded-lg bg-fuchsia-900 bg-opacity-60 text-white 
                  text-[clamp(12px,1vw+0.5vh,20px)] font-semibold capitalize"
                      >
                        {counts[item] || 0}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden lg:flex lg:flex-1" />
          </div>
        )}
      </div>
    </div>
  );
}
