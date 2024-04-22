import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Product from "../../components/product/Product";
import ProductCart from "../../components/productcart/ProductCart";
import Track from "../../components/track/Track";
import TestiMonial from "../../components/testimonial/TestiMonial";
import Mycontext from "../../context/Mycontext";
// import Loder from "../../components/loder/Loder";
function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <Product />
      <ProductCart />
      <Track />
      <TestiMonial />
    </Layout>
  );
}

export default HomePage;
