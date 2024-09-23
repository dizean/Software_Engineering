import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import Footer from "./footer";

const Home = () => {
return (
    <>
    <div className="upperpart">
        <div className="prepared">
            <h2>
                prepared
            </h2>
            <div className="logo">
                <img src='./image/logo.png'/>
            </div>
        </div>
        <div className="slogan">
            <p>
                Prepare for the Worst,
                Recover with the Best.
            </p>
        </div>
        <button>
            <Link to="/preparation">Get started</Link>
        </button>
    </div>
    <Footer/>
    </>
);
};

export default Home;

