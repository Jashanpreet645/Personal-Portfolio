import { technologies } from "../constants";

const TechStack = () => {
  return (
    <div className="techstack-section" id="techstack">
      <div className="techstack-container section-container">
        <h2>
          My <span>Techstack</span>
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-4 mt-12">
          {technologies.map((technology) => (
            <div
              className="group relative flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-2 hover:border-[#c2a4ff]/40 hover:shadow-[0_15px_35px_-5px_rgba(194,164,255,0.25)] cursor-pointer"
              key={technology.name}
            >
              {/* Ambient under-light glow (visible before hover, intensifies on hover) */}
              <div className="absolute -inset-1 rounded-full bg-[#c2a4ff]/[0.04] filter blur-md transition-all duration-500 group-hover:bg-[#c2a4ff]/[0.15] group-hover:blur-lg pointer-events-none" />

              {/* Inner subtle glow gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c2a4ff]/0 via-[#c2a4ff]/0 to-[#c2a4ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              
              {/* Technology Icon */}
              <div className="w-10 h-10 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 z-10">
                <img
                  src={technology.icon}
                  alt={technology.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
                  loading="lazy"
                />
              </div>

              {/* Glowing ring highlight */}
              <div className="absolute inset-px rounded-full border border-transparent group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />

              {/* Floating Tooltip */}
              <span className="absolute top-2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:-top-9 transition-all duration-300 ease-out bg-[#151030]/95 text-[#eae5ec] text-xs font-semibold py-1 px-3.5 rounded-full border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.5)] pointer-events-none whitespace-nowrap z-20">
                {technology.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
