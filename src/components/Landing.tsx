import { PropsWithChildren, useEffect } from "react";
import "./styles/Landing.css";
import { SplitText } from "gsap-trial/SplitText";
import { gsap } from "gsap";

gsap.registerPlugin(SplitText);

const Landing = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (typeof SplitText !== "undefined") {
      (window as any).landingTextSplit = new SplitText(
        [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
        {
          type: "chars,lines",
          linesClass: "split-line",
        }
      );

      let TextProps = { type: "chars,lines", linesClass: "split-h2" };
      (window as any).landingText2Split = new SplitText(".landing-h2-info", TextProps);
      (window as any).landingText3Split = new SplitText(".landing-h2-info-1", TextProps);
      (window as any).landingText4Split = new SplitText(".landing-h2-1", TextProps);
      (window as any).landingText5Split = new SplitText(".landing-h2-2", TextProps);
    }
  }, []);
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              JASHANPREET
              <br />
              <span>SINGH</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Full Stack </div>
              <div className="landing-h2-2">UI/UX</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Designer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
