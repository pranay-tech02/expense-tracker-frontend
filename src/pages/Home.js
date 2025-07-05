// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          'https://api.pexels.com/v1/search?query=finance&per_page=10&page=' + Math.floor(Math.random() * 10 + 1),
          {
            headers: {
              Authorization: 'YOUR_PEXELS_API_KEY', // 🔐 Replace this with your real Pexels API key
            },
          }
        );
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)];
          setImageUrl(randomPhoto.src.landscape);
        }
      } catch (err) {
        console.error("Error fetching image from Pexels:", err);
      }
    };

    fetchImage();
  }, []);

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="overlay">
        <h1>Welcome to Expense Tracker 💸</h1>
        <p>Track, Analyze, and Save Your Money Smarter</p>
      </div>
    </div>
  );
};

export default Home;
