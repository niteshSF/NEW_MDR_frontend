// import { useNavigate } from "react-router-dom";

// export default function ScienceTechnology() {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="w-screen h-screen relative overflow-hidden bg-no-repeat bg-center bg-cover"
//       style={{
//         backgroundImage: "url('/assets/sciencetechnology/bg-front-new.png')",
//       }}
//     >
//       {/* Top Logos */}
//       <div className="absolute top-0 left-0 w-full flex justify-between items-center px-2 sm:px-4 md:px-2 py-2 sm:py-3 md:py-3 z-10">
//         <a href="https://dst.gov.in/" target="_blank" rel="noreferrer">
//           <img
//             src="/assets/sciencetechnology/logo1.png"
//             className="h-14 sm:h-18 md:h-24 lg:h-28 xl:h-30 object-contain"
//             alt="Logo 1"
//           />
//         </a>

//         <img
//           src="/assets/sciencetechnology/logo2.png"
//           className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 object-contain"
//           alt="Logo 2"
//         />

//         <a
//           href="https://samskritifoundation.org/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <img
//             src="/assets/sciencetechnology/logo3.png"
//             className="h-14 sm:h-18 md:h-24 lg:h-28 xl:h-30 object-contain"
//             alt="Logo 3"
//           />
//         </a>
//       </div>

//       {/* Left Scholar Image */}
//       <img
//         src="/assets/sciencetechnology/front-left-bottom.png"
//         className="absolute bottom-0 sm:-bottom-10 left-0
//           w-[85vw] sm:w-[62vw] md:w-[65vw] lg:w-[44vw] xl:w-[43vw]
//           max-w-none
//           object-contain object-bottom
//           translate-y-[5%] sm:translate-y-[3%] md:translate-y-[2%]"
//         alt="Scholar"
//       />

//       {/* Center-Right Content */}
//       <div
//         className="absolute inset-0 flex flex-col justify-center items-end
//           top-[-10vh] sm:top-[12vh] md:top-[-5vh] lg:top-[20vh]
//           pr-3 sm:pr-8 md:pr-16 lg:pr-24 xl:pr-32 2xl:pr-48
//           gap-1 sm:gap-2 md:gap-3"
//       >
//         <img
//           src="/assets/sciencetechnology/front-text-1.png"
//           className="w-[95vw] sm:w-[62vw] md:w-[90vw] lg:w-[68vw] xl:w-[70vw] object-contain"
//           alt="Text 1"
//         />
//         <img
//           src="/assets/sciencetechnology/front-text-2.png"
//           className="w-[95vw] sm:w-[44vw] md:w-[85vw] lg:w-[48vw] xl:w-[50vw] object-contain"
//           alt="Text 2"
//         />
//         <img
//           src="/assets/sciencetechnology/front-text-3.png"
//           className="w-[90vw] sm:w-[48vw] md:w-[80vw] lg:w-[52vw] xl:w-[55vw] object-contain"
//           alt="Text 3"
//         />
//         <img
//           src="/assets/sciencetechnology/front-text-4.png"
//           className="w-[70vw] sm:w-[32vw] md:w-[58vw] lg:w-[35vw] xl:w-[36vw] object-contain"
//           alt="Text 4"
//         />

//         {/* Enter Button */}
//         <img
//           src="/assets/sciencetechnology/enter-front.png"
//           className="cursor-pointer
//             w-36 sm:w-32 md:w-44 lg:w-40 xl:w-44 2xl:w-52
//             mt-2 sm:mt-3 md:mt-4
//             hover:scale-105 active:scale-95 transition-transform duration-200"
//           onClick={() => navigate("/dashboard")}
//           alt="Enter"
//         />
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ScienceTechnology() {
  const navigate = useNavigate();

  // Fix for mobile browsers where 100vh includes the address bar
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
      className="w-screen relative overflow-hidden bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: "url('/assets/sciencetechnology/bg-front-new.png')",
        height: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      {/* Top Logos */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-2 sm:px-4 md:px-2 py-2 sm:py-3 md:py-2 z-10">
        <a href="https://dst.gov.in/" target="_blank" rel="noreferrer">
          <img
            src="/assets/sciencetechnology/logo1.png"
            className="h-14 sm:h-18 md:h-16 lg:h-28 xl:h-30 object-contain"
            alt="Logo 1"
          />
        </a>

        <img
          src="/assets/sciencetechnology/logo2.png"
          className="h-8 sm:h-10 md:h-10 lg:h-14 xl:h-16 object-contain"
          alt="Logo 2"
        />

        <a
          href="https://samskritifoundation.org/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/assets/sciencetechnology/logo3.png"
            className="h-14 sm:h-18 md:h-16 lg:h-28 xl:h-30 object-contain"
            alt="Logo 3"
          />
        </a>
      </div>

      {/* Left Scholar Image */}
      <img
        src="/assets/sciencetechnology/front-left-bottom.png"
        className="absolute bottom-0 sm:-bottom-10 left-0 
          w-[50vw] sm:w-[52vw] md:w-[35vw] lg:w-[44vw] xl:w-[43vw]
          max-w-none object-contain object-bottom
          sm:translate-y-[3%] md:translate-y-[2%]"
        alt="Scholar"
      />

      {/* Center-Right Content */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-end 
          top-[14vw] sm:top-[12vh] md:top-[18vh] lg:top-[15vh]
          pr-3 sm:pr-8 md:pr-16 lg:pr-24 xl:pr-32 2xl:pr-32
          gap-1 sm:gap-2 md:gap-0"
      >
        <img
          src="/assets/sciencetechnology/front-text-1.png"
          className="w-[95vw] sm:w-[62vw] md:w-[70vw] lg:w-[68vw] xl:w-[70vw] object-contain"
          alt="Text 1"
        />
        <img
          src="/assets/sciencetechnology/front-text-2.png"
          className="w-[95vw] sm:w-[44vw] md:w-[65vw] lg:w-[48vw] xl:w-[50vw] object-contain"
          alt="Text 2"
        />
        <img
          src="/assets/sciencetechnology/front-text-3.png"
          className="w-[90vw] sm:w-[48vw] md:w-[60vw] lg:w-[52vw] xl:w-[55vw] object-contain"
          alt="Text 3"
        />
        <img
          src="/assets/sciencetechnology/front-text-4.png"
          className="w-[70vw] sm:w-[32vw] md:w-[40vw] lg:w-[35vw] xl:w-[36vw] object-contain"
          alt="Text 4"
        />

        {/* Enter Button */}
        <img
          src="/assets/sciencetechnology/enter-front.png"
          className="cursor-pointer 
            w-36 sm:w-32 md:w-24 lg:w-40 xl:w-44 2xl:w-52
            mt-2 sm:mt-3 md:mt-2
            hover:scale-105 active:scale-95 transition-transform duration-200"
          onClick={() => navigate("/dashboard")}
          alt="Enter"
        />
      </div>
    </div>
  );
}
