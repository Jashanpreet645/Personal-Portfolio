import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Secondary Education</h4>
                <h5>D.A.V. Public School, Lehragaga</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed higher secondary education with a strong foundation in
              Mathematics, Science, and Computer Applications, developing analytical
              and problem-solving skills that inspired a career in technology.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Intern</h4>
                <h5>Thapar Institute of Engineering & Technology</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Conducted research under the guidance of Dr. Gurpal Singh Chhabra,
              focusing on blockchain technologies, Ethereum ecosystems, and
              Solidity-based smart contracts. Strengthened expertise in technical
              research, literature review, and scientific documentation.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Summer Intern</h4>
                <h5>DRDO – Defence Research & Development Organisation</h5>
              </div>
              <h3>Present</h3>
            </div>
            <p>
              Working on advanced software and technology-driven solutions while
              gaining practical experience in real-world research and development
              environments. Collaborating with professionals on impactful projects
              and enhancing technical problem-solving capabilities.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;
