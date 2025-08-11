import React from 'react';
import './MacroResult.css';
import { useNavigate, useLocation } from 'react-router-dom';

const MacroResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { macros, foodName, others, imageUrl } = location.state || {};

  if (!macros || Object.keys(macros).length === 0) {
    return (
      <div className="macro-result modern">
        <h2>No data found. Please search Different.</h2>
        <button onClick={() => navigate('/upload')} className="back-btn">Go Back</button>
      </div>
    );
  }

  return (
    <div className="macro-result modern">
      <h2 className="heading">Search Results</h2>
      <p className="food-name">Food: <strong>{foodName}</strong></p>

      {imageUrl && <img src={imageUrl} alt={foodName || 'Food image'} className="food-image" />}

      <div className="others-section">
        <h3>Related to your search</h3>
        {Array.isArray(others) && others.length > 0 ? (
          <ul style={{ listStyleType: "none"}}>
            {others.map((item, idx) => (
              <li key={idx}>
                <button onClick={() => navigate('/food-details', { state: { foodData: item } })} className="food-link">
                  {item.food}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No additional data available.</p>
        )}
      </div>
      <button onClick={() => navigate('/upload')} className="back-btn">Search Another</button>
    </div>
  );
};

export default MacroResult;