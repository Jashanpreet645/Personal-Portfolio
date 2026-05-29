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
                <h4>High School Student</h4>
                <h5>D.A.V. Public School, Lehragaga</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed XII senior secondary education with strong analytical, scientific, and mathematics foundations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Intern</h4>
                <h5>Thapar Institute of Engineering and Technology</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Worked under Dr. Gurpal Singh Chhabra (Computer Science Department), conducting a comprehensive review on developed smart contracts using Solidity and integrated with Ethereum. Enhanced skills in scientific writing, critical analysis, and data interpretation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. Computer Engineering</h4>
                <h5>Thapar Institute of Engineering and Technology</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Undergraduate studies focusing on core computer science subjects (Data Structures, Algorithms, DBMS, OOP, Operating Systems, Computer Networks). Actively served as Team Leader in multiple hackathons, coordinating the full software development lifecycle from ideation to deployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
