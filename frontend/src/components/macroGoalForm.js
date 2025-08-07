import React, { useState } from 'react';
import './MacroGoalForm.css';

const MacroGoalForm = ({ onSubmit }) => {
  const [goals, setGoals] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoals({ ...goals, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(goals);
  };

  return (
    <form className="macro-goal-form modern" onSubmit={handleSubmit}>
      <h2>Set Daily Macro Goals</h2>
      <div className="form-group">
        <label>Calories</label>
        <input type="number" name="calories" value={goals.calories} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Protein (g)</label>
        <input type="number" name="protein" value={goals.protein} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Carbs (g)</label>
        <input type="number" name="carbs" value={goals.carbs} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Fat (g)</label>
        <input type="number" name="fat" value={goals.fat} onChange={handleChange} />
      </div>
      <button type="submit">Save Goals</button>
    </form>
  );
};

export default MacroGoalForm;
