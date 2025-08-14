import React, { useState } from "react";
import './MacroGoalForm.css';

export default function MacroGoalForm() {
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 70,
  });

  const handleChange = (e) => {
    setGoals({ ...goals, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const response = await fetch("http://127.0.0.1:8000/accounts/summary/update_goals/", {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goals }),
    });

    if (response.ok) {
      await response.json();
      alert("Goals updated successfully!");
    } else {
      alert("Failed to update goals.");
    }
  };

  return (
    <div className="macro-goal-form">
      <h2>Update Your Goals</h2>
      <label>Push Your Limit to Next Level</label>
      <form onSubmit={handleSubmit}>
        <input type="number" name="calories" value={goals.calories} onChange={handleChange} placeholder="Calories" />
        <input type="number" name="protein" value={goals.protein} onChange={handleChange} placeholder="Protein" />
        <input type="number" name="carbs" value={goals.carbs} onChange={handleChange} placeholder="Carbs" />
        <input type="number" name="fat" value={goals.fat} onChange={handleChange} placeholder="Fat" />
        <button type="submit">Update Goals</button>
      </form>
    </div>
  );
}
