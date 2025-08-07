import React, { useState } from 'react';
import './Upload.css';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [foodName, setFoodName] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append('image', image);
    if (foodName) formData.append('food_name', foodName);

    try {
      const response = await fetch('http://127.0.0.1:8000/apidetect/detect/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      navigate('/result', {
        state: {
          macros: data,
          foodName: foodName || 'Detected Food',
          imageUrl: image ? URL.createObjectURL(image) : null,
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="upload-page modern">
      <h2 className="upload-heading">Upload Your Food</h2>

      <form className="upload-form" onSubmit={handleSubmit}>
        <label htmlFor="imageInput" className="upload-label">Choose Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="upload-input" />

        <label htmlFor="foodName" className="upload-label">Or Enter Food Name:</label>
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="e.g., Apple"
          className="upload-text"
        />

        <button type="submit-btn" className="upload-button">Submit</button>
      </form>
    </div>
  );
};

export default Upload;
