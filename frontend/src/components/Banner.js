import React from 'react';
import { Container } from 'react-bootstrap';

function Banner({ category }) {
  const banners = {
    donut: {
      title: "Sweet & Delicious Donuts",
      subtitle: "Freshly baked every morning!",
      bgColor: "#FFD6E7"
    },
    beverage: {
      title: "Warm & Refreshing Beverages",
      subtitle: "Perfect for any time of day",
      bgColor: "#D6E4FF"
    },
    pizza: {
      title: "Cheesy & Delicious Pizzas",
      subtitle: "Made with love and fresh ingredients",
      bgColor: "#FFF3CD"
    },
    drink: {
      title: "Cool & Refreshing Drinks",
      subtitle: "Quench your thirst!",
      bgColor: "#D1E7DD"
    },
    default: {
      title: "Welcome to Donut Shop",
      subtitle: "Your one-stop shop for delicious treats",
      bgColor: "#f8f9fa"
    }
  };

  const banner = banners[category] || banners.default;

  return (
    <div 
      className="py-5 mb-4 text-center rounded"
      style={{ backgroundColor: banner.bgColor }}
    >
      <Container>
        <h1 className="display-4 fw-bold">{banner.title}</h1>
        <p className="lead">{banner.subtitle}</p>
      </Container>
    </div>
  );
}

export default Banner;