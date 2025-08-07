import React from 'react';
import './Home.css';
import MacroGoalForm from '../components/macroGoalForm';
import WeeklyTrends from '../components/weeklyTrends';
import DashboardRingView from './dashboardRingView';

const Home = () => {
  return (
    <div className="home-page">
      <header className="welcome-section">
        <h1 className="welcome-title">Welcome to MacroView</h1>
        <p className="welcome-subtext">Track your daily and weekly nutrition goals effortlessly.</p>
        {/* <button className="get-started-btn">Get Started</button> */}
      </header>
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
  );
};

export default Home;
