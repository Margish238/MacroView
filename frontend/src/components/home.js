import React from 'react';
import './Home.css';
import MacroViewImage from "../MacroViewImage.jpg";
import MacroGoalForm from '../components/macroGoalForm';
import WeeklyTrends from '../components/weeklyTrends';
import DashboardRingView from './dashboardRingView';
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Home = () => {
  return (
    <div>
    <div className="home-page">
      <header className="welcome-section">
        <h1 className="welcome-title">Welcome to MacroView</h1>
        <p className="welcome-subtext">Track your daily and weekly nutrition goals effortlessly.</p>
        {/* <button className="get-started-btn">Get Started</button> */}
      </header>
      <img id='about' src={MacroViewImage} alt="Web IntroImage" style={{ maxWidth: "100%", height: "auto" }} />
      <p id='features'></p>
        <DashboardRingView/>
      <section className="goal-trends-section">
        <div className="goal-setter-container">
          <MacroGoalForm />
        </div>
        <div className="trends-container">
          <WeeklyTrends />
        </div>
      </section>
    </div>
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h2 className="footer-logo">MacroView</h2>
          <p className="footer-text">
            Smart nutrition tracking made simple.  
            Upload, track, and achieve your goals effortlessly.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-socials">
            <a href="/fcacebook"><Facebook size={20} /></a>
            <a href="/twitter"><Twitter size={20} /></a>
            <a href="/Instagram"><Instagram size={20} /></a>
            <a href="/linkedin"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MacroView. All rights reserved. | Designed with ❤️ for better health
      </div>
    </footer>
  </div>
  );
};

export default Home;
