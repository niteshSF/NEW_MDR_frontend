import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeftDash } from "lucide-react";

export default function CreditPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const video = document.getElementById("bg-video");
    if (!video) return;

    video.playbackRate = 0.6;

    const handleEnded = () => {
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 4000);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="h-screen max-w-screen overflow-hidden font-epilogue">
      {/* Fullscreen Video Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        <video
          id="bg-video"
          className="w-full h-full object-cover"
          src="/assets/credit-video.mp4"
          autoPlay
          muted
          playsInline
        />
      </div>

      {/* Background Audio */}
      <audio src="/assets/credit-audio.mp3" autoPlay loop />

      {/* Navigation */}
      <nav className="absolute top-14 left-10 p-2 pr-6 text-white bg-black bg-opacity-30 rounded-md z-10 text-md md:text-2xl">
        <div
          className="flex gap-0 cursor-pointer items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowBigLeftDash className="text-white w-10 h-7" />
          <p>Back</p>
        </div>
      </nav>
    </div>
  );
}
