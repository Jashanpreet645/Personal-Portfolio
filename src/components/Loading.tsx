import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";
import { initialFX } from "./utils/initialFX";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showGreetings, setShowGreetings] = useState(false);
  const [langIndex, setLangIndex] = useState(0);

  const languages = [
    "Hello",
    "नमस्ते",
    "Hola",
    "Bonjour",
    "Hallo",
    "Ciao",
    "Olá",
    "こんにちは",
  ];

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [percent, loaded]);

  useEffect(() => {
    if (loaded && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [loaded, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    // Start expanding portal zoom (1.5s)
    setClicked(true);

    let intervalId: number;
    let finalUnmountId: number;

    // Start greetings sequence at 500ms when the screen becomes black
    const greetingsTimer = setTimeout(() => {
      setShowGreetings(true);

      // Cycle through 8 languages, changing every 400ms (total 3.2s duration)
      intervalId = setInterval(() => {
        setLangIndex((prev) => {
          if (prev < languages.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 400);
    }, 500);

    // After 3.7s (500ms cover + 3200ms greetings), instantly unmount loader and enter landing page
    finalUnmountId = setTimeout(() => {
      clearInterval(intervalId);
      setShowGreetings(false);
      initialFX();
      setIsLoading(false); // Instantly unmount
    }, 3700);

    return () => {
      clearTimeout(greetingsTimer);
      if (intervalId) clearInterval(intervalId);
      if (finalUnmountId) clearTimeout(finalUnmountId);
    };
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <div className="loading-wrapper-main">
      {showGreetings && (
        <div className="greeting-container">
          <span key={langIndex} className="greeting-text">
            {languages[langIndex]}
          </span>
        </div>
      )}
      <div className="loading-header">
        <div></div>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;


