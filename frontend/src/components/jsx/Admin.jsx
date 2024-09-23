import React, { useState } from 'react';
import axios from 'axios';
import '../css/admin.css';
import { Link } from 'react-router-dom';
import Prepare from './create/addPrep';
import Hotline from './create/hotline';
import LocalNews from './create/localnews';
import NationalNews from './create/natnews';
import InternationalNews from './create/intnews'
import UpdatePrep from './update/updatePrep';
import UpdateHotline from './update/updateHotln';
import UpdateLocal from './update/updateLocal';
import UpdateNational from './update/updateNational';
import UpdateInternational from './update/updateInternational';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionClick = (section, event) => {
    event.preventDefault();
    setActiveSection(section);
  };
  
  const [activePreparation, setactivePreparation] = useState(null);
  return (
    <div className='admin'>
      <div className='sidebar'>
      <a href='.' onClick={(e) => handleSectionClick('home', e)}>
 Admin 
</a>
<a href='.' onClick={(e) => handleSectionClick('prepare', e)}>
  CRUD Disaster Information
</a>
<a href='.' onClick={(e) => handleSectionClick('hotline', e)}>
  CRUD City Hotlines
</a>
<div className='dropdown'>
  <a href='' onClick={(e) => e.preventDefault()}>CRUD News</a>
  <div className='dropdown-content'>
    <a href='.' onClick={(e) => handleSectionClick('local', e)}>
      Local
    </a>
    <a href='.' onClick={(e) => handleSectionClick('national', e)}>
      National
    </a>
    <a href='.' onClick={(e) => handleSectionClick('international', e)}>
      International
    </a>
          </div>
        </div>
      </div>
      <div id='contentsad'>
        {/* landingpageadmin */}
        <div className={activeSection === 'home' ? 'home' : 'hidden'}>
          <h1>Welcome to the Admin Page</h1>
          <p>This page is for creating, retrieving, deleting and updating contents.</p>
          </div>
          {/* crud preparations */}
        <div className={activeSection === 'prepare' ? 'prepare' : 'hidden'}>
          <div className='prepbutn'>
          <button onClick={() => setactivePreparation('add')}>Create</button>
          <button onClick={() => setactivePreparation('update')}>Update</button>
          </div>
        <div className={activePreparation === 'add' ? 'prepare' : 'hidden'}>
          <Prepare />
        </div>
        <div className={activePreparation === 'update' ? 'prepare' : 'hidden'}>
          <UpdatePrep />
        </div>
        </div>
        {/* crud hotlines */}
        <div className={activeSection === 'hotline' ? 'hotline' : 'hidden'}>
        <div className='prepbutn'>
          <button onClick={() => setactivePreparation('add')}>Create</button>
          <button onClick={() => setactivePreparation('update')}>Update</button>
          </div>
        <div className={activePreparation === 'add' ? 'prepare' : 'hidden'}>
        <Hotline/>
        </div>
        <div className={activePreparation === 'update' ? 'prepare' : 'hidden'}>
          <UpdateHotline/>
        </div>
        </div>
        {/* crud localnews */}
        <div className={activeSection === 'local' ? 'local' : 'hidden'}>
        <div className='prepbutn'>
          <button onClick={() => setactivePreparation('add')}>Create</button>
          <button onClick={() => setactivePreparation('update')}>Update</button>
          </div>
        <div className={activePreparation === 'add' ? 'prepare' : 'hidden'}>
          <LocalNews />
        </div>
        <div className={activePreparation === 'update' ? 'prepare' : 'hidden'}>
          <UpdateLocal />
        </div>
        </div>
        {/* crud nationalnews */}
        <div className={activeSection === 'national' ? 'national' : 'hidden'}>
        <div className='prepbutn'>
          <button onClick={() => setactivePreparation('add')}>Create</button>
          <button onClick={() => setactivePreparation('update')}>Update</button>
          </div>
        <div className={activePreparation === 'add' ? 'prepare' : 'hidden'}>
          <NationalNews />
        </div>
        <div className={activePreparation === 'update' ? 'prepare' : 'hidden'}>
          <UpdateNational />
        </div>
        </div>
        {/* crud internationalnews */}
        <div className={activeSection === 'international' ? 'international' : 'hidden'}>
        <div className='prepbutn'>
          <button onClick={() => setactivePreparation('add')}>Create</button>
          <button onClick={() => setactivePreparation('update')}>Update</button>
          </div>
        <div className={activePreparation === 'add' ? 'prepare' : 'hidden'}>
          <InternationalNews />
        </div>
        <div className={activePreparation === 'update' ? 'prepare' : 'hidden'}>
          <UpdateInternational />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
