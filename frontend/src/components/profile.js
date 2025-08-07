import React from 'react';
import './Profile.css';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joined: '2025-06-01',
    goal: 'Lose Weight',
  };

  const macroHistory = [
    {
      date: '2025-08-06',
      food: 'Chicken Breast',
      quantity: 200,
      calories: 330,
      protein: 62,
      carbs: 0,
      fat: 6,
    },
    {
      date: '2025-08-05',
      food: 'Brown Rice',
      quantity: 150,
      calories: 165,
      protein: 3.5,
      carbs: 34,
      fat: 1.5,
    },
  ];

  return (
    <div className="profile-container modern">
      {/* Profile Box */}
      <div className="profile-box">
        <h2>Your Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {user.joined}</p>
        <p><strong>Goal:</strong> {user.goal}</p>
        <button className="edit-button">Edit</button>
        <button className="logout-button">Logout</button>
      </div>

      {/* Macro History Box */}
      <div className="macro-box">
        <h2 className="macro-title">Tracked Macro History</h2>
        <div className="macro-table-wrapper">
          <table className="macro-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Food</th>
                <th>Qty (g)</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fat</th>
              </tr>
            </thead>
            <tbody>
              {macroHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.food}</td>
                  <td>{entry.quantity}</td>
                  <td>{entry.calories}</td>
                  <td>{entry.protein}</td>
                  <td>{entry.carbs}</td>
                  <td>{entry.fat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
