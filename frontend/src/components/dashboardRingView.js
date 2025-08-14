// src/components/DashboardRingView.js
import React, { useState, useEffect } from "react";
import "./DashboardRing.css";

const DashboardRingView = () => {
  const [goals, setGoals] = useState({calories: 2000,protein: 150,carbs: 250,fat: 70,});
  const [current, setCurrent] = useState({calories: 1500,protein: 90,carbs: 200,fat: 40,});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  const macroColors = {
    calories: '#f97316', // orange
    protein: '#10b981',  // green
    carbs: '#3b82f6',    // blue
    fat: '#eab308',      // yellow
  };

  useEffect(() => {
    const ensureAndFetchToday = async () => {
      try {
        if (!token) {
          console.warn("No token found — user might not be logged in.");
          setLoading(false);
          return;
        }

        // Step 1: Ensure today's entry exists/updated
        const ensureRes = await fetch("http://127.0.0.1:8000/accounts/summary/ensure_today/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!ensureRes.ok) throw new Error("Failed to ensure today's data");

        // Step 2: Fetch today's summary
        const todayRes = await fetch("http://127.0.0.1:8000/accounts/summary/today/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!todayRes.ok) throw new Error("Failed to fetch today’s summary");

        const data = await todayRes.json();
        console.log("Today’s Summary:", data);

        setGoals(data.goals || {});
        setCurrent({
          calories: data.calories_sum,
          protein: data.protein_sum,
          carbs: data.carbs_sum,
          fat: data.fat_sum,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching today’s summary:", error);
        setLoading(false);
      }
    };

    ensureAndFetchToday();  
  }, [token]);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (!goals || !current) {
    return (
    <div className="dashboard">
      <h2 className="dashboard-title">Daily Macro Tracker</h2>

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
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Daily Macro Tracker</h2>

      <div className="macro-ring-grid">
        {Object.keys(goals).map((key) => {
          const goalValue = goals[key] || 0;
          const currentValue = current[key] || 0;
          const percentage =
            goalValue > 0 ? Math.min((currentValue / goalValue) * 100, 100) : 0;
          const strokeDashoffset = 282 - (282 * percentage) / 100;

          return (
            <div className="macro-box" key={key}>
              <p
                style={{
                  color: macroColors[key],
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
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
                {currentValue} / {goalValue}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardRingView;
