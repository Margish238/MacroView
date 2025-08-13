import React,{useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import './FoodDetails.css';

const FoodDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { foodData } = location.state || {};
  const [quantity, setQuantity] = useState(100);

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
    calories: foodData["Caloric Value"], // Column name with space
    protein: foodData.Protein,
    carbs: foodData.Carbohydrates,
    fats: foodData.Fat
  };

  const otherNutrients = Object.entries(foodData).filter(([key]) => !['','food', 'Caloric Value', 'Protein', 'Carbohydrates', 'Fat'].includes(key));

  // Function to add food to user's goals/log
  const addToGoals = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("You must be logged in to save food.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/accounts/addMacro/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        food_name: mainNutrients.food,
        calories: ((mainNutrients.calories*quantity)/100),
        protein: ((mainNutrients.protein*quantity)/100),
        carbs: ((mainNutrients.carbs*quantity)/100),
        fats: ((mainNutrients.fats*quantity)/100)
      })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Food added to your goals!");
    } else {
      alert(JSON.stringify(data)); // ✅ show actual error
    }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

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

      {/* Save Button */}
      <input type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter weight in grams"/>
      <button onClick={addToGoals} className="back-btn">Add To Goals</button>

      {/* Other Nutrients Table */}
      {otherNutrients.length > 0 && (
        <>
          <h3>Other Nutrients</h3>
          <table className="nutrient-table">
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

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-btn">Go Back</button>
    </div>
  );
};

export default FoodDetails;
