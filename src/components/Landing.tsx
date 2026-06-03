import { PropsWithChildren, useEffect } from "react";
import "./styles/Landing.css";
import SplitType from "split-type";

const Landing = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    (window as any).landingTextSplit = new SplitType(
      ".landing-info h3, .landing-intro h2, .landing-intro h1",
      {
        types: "chars,lines",
        lineClass: "split-line",
      }
    );

    const TextProps = { types: "chars,lines" as const, lineClass: "split-h2" };
    (window as any).landingText2Split = new SplitType(".landing-h2-info", TextProps);
    (window as any).landingText3Split = new SplitType(".landing-h2-info-1", TextProps);
    (window as any).landingText4Split = new SplitType(".landing-h2-1", TextProps);
    (window as any).landingText5Split = new SplitType(".landing-h2-2", TextProps);

    return () => {
      (window as any).landingTextSplit?.revert();
      (window as any).landingText2Split?.revert();
      (window as any).landingText3Split?.revert();
      (window as any).landingText4Split?.revert();
      (window as any).landingText5Split?.revert();
    };
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
