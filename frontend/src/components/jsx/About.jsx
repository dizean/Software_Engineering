import React, { useState } from 'react';
import '../css/about.css';
import Footer from './footer';

const About = () => {
  return (
    <>
    <div className='about'>
      <div className='aboutintro'>
        <div className='intoimg'>
        <img src='./image/logo.png'/>
        </div>
        <div className='intods'>
        <h1>About Us</h1>
        <p>
            “prepared” represents a significant leap 
            forward in our collective ability to prepare 
            for and recover from disasters. It help serves as 
            a digital fortress of knowledge and resources, 
            aggregating crucial information and guidance to ensure 
            that individuals, communities, and organizations are 
            well-equipped to face a wide range of potential catastrophes and disasters. 
        </p>
        </div>
      </div>
      <div className='objectives'>
        <h1>OUR OBJECTIVES</h1>
        <div className='objective'>
            <div className='objimg'>
                <img src='./image/preparedness.jpg'/> 
            </div>
            <div className='objinfo'>
                <h3>
                Enhance Community Resilience 
                </h3>
                <p>
                The overarching objective of "prepared" is to bolster community 
                resilience by providing individuals with the necessary knowledge, 
                resources to proactively prepare for potential disasters.
                </p>
            </div>
        </div>
        <div className='objective'>
        <div className='objimg'>
                <img src='./image/prepbg.png'/> 
            </div>
            <div className='objinfo'>
                 <h3>
                 Facilitate Timely and Accurate Information
                </h3>
                <p>
                Another key objective of "prepared" is to ensure citizens have access to the 
                latest news on disasters at local, national, and international levels. 
                </p>
            </div>
        </div>
        <div className='objective'>
            <div className='objimg'>
                <img src='./image/plan.png'/> 
            </div>
            <div className='objinfo'>
                <h3>
                Enable Effective Disaster Recovery
                </h3>
                <p>
                Beyond preparedness and response, "prepared" seeks to equip citizens 
                with the ability to recover from disasters and emergencies.
                </p>
            </div>
        </div>
      </div>
      <div className='team'>
        <h1>MEET THE TEAM</h1>
        <div className='teamcont'>
        <div className='member'>
            <div className='memberimg'>
            <img src='./image/chrls.png'/> 
            </div>
            <div className='memberinfo'>
            Back End | Front End 
            </div>   
        </div>
        <div className='member'>
            <div className='memberimg'>
            <img src='./image/sak.png'/> 
            </div>
            <div className='memberinfo'>
            Content Provider
            </div>   
        </div>
        </div>
        
      </div>
      <div class="contactus">
<div id="container">
  <h2>contact</h2>
  <form action="#" method="post" id="contact_form">
    <div class="name">
      <label for="name"></label>
      <input type="text" placeholder="name" name="name" id="name_input" required/>
    </div>
    <div class="email">
      <label for="email"></label>
      <input type="email" placeholder="e-mail" name="email" id="email_input" required/>
    </div>
    
    <div class="message">
      <label for="message"></label>
      <textarea name="message" placeholder="message" id="message_input" cols="30" rows="5" required></textarea>
    </div>
    <div class="submit">
      <input type="submit" value="submit" id="form_button"/>
    </div>
  </form>
</div>
</div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
