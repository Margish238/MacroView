import React, { useState } from 'react';
import './DashboardRing.css';
import MacroGoalForm from './macroGoalForm';

const DashboardRingView = () => {
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 70,
  });

  const current = {
    calories: 1500,
    protein: 90,
    carbs: 200,
    fat: 40,
  };

  const macroColors = {
    calories: '#f97316', // orange
    protein: '#10b981',  // green
    carbs: '#3b82f6',    // blue
    fat: '#eab308',      // yellow
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Daily Macro Tracker</h2>

      {/* <MacroGoalForm onSubmit={handleGoalSubmit} /> */}

      <div className="macro-ring-grid">
        {Object.keys(goals).map((key) => {
          const percentage = Math.min((current[key] / goals[key]) * 100, 100);
          const strokeDashoffset = 282 - (282 * percentage) / 100;

          return (
            <div className="macro-box" key={key}>
              <p style={{ color: macroColors[key], marginBottom: '8px', fontWeight: 'bold' }}>
                {key.toUpperCase()}
              </p>
              <div className="ring-wrapper">
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="ring-bg"
                    cx="60"
                    cy="60"
                    r="45"
                    strokeWidth="12"
                  />
                  <circle
                    className="ring-progress"
                    cx="60"
                    cy="60"
                    r="45"
                    strokeWidth="12"
                    style={{
                      strokeDashoffset,
                      stroke: macroColors[key],
                    }}
                  />
                </svg>
              </div>
              <p className="macro-values">
                {current[key]} / {goals[key]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardRingView;
