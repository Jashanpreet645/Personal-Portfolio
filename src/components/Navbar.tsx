import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import logo from "../assets/logo.png";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis;

const Navbar = () => {
  useEffect(() => {
    // Initialize Lenis
    lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    // Pause scrolling initially for the landing animation
    lenis.stop();

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) {
            lenis.scrollTo(section, { duration: 1.5 });
          }
        }
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRaf);
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title flex items-center" data-cursor="logo">
          <img src={logo} alt="Logo" className="h-12 w-auto sm:h-14 md:h-16" />
        </a>
        {/* <a
          href="mailto:jashanpreetlehra@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          jashanpreetlehra@gmail.com
        </a> */}
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
