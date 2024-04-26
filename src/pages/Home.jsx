import React from "react";
import heroImg01 from "../assets/images/hero-img.png";
import { Link } from "react-router-dom";
import "../styles/hero.css"; // Import CSS file for animations

const Home = () => {
  return (
    <>
      {/* ============ Hero Section Start =========== */}
      <section className="hero__section background_image pt-[60px] 2xl;h-[800px]" id="home">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ========== Hero Content ========== */}
            <div className="hero-content">
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  Reform Your Health Journey
                </h1>
                <p className="text__para">
                  Explore Reform, where Ortho & Sports Rehab meet Regenerative Health. Uncover a holistic approach to wellness personalized just for you. From injury recovery to revitalization, we're here to assist you on your journey. Join us at Reform and embark on your transformative path today.
                </p>
                <Link to="/explore">
                  <button className="btn">Book an Appointment</button>
                </Link>
              </div>
            </div>
            {/* ========== Hero Content ========== */}
            <div className="hero-image">
              <div>
                <img className="w-full" src={heroImg01} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============ Hero Section End =========== */}
    </>
  );
};

export default Home;
