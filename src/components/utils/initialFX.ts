import gsap from "gsap";
import { lenis } from "../Navbar";

export function initialFX() {
  try {
    // Dispatch event to synchronize character lights & intro with the loading screen fade-out
    window.dispatchEvent(new Event("startMainIntro"));

    // Batch layout-triggering changes into a single frame
    requestAnimationFrame(() => {
      document.body.style.overflowY = "auto";
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    });

    const mainEl = document.getElementsByTagName("main")[0];
    if (mainEl) {
      mainEl.classList.add("main-active");
    }

    gsap.to("body", {
      backgroundColor: "#0b080c",
      duration: 0.8,
      delay: 0,
      ease: "power2.inOut",
    });

    const w = window as any;

    if (w.landingTextSplit && w.landingTextSplit.chars) {
      gsap.fromTo(
        w.landingTextSplit.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0,
        }
      );
    }

    if (w.landingText2Split && w.landingText2Split.chars) {
      gsap.fromTo(
        w.landingText2Split.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0,
        }
      );
    }

    gsap.fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        y: 0,
        delay: 0.4,
      }
    );
    gsap.fromTo(
      [".header", ".icons-section", ".nav-fade"],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 0,
      }
    );

    if (w.landingText2Split && w.landingText3Split) {
      LoopText(w.landingText2Split, w.landingText3Split);
    }
    if (w.landingText4Split && w.landingText5Split) {
      LoopText(w.landingText4Split, w.landingText5Split);
    }
  } catch (error) {
    console.error("Error in initialFX:", error);
  }
}

function LoopText(Text1: any, Text2: any) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
