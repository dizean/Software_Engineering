import React, { useEffect } from "react";
import '../css/footer.css'
const Footer = () => {
return (
    <>
  <footer class="footer-distributed">

<div class="footer-left">

  <h3>prepared</h3>

  <p class="footer-links">
    <a href="/">Home</a>
  
    <a href="/news">News</a>
  
    <a href="/preparation">Preparation</a>
    
    <a href="/about">About</a>
  </p>

  <p class="footer-company-name">prepared © 2023</p>
</div>

<div class="footer-center">

  <div>
    <i class="fa fa-map-marker"></i>
    <p><span>Galo St.</span> Bacolod City</p>
  </div>

  <div>
    <i class="fa fa-phone"></i>
    <p>+1.555.555.5555</p>
  </div>

  <div>
    <i class="fa fa-envelope"></i>
    <p><a href="mailto:support@company.com">prepared@company.com</a></p>
  </div>

</div>

<div class="footer-right">

  <p class="footer-company-about">
    <span>Overview</span>
    prepared represents a testament to our ability to harness 
    technology for the greater good, enhancing our collective
     readiness to face an ever-changing and unpredictable world.
  </p>

  <div class="footer-icons">

    <a href="#"><img src='./image/facebook.png'/></a>
    <a href="#"><img src='./image/instagram.png'/></a>
    <a href="#"><img src='./image/twitter.png'/></a>
    <a href="#"><img src='./image/tiktok.png'/></a>

  </div>

</div>

</footer>
    </>
);
};
export default Footer;
