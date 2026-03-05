const images = {
  Documents: "/assets/documents.png",
  Articles: "/assets/articles.png",
  Books: "/assets/books.png",
  Manuscripts: "/assets/manuscripts.png",
};

export default function DashboardCard({ cardKey, value }) {
  const isDocuments = cardKey === "Documents";

  return (
    <div
      className={
        isDocuments
          ? "flex flex-col items-center justify-end w-[22vw] max-w-[420px] min-w-[140px]"
          : "flex flex-col items-center justify-end w-[17vw] max-w-[280px] min-w-[100px]"
      }
    >
      <img
        src={images[cardKey] || "/assets/icons/default.png"}
        alt={`${cardKey} Icon`}
        className={
          isDocuments
            ? "object-contain w-full max-h-[30vh]"
            : "object-contain w-full max-h-[24vh]"
        }
      />
      <h4
        className={`
          bg-purple-400 bg-opacity-70 rounded-xl mt-2 px-3 w-full
          text-center text-white font-bold
          py-1 sm:py-1.5 lg:py-1
          text-[clamp(1rem,1.8vw,1.5rem)]
          ${isDocuments ? "font-bold" : "font-semibold"}
        `}
      >
        {cardKey}
      </h4>
      <h3
        className="
          bg-purple-400 bg-opacity-70 rounded-xl mt-1 px-3
          w-[55%] text-center text-white font-bold
          py-1 sm:py-1.5 lg:py-1
          text-[clamp(0.7rem,1.5vw,1.5rem)]
        "
      >
        {value}
      </h3>
    </div>
  );
}
