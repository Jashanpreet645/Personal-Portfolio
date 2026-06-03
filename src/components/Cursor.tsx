import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");

    let animationFrameId: number;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        setCursorX(cursorPos.x);
        setCursorY(cursorPos.y);
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const cursorAttr = target.getAttribute("data-cursor");

      if (cursorAttr === "icons") {
        cursor.classList.add("cursor-icons");
        gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (cursorAttr === "logo") {
        cursor.classList.add("cursor-logo");
        const padding = 16;
        const left = rect.left - padding / 2;
        const top = rect.top - padding / 2;
        const width = rect.width + padding;
        const height = rect.height + padding;

        gsap.to(cursor, {
          x: left,
          y: top,
          duration: 0.15,
          ease: "power2.out",
        });
        cursor.style.setProperty("--cursorW", `${width}px`);
        cursor.style.setProperty("--cursorH", `${height}px`);
        hover = true;
      }
      if (cursorAttr === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement;
      if (!target) return;

      cursor.classList.remove("cursor-disable", "cursor-icons", "cursor-logo");
      cursor.style.removeProperty("--size");
      cursor.style.removeProperty("--cursorW");
      cursor.style.removeProperty("--cursorH");
      hover = false;
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
