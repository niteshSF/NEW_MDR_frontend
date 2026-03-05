import { useNavigate } from "react-router-dom";
import { House, ArrowBigLeftDash } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      // Works for both window scroll and any scrollable parent
      const currentY =
        e.target.scrollingElement?.scrollTop ??
        e.target.scrollTop ??
        window.scrollY;
      if (currentY < 10) {
        setVisible(true); // always show at top
      } else if (currentY > lastScrollY.current) {
        setVisible(false); // scrolling down → hide
      } else {
        setVisible(true); // scrolling up → show
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, true); // capture phase catches all scrolls
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const vmin = Math.min(size.w, size.h);
  const fontSize = `${vmin * 0.022}px`;
  const iconSize = `${vmin * 0.03}px`;
  const padding = `${vmin * 0.008}px ${vmin * 0.015}px`;
  const gap = `${vmin * 0.025}px`;

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        background: "#A6C4FF",
        padding: 10,
        paddingRight: 56,
        gap: 28,
        flexShrink: 0,
        // Smooth slide up/down transition
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          color: "#646464",
          fontSize,
          gap: "4px",
        }}
        onClick={() => navigate("/branches-of-science")}
      >
        <House style={{ width: iconSize, height: iconSize, color: "white" }} />
        <span>Home</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          color: "#646464",
          fontSize,
          gap: "4px",
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBigLeftDash
          style={{ width: iconSize, height: iconSize, color: "white" }}
        />
        <span>Back</span>
      </div>
    </nav>
  );
}
