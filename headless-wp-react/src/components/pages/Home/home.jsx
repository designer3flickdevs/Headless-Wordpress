import React from "react";
import "../../../App.css";
import Header from "./header.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <section className="home-section">
        <h2>
          Do you want to <span>generate more traffic</span> to your website? We
          know the solution.
        </h2>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🧪</div>
            <h3>Analytics and Research</h3>
            <p>
              We also provide tangible results and measurable long-term value
              business.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">✏️</div>
            <h3>Copywriting</h3>
            <p>
              We also provide tangible results and measurable long-term value
              business.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">💰</div>
            <h3>Sales growth</h3>
            <p>
              We also provide tangible results and measurable long-term value
              business.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
