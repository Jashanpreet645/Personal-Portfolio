import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Work.css";

// Import project screenshots from assets
import scholarlogicImg from "../assets/scholarlogic.png";
import krishiImg from "../assets/Krishi.png";
import railfitImg from "../assets/RailtFit.png";
import smartAthleteImg from "../assets/Smart-Athlete-Risk-Analyzer.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    tag: "Education",
    title: "ScholarLogic",
    description:
      "An intelligent scholarship platform simplifying matching, application, and tracking for students globally. Features ML-driven recommendation matching, automated essay editing, real-time application tracking dashboard, and integration with institutional databases to securely verify credentials.",
    image: scholarlogicImg,
    cardClass: "card-1",
    domain: "scholarlogic.com",
  },
  {
    tag: "Agriculture",
    title: "Krishi",
    description:
      "Empowering farmers with smart insights, crop disease detection, and yield prediction tools. Leverages deep learning models for accurate leaf-disease diagnosis via image uploads, integrates real-time weather analytics, and uses predictive modeling to forecast optimal crop choices and market demand.",
    image: krishiImg,
    cardClass: "card-2",
    domain: "krishi.ai",
  },
  {
    tag: "Fitness",
    title: "RailFit",
    description:
      "A smart health companion designed to optimize training schedules and track body vitals in real-time. Built with interactive fitness tracking dashboard, customized workout regimens powered by health metrics, and instant notification alerts using wearable API data synchronization.",
    image: railfitImg,
    cardClass: "card-3",
    domain: "railfit.co",
  },
  {
    tag: "Athletics",
    title: "Smart Athlete",
    description:
      "Advanced predictive risk analyzer for sports injuries and performance longevity monitoring. Utilizes TensorFlow.js for in-browser client-side motion analysis, tracks biomechanical data trends, and generates customized injury prevention protocols and athletic performance longevity reports.",
    image: smartAthleteImg,
    cardClass: "card-4",
    domain: "smartathlete.com",
  },
];

const Work = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      const totalCards = cards.length;
      if (totalCards === 0) return;

      const cardYOffset = 5;
      const cardScaleStep = 0.075;

      // Initialize the cards transform stack positions
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + i * cardYOffset,
          scale: 1 - i * cardScaleStep,
          rotationX: 0,
        });
      });

      // Pin the outer work-section and scrub the animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 1,
        },
      });

      // Build hardware-accelerated sequential card transitions
      for (let i = 0; i < totalCards; i++) {
        // Active card i slides up out of active view and rotates
        tl.to(
          cards[i],
          {
            yPercent: -200,
            rotationX: 35,
            scale: 1,
            duration: 1,
            ease: "none",
          },
          i
        );

        // Slide the active card further out of view to yPercent -250 in the next segment
        if (i < totalCards - 1) {
          tl.to(
            cards[i],
            {
              yPercent: -250,
              duration: 1,
              ease: "none",
            },
            i + 1
          );
        }

        // Cards behind card i slide forward in the stack
        for (let j = i + 1; j < totalCards; j++) {
          const behindIndex = j - i;
          tl.to(
            cards[j],
            {
              yPercent: -50 + (behindIndex - 1) * cardYOffset,
              scale: 1 - (behindIndex - 1) * cardScaleStep,
              rotationX: 0,
              duration: 1,
              ease: "none",
            },
            i
          );
        }
      }

      // Recalculate heights for ScrollSmoother compatibility
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="sticky-cards">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`work-card ${project.cardClass}`}
            >
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="browser-dot red"></span>
                  <span className="browser-dot yellow"></span>
                  <span className="browser-dot green"></span>
                </div>
                <div className="browser-address">{project.domain}</div>
              </div>

              <div className="work-card-content">
                <div className="card-col text-col">
                  <span className="card-tag">
                    {project.tag}
                  </span>

                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>

                <div className="card-col image-col">
                  <img
                    src={project.image}
                    alt={project.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;