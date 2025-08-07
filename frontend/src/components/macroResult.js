import React from 'react';
import './MacroResult.css';
import { useNavigate, useLocation } from 'react-router-dom';

const MacroResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { macros, foodName, imageUrl } = location.state || {};

  if (!macros) {
    return (
      <div className="macro-result modern">
        <h2>No data found. Please upload again.</h2>
        <button onClick={() => navigate('/upload')} className="back-btn">Go Back</button>
      </div>
    );
  }

  return (
    <div className="macro-result modern">
      <h2 className="heading">Macro Breakdown</h2>
      <p className="food-name">Food: <strong>{foodName}</strong></p>

      {imageUrl && <img src={imageUrl} alt={foodName} className="food-image" />}

      <div className="macro-table">
        <div className="macro-row"><span>Calories:</span><span>{macros.calories} kcal</span></div>
        <div className="macro-row"><span>Protein:</span><span>{macros.protein} g</span></div>
        <div className="macro-row"><span>Carbohydrates:</span><span>{macros.carbs} g</span></div>
        <div className="macro-row"><span>Fats:</span><span>{macros.fats} g</span></div>
      </div>

      <button onClick={() => navigate('/upload')} className="back-btn">Upload Another</button>
    </div>
  );
};

export default MacroResult;
