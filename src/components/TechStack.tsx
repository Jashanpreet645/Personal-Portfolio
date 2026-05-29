import { BallCanvas } from "./canvas";
import { technologies } from "../constants";

const TechStack = () => {
  return (
    <div className="techstack-section" id="techstack">
      <div className="techstack-container section-container">
        <h2>
          My <span>Techstack</span>
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-5 mt-12">
          {technologies.map((technology) => (
            <div className="w-24 h-24" key={technology.name}>
              <BallCanvas icon={technology.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
