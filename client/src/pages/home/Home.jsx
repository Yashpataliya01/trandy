import React from "react";

// import component
import Header from "./component/header/Header.jsx";
import ProductShowcase from "./component/productSections/Sections.jsx";
import Showcase from "./component/showcase/Showcase.jsx";
import Reviews from "./component/reviews/Reviews.jsx";
import FeaturedProduct from "./component/featured/Featured.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <ProductShowcase />
      <Showcase />
      <Reviews />
      <ProductShowcase />
      <FeaturedProduct />
    </>
  );
};

export default Home;
