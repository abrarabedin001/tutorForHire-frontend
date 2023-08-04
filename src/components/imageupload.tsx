import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage);
    
    try {
      await axios.post('http://localhost:5000/upload', formData);
      setUploadMessage('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image', error);
      setUploadMessage('Error uploading image');
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleImageUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      <p>{uploadMessage}</p>
    </div>
  );
}

export default App;
