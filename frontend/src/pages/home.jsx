import React from 'react';
import Header from "../components/header";
import SpecialityMenu from "../components/specialityMenu"
import TopDoctors from "../components/topdoctors";
import Banner from "../components/banner.jsx";
import Footer from "../components/footer";
const Home = () => {
    return (
       <div>
        <Header/>
        <SpecialityMenu/>
        <TopDoctors/>
        <Banner/>
        <Footer/>
       </div>
    );
};

export default Home;