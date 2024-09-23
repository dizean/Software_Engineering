import React from "react";
import "../css/nav.css";

const Navigation = () => {
return (
    <>
    <nav class="nav" >
        <div className="logo" >
        <img src="../image/logo.png"/>
        </div>
        <label for="hamburger">&#9776;</label>
  			<input type="checkbox" id="hamburger"/>
	    <div class="links">
        <a href="/">Home</a>
        <a href="/news">News</a>
        <a href="/preparation">Preparation</a>
        <a href="/about">About</a>
	    </div>
    </nav>
    </>
);
};

export default Navigation;

