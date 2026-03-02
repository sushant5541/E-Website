import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import CategoriesSection from "../components/CategoriesSection";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection/>
            <FeaturedProducts />
            <CategoriesSection />
            <Footer/>
        </>
    );
};

export default Home;