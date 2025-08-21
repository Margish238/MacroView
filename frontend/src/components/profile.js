// import { Navigate } from 'react-router-dom';
import './Profile.css';
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", current_password: "" });
  const [passwordForm, setPasswordForm] = useState({ old_password: "", new_password: "" });
  const [macros, setMacros] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
  const token = localStorage.getItem("accessToken"); // use one consistent key

  if (!token) {
    console.error("No token found");
    return;
  }

  const fetchData = async () => {
    try {
      // 1️⃣ Fetch user profile
      const profileRes = await fetch("http://127.0.0.1:8000/accounts/profile/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const profileData = await profileRes.json();
      setUserData(profileData);
      setForm({
        username: profileData.username,
        email: profileData.email,
        current_password: ""
      });

      // 2️⃣ Fetch macro history
      const macrosRes = await fetch("http://127.0.0.1:8000/accounts/usermacros/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const macrosData = await macrosRes.json();
      setMacros(macrosData);

    } catch (err) {
      console.error("Error fetching profile or macros:", err);
    }
  };

  fetchData();
}, []);

  const updateProfile = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/accounts/profile/", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || "Error updating profile"));
  };

  const changePassword = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/accounts/change-password/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(passwordForm)
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || "Error changing password"));
  };

  if (!userData) return(
    <div className='noUser'>
      <p>Log into your profile </p>
      <button onClick={()=>window.location.href = '/login'}>Login</button>
    </div>
  );


  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('Logged out');
    window.location.href = '/login';
  };

  return (
    <div className="profile-container modern">
      {/* Profile Box */}
      <div className="profile-box">
        <h2>Your Profile</h2>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Joined:</strong> {new Date(userData.date_joined).toLocaleDateString()}</p>

        <form className='form-container' onSubmit={updateProfile}>
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Current Password" value={form.current_password} onChange={(e) => setForm({ ...form, current_password: e.target.value })} />
          <button type="submit">Update Profile</button>
        </form>

        <h3>Change Password</h3>
        <form className='form-container' onSubmit={changePassword}>
          <input type="password" placeholder="Old Password" value={passwordForm.old_password} onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })} />
          <input type="password" placeholder="New Password" value={passwordForm.new_password} onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })} />
          <button type="submit">Change Password</button>
        </form>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Macro History Box */}
      <div className="macro-box">
        <h2 className="macro-title">Tracked Macro History</h2>
          {macros.length > 0 ? (
            <div className="macro-table-wrapper">
            <table className='macro-table'>
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Calories</th>
                  <th>Protein</th>
                  <th>Carbs</th>
                  <th>Fats</th>
                  <th>Date</th>
                  <th>Day</th>
                </tr>
              </thead>
              <tbody>
                {macros.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.food_name}</td>
                    <td>{item.calories}</td>
                    <td>{item.protein}</td>
                    <td>{item.carbs}</td>
                    <td>{item.fats}</td>
                    <td>{item.date}</td>
                    <td>{item.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <p>No macro data found.</p>
          )}
      </div>
    </div>
  );
};

export default Profile;
