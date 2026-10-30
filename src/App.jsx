import { useState, useEffect } from 'react'
import vijayImage from "./assets/Vijay.png";
import './App.css'
import ChatBot from "./components/ChatBot";
import WhatsAppButton from "./components/WhatsAppButton";
import {FaInstagram,FaLinkedinIn,FaGithub,} from "react-icons/fa";
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [count, setCount] = useState(0)
/*----------------------------Contact-form-----------------------------*/
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [status, setStatus] = useState("");
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setStatus("Sending...");
  
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setStatus("Message sent successfully! ✅");
  
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Server connection failed ❌");
    }
  };


// -----------------------Use-effect------------------------- //
useEffect(() => {
  const footer = document.querySelector(".footer");

  if (!footer) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        document.body.classList.add("footer-visible");
      } else {
        document.body.classList.remove("footer-visible");
      }
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(footer);

  return () => {
    observer.disconnect();
    document.body.classList.remove("footer-visible");
  };
}, []);
// -----------------------Use-effect-end------------------------ //

/*----------------------------Contact-form-----------------------------*/
  return (
      <BrowserRouter>

    <Routes>

      {/* =========================
          Portfolio Route
      ========================== */}
      <Route
        path="/"
        element={
    <>
      <div className="portfolio">
      <nav className="navbar">
        <h2 className="logo">
          Vijay<span>.</span>
        </h2>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#resume">Resume</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hello">Hello, I'm</p>

          <h1>Vijay Kabire</h1>

          <h2>
            I'm a <span>React Developer</span>
          </h2>

          <p className="description">
            I build modern, responsive and user-friendly websites
            using React JS, JavaScript, HTML and CSS.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn primary-btn">
              View Projects
            </a>

            <a href="#contact" className="btn secondary-btn">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-box">
          <img src={vijayImage} alt="Vijay Kabire" />
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <h2>About Me</h2>

        <p>
          I'm a passionate web developer who enjoys creating clean and
          interactive web applications. I'm currently improving my React JS
          skills and building projects to strengthen my development experience.
        </p>
      </section>
{/* ----------------------------------My-Skills----------------------------------- */}
      <section className="skills" id="skills">
        <h2>My Skills</h2>

        <div className="skill-container">
          <div className="skill">HTML</div>
          <div className="skill">CSS</div>
          <div className="skill">JavaScript</div>
          <div className="skill">React JS</div>
          <div className="skill">Git</div>
          <div className="skill">GitHub</div>
        </div>

          {/* Skill Progress Section */}
          <div className="skill-progress-section">

            <div className="skill-progress-heading">
              <p>MY EXPERTISE</p>
              <h3>Skill Progress</h3>

              <span>
                A quick overview of my current technical proficiency.
              </span>
            </div>


            <div className="skill-progress-container">

              {[
                { name: "HTML", level: "Advanced" },
                { name: "CSS", level: "Advanced" },
                { name: "JavaScript", level: "Intermediate" },
                { name: "React JS", level: "Intermediate" },
                { name: "Git", level: "Intermediate" },
                { name: "GitHub", level: "Intermediate" },

              ].map((skill, index) => {

                /* Level → Percentage */
                const levelPercentage = {
                  Beginner: 35,
                  Intermediate: 65,
                  Advanced: 90,
                };

                const percentage = levelPercentage[skill.level];

                return (

                  <div className="skill-progress-item" key={index}>

                    {/* Skill Name + Level */}
                    <div className="skill-progress-info">

                      <h4>{skill.name}</h4>

                      <span
                        className={`skill-level ${skill.level.toLowerCase()}`}
                      >
                        {skill.level}
                      </span>

                    </div>


                    {/* Progress Bar */}
                    <div className="progress-track">

                      <div
                        className="progress-bar"
                        style={{
                          width: `${percentage}%`,
                        }}
                      >
                      </div>

                    </div>


                    {/* Percentage */}
                    <div className="progress-percentage">
                      {percentage}%
                    </div>

                  </div>

                );

              })}

            </div>
          
          </div>
          {/* ================================
              GitHub Contribution Chart
          ================================ */}

          <div className="github-chart-section">

            <div className="github-chart-heading">

              <p>GITHUB ACTIVITY</p>

              <h3>My GitHub Contributions</h3>

              <span>
                A snapshot of my coding activity and contributions on GitHub.
              </span>

            </div>


            <div className="github-chart-card">

              <div className="github-chart-top">

                <div className="github-profile-info">

                  <FaGithub className="github-chart-icon" />

                  <div>
                    <h4>Vijay Kabire</h4>
                    <span>@vijaykabire-media91</span>
                  </div>

                </div>


                <a
                  href="https://github.com/vijaykabire-media91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-profile-btn"
                >
                  View GitHub
                </a>

              </div>


              <div className="github-chart-wrapper">

                <img
                  src="https://ghchart.rshah.org/38bdf8/vijaykabire-media91"
                  alt="Vijay Kabire GitHub Contribution Chart"
                  className="github-contribution-chart"
                />

              </div>


              <div className="github-chart-bottom">

                <span>
                  ● GitHub Contributions
                </span>

                <a
                  href="https://github.com/vijaykabire-media91"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/vijaykabire-media91 →
                </a>

              </div>

            </div>

          </div>
          {/*------------------------ Chart End------------------------*/}
      </section>
{/* ----------------------------------My-Skills----------------------------------- */}      
{/* ----------------------------------Project-section-start--------------------------------- */}
        <section className="projects" id="projects">
          <h2>My Projects</h2>

          <p className="projects-description">
            Here are some of the projects I've built using modern web technologies.
          </p>

          <div className="projects-container">

            {/* Project 1 */}
            <div className="project-card">
              <div className="project-number">01</div>

              <h3>Portfolio Website</h3>

              <p>
                A modern and responsive personal portfolio website built using
                React JS to showcase my skills, projects, and contact information.
              </p>

              <div className="project-tech">
                <span>React JS</span>
                <span>JavaScript</span>
                <span>CSS</span>
              </div>

              <div className="project-buttons">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn"
                >
                  GitHub
                </a>

                <a
                  href="https://your-project-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn live-btn"
                >
                  Live Demo
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-number">02</div>

              <h3>Weather App</h3>

              <p>
                A weather application that displays weather information for
                different cities using a weather API.
              </p>

              <div className="project-tech">
                <span>React JS</span>
                <span>API</span>
                <span>JavaScript</span>
              </div>

              <div className="project-buttons">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn"
                >
                  GitHub
                </a>

                <a
                  href="https://your-project-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn live-btn"
                >
                  Live Demo
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="project-number">03</div>

              <h3>Task Manager</h3>

              <p>
                A task management application where users can create, update,
                complete, and delete their daily tasks.
              </p>

              <div className="project-tech">
                <span>React JS</span>
                <span>Node JS</span>
                <span>Express</span>
              </div>

              <div className="project-buttons">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn"
                >
                  GitHub
                </a>

                <a
                  href="https://your-project-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn live-btn"
                >
                  Live Demo
                </a>
              </div>
            </div>

          </div>
        </section>
{/* ----------------------------------Project-section-start--------------------------------- */}
{/* -------------------------Resume-Start-----------------------*/}
<section className="resume" id="resume">

  <div className="resume-container">

    {/* Left Side */}
    <div className="resume-content">

      <p className="resume-subtitle">MY RESUME</p>

      <h2>Want to know more about me?</h2>

      <p className="resume-description">
        Check out my resume to learn more about my skills,
        education, projects, technical knowledge, and experience.
      </p>

      <div className="resume-info">

        <div className="resume-info-item">
          <span>✓</span>
          <p>Technical Skills</p>
        </div>

        <div className="resume-info-item">
          <span>✓</span>
          <p>Education</p>
        </div>

        <div className="resume-info-item">
          <span>✓</span>
          <p>Projects</p>
        </div>

        <div className="resume-info-item">
          <span>✓</span>
          <p>Development Experience</p>
        </div>

      </div>

      <div className="resume-buttons">

        {/* View Resume */}
        <a
          href="/Web_Developer.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-btn view-resume"
        >
          View Resume
        </a>

        {/* Download Resume */}
        <a
          href="/Web_Developer.pdf"
          download="/Web_Developer.pdf"
          className="resume-btn download-resume"
        >
          ↓ Download Resume
        </a>

      </div>

    </div>

    {/* Right Side */}
    <div className="resume-card">

      <div className="resume-icon">
        📄
      </div>

      <h3>My Resume</h3>

      <p>
        Get a complete overview of my skills,
        education and projects.
      </p>

      <span className="resume-format">
        PDF Document
      </span>

    </div>

  </div>

</section>
{/* -------------------------Resume-end-----------------------*/}

      {/* -------------------------Contact-Start-----------------------*/}
      <section className="contact" id="contact">
        <h2>Contact Me</h2>

        <p>Let's work together and build something amazing.</p>

        <form className="contact-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />

          <button type="submit" className="btn primary-btn">
            Send Message
          </button>

        </form>

        {status && <p className="form-status">{status}</p>}
      </section>
      {/* -------------------------Contact-End-----------------------*/}
      
      {/* -----------------------Footer--Start--------------------------- */}
      <footer className="footer">

        <div className="footer-container">

          {/* Name */}
          <h2 className="footer-logo">
            Vijay<span>.</span>
          </h2>

          {/* Description */}
          <p className="footer-text">
            Building modern, responsive and user-friendly web experiences.
          </p>

          {/* Social Media Links */}
          <div className="social-links">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/vijaykabire18"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/vijay-kabire-3a7116279"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/vijaykabire-media91"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

          </div>

          {/* Bottom Line */}
          <div className="footer-bottom">
            <p>
              © 2026 Vijay Kabire. All Rights Reserved.
            </p>

            <p className="footer-made">
              Designed & Built with ❤️ using React JS
            </p>
          </div>

        </div>

      </footer>
      {/* -----------------------Footer--End--------------------------- */}

       {/* Help Desk Chatbot */}
       <ChatBot />

       {/* WhatsApp Floating Button */}
       <WhatsAppButton />

    </div>
    </>
            }
      />


      {/* =========================
          Admin Login Route
      ========================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =========================
          Admin Dashboard Route
      ========================== */}

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />


    </Routes>

  </BrowserRouter>
  );
}

export default App
