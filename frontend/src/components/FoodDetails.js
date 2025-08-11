import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FoodDetails.css';

const FoodDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { foodData } = location.state || {};

  if (!foodData) {
    return (
      <div className="food-details modern">
        <h2>No food data found.</h2>
        <button onClick={() => navigate(-1)} className="back-btn">Go Back</button>
      </div>
    );
  }

  // Extract main nutrients
  const mainNutrients = {
    food: foodData.food,
    calories: foodData["Caloric Value"],//this column contains space in its name
    protein: foodData.Protein,
    carbs: foodData.Carbohydrates,
    fats: foodData.Fat
  };
//Later to add
//   const addToGoals=()=>{
    
//   }


  const otherNutrients = Object.entries(foodData)
    .filter(([key]) => !['','food', 'Caloric Value', 'Protein', 'Carbohydrates', 'Fat'].includes(key));

  return (
    <div className="food-details modern">
      <h2>Food Details</h2>

      {/* Main Nutrients Table */}
      <table className="nutrient-table">
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories (kcal)</th>
            <th>Protein (g)</th>
            <th>Carbs (g)</th>
            <th>Fats (g)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{mainNutrients.food}</td>
            <td>{mainNutrients.calories}</td>
            <td>{mainNutrients.protein}</td>
            <td>{mainNutrients.carbs}</td>
            <td>{mainNutrients.fats}</td>
          </tr>
        </tbody>
      </table>
      {/* <button onClick={() => navigate(-1)} className="back-btn">Add To Goals</button> */}
      {/* Other Nutrients Table */}
      {otherNutrients.length > 0 && (
        <>
          <h3>Other Nutrients</h3>
          <table class="nutrient-table">
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {otherNutrients.map(([key, value], idx) => (
                <tr key={idx}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <button onClick={() => navigate(-1)} className="back-btn">Go Back</button>
    </div>
  );
};

export default FoodDetails;
