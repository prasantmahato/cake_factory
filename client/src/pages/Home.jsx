import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../style/App.css';

import Card from '../components/Card';

function Home() {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    fetchCakeData();
  }, []);

  const fetchCakeData = () => {
    fetch(import.meta.env.VITE_APP_ORIGIN)
      .then((response) => response.json())
      .then((data) => {
        setCakes(data);
      })
      .catch((error) => {
        console.error('Error fetching cake data:', error);
      });
  };

  const cards = cakes.map((item) => (
    <Card key={item.id} {...item} />
  ));

  return (
    <div>
      <h1 className="title d-flex justify-content-center">Welcome to the Cake Factory</h1>
      <section className="container cards1 products">
        {cards}
      </section>
    </div>
  );
}

export default Home;
