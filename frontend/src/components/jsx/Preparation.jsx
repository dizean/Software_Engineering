  import React, { useState, useRef,useEffect } from 'react';
  import axios from 'axios';
  import '../css/prepare.css';
  import '../css/login.css';
  import '../css/signup.css';
  import { Link,useNavigate } from 'react-router-dom';
  import domtoimage from 'dom-to-image';
import Footer from './footer';
  
  
  const Preparation = () => {
    const navigate = useNavigate();
    const [isActiveDisaster, setIsActiveDisaster] = useState(false);
    const [isActiveContacts, setIsActiveContacts] = useState(false);
    const [selectedDisasterData, setSelectedDisasterData] = useState(null);
    const [selectedContactData, setSelectedContactData] = useState(null);
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isSignedin, setIsSignedin] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isDisasterDataVisible, setIsDisasterDataVisible] = useState(false);
    const [isContactDataVisible, setIsContactDataVisible] = useState(false);
    const inputRef = useRef(null);
    

    //disasterdata
    const [allPrepares, setAllPrepares] = useState([]);
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/prepare/');
        setAllPrepares(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
    //hotlines
    const [allHotline, setAllHotline] = useState([]);
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/hotline/');
        setAllHotline(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    const handleDisasterClick = (data) => {
      setIsDisasterDataVisible(true);
      setIsContactDataVisible(false);
      setSelectedDisasterData(data);
    };

    const handleContactClick = (data) => {
      setIsDisasterDataVisible(false);
      setIsContactDataVisible(true);
      setSelectedContactData(data);
    };

    const toggleDropdownDisaster = () => {
      setIsActiveDisaster(!isActiveDisaster);
    };

    const toggleDropdownContacts = () => {
      setIsActiveContacts(!isActiveContacts);
    };

    const downloadImage = async () => {
      if (!isSignedin && !isLoggedin) {
        // not signin/login, show form
        setShowLogin(true);
      } else {
        // signedin/loggedin can download
        const table = document.getElementById('content');
        // download use domtoimage
        domtoimage.toPng(table)
          .then(function (dataUrl) {
            const link = document.createElement('a');
            link.download = 'disasterprep.png';
            link.href = dataUrl;
            link.click();
          })
          .catch(function (error) {
            console.error('Error capturing image:', error);
          });
      }
    };

    const [users, Setusers] = useState({
      username: '',
      password: '',
      email : ''
  });
  const handleSignup = async (e) => {
      e.preventDefault();

      try {
      const response = await axios.post('http://localhost:3001/users/', users);
      console.log(response.data);
      alert("You have successfully created an account!");
      setIsSignedin(true);
      setShowSignup(false);
      Setusers({
          username: '',
          password: '',
          email: '',
        });
      } catch (error) {
      console.error('Error sending user data:', error);
      }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3001/users/login', users);

        const { username, password } = users; 

    if (username === '1' && password === '2') {
    alert("Admin login successful");
    navigate("/admin"); 
    }
         else {
            console.log(response.data);
            alert("Login successful");
            setIsLoggedin(true);
            setShowLogin(false);
        }
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
};

  const handleChange = (e) => {
      Setusers({ ...users, [e.target.name]: e.target.value });
  };
    
    const closeSLin = () => {
      setShowLogin(false);
      setShowSignup(false);
    };
    const openLogin = () => {
      setShowLogin(true);
      setShowSignup(false);
    };
    const closeLogin = () => {
      setShowLogin(false);
      setShowSignup(true);
    };

    //changetabs
    const [activeTab, setActiveTab] = useState("before");

  const handleTabClick = (tab) => {
    setActiveTab((prevTab) => (prevTab === tab ? "" : tab));
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
    
      const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
      };

      const hotlineRefs = {
        bfp1: useRef(null),
        bfp2: useRef(null),
        pnp: useRef(null),
        cdrrmo1: useRef(null),
        cdrrmo2: useRef(null),
        redcross: useRef(null),
      };
    
      const copyText = (inputRef) => {
        const copyText = inputRef.current;
        copyText.select();
        copyText.setSelectionRange(0, 99999);
    
        try {
          document.execCommand('copy');
          alert('Copied to clipboard: ' + copyText.value);
        } catch (err) {
          console.error('Unable to copy text: ', err);
        }
    
        copyText.setSelectionRange(0, 0);
        copyText.blur();
      };
      const sectionButtonsRef = React.useRef(null);
      const scrollToSectionButtons = () => {
        if (sectionButtonsRef.current) {
          sectionButtonsRef.current.scrollIntoView({
            behavior: 'smooth',
            top: 0
          });
        }
      };

    return (
      <>
      <div className="prepare"  ref={sectionButtonsRef}>
        <div className="info-container">
          <div className="dropdowns">
            <div className={`dropdown-disaster ${isActiveDisaster ? 'active' : ''}`} onClick={toggleDropdownDisaster}>
              <button className="dropbtn">Select a Disaster</button>
              <div className="dropdown-content">
                {allPrepares.map((data, key) => (
                  <div className="name" key={key}>
                    <a href="#" onClick={() => handleDisasterClick(data)}>
                      {data.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className={`dropdown-contact ${isActiveContacts ? 'active' : ''}`} onClick={toggleDropdownContacts}>
              <button className="dropbtn">Select a City Hotline Numbers</button>
              <div className="dropdown-content">
                {allHotline.map((data, key) => (
                  <div className="name" key={key}>
                    <a href="#" onClick={() => handleContactClick(data)}>
                      {data.city}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <button className='downloadbtn' onClick={downloadImage}>Download</button>
          </div>
          {(isDisasterDataVisible || isContactDataVisible) && (
            <div id="content" >
              {isDisasterDataVisible && (
                <div>
                  <div className='disimg'>
                  <img
                    src={selectedDisasterData.imgprep ? `http://localhost:3001/${selectedDisasterData.imgprep}` : null}
                    alt="img"
                    style={{ width: '100%', height: '100%' }}
                  />
                  </div>
                  <h1>{selectedDisasterData.name}</h1>
                  <p className='descripdisaster'>{selectedDisasterData.description}</p>
                  <nav>
                  <a onClick={() => handleTabClick("before")} className={`tab-link ${activeTab === "before" ? "active" : ""}`}>
                    What to do Before {selectedDisasterData.name}
                  </a>
                  <a onClick={() => handleTabClick("during")} className={`tab-link ${activeTab === "during" ? "active" : ""}`}>
                      What to do During {selectedDisasterData.name}
                  </a>
                  <a onClick={() => handleTabClick("after")} className={`tab-link ${activeTab === "after" ? "active" : ""}`}>
                      What to do After {selectedDisasterData.name}
                  </a>
                  </nav>
                  <div className={`before ${activeTab === "before" ? "" : "hidden"}`}>
                  <h1>What to do Before {selectedDisasterData.name}</h1>
                  <h3>{selectedDisasterData.prep1}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.prep1d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.prep1img ? `http://localhost:3001/${selectedDisasterData.prep1img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.prep2}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.prep2d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.prep2img ? `http://localhost:3001/${selectedDisasterData.prep2img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.prep3}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.prep3d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.prep3img ? `http://localhost:3001/${selectedDisasterData.prep3img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.prep4}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.prep4d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.prep4img ? `http://localhost:3001/${selectedDisasterData.prep4img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.prep5}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.prep5d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.prep5img ? `http://localhost:3001/${selectedDisasterData.prep5img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  </div>
                
                  <div className={`during ${activeTab === "during" ? "" : "hidden"}`}>
                  <h1>What to do during {selectedDisasterData.name}</h1>
                  <h3>{selectedDisasterData.dur1}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.dur1d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.dur1img ? `http://localhost:3001/${selectedDisasterData.dur1img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.dur2}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.dur2d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.dur2img ? `http://localhost:3001/${selectedDisasterData.dur2img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.dur3}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.dur3d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.dur3img ? `http://localhost:3001/${selectedDisasterData.dur3img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.dur4}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.dur4d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.dur4img ? `http://localhost:3001/${selectedDisasterData.dur4img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.dur5}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.dur5d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.dur5img ? `http://localhost:3001/${selectedDisasterData.dur5img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  </div>

                  <div className={`after ${activeTab === "after" ? "" : "hidden"}`}>
                  <h1>What to do after {selectedDisasterData.name}</h1>
                  <h3>{selectedDisasterData.aft1}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.aft1d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.aft1img ? `http://localhost:3001/${selectedDisasterData.aft1img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.aft2}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.aft2d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.aft2img ? `http://localhost:3001/${selectedDisasterData.aft2img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.aft3}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.aft3d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.aft3img ? `http://localhost:3001/${selectedDisasterData.aft3img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.aft4}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.aft4d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.aft4img ? `http://localhost:3001/${selectedDisasterData.aft4img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>
                  <h3>{selectedDisasterData.aft5}</h3>
                  <div className='deswhole'>
                  <div className='dleft'>
                        {selectedDisasterData.aft5d}
                      </div>
                      <div className='dright'>
                      <img
                    src={selectedDisasterData.aft5img ? `http://localhost:3001/${selectedDisasterData.aft5img}` : null}
                    alt="img"
                    style={{ width: '200px', height: '200px' }}
                  />
                      </div>
                  </div>

                  </div>
                </div>
              )}
              {isContactDataVisible && (
                <div className='contacts'>
                <div className='cityimg'>
                <img
                    src={selectedContactData.img ? `http://localhost:3001/${selectedContactData.img}` : null}
                    alt="img"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                  <h1>{selectedContactData.city}</h1>
                  <h4>{selectedContactData.description}</h4>
                  <h3>{selectedContactData.city}`s Emergency Hotlines</h3>
                  <div className='cntctdiv'>
                  <h5>BFP (Bureau of Fire Protection)</h5>
                  <div className='cntctnum'>
                  <input type="text" ref={hotlineRefs.bfp1} value={selectedContactData.bfp1} />
                  <button onClick={() => copyText(hotlineRefs.bfp1)}>Copy</button>
                  <br />
                  <input type="text" ref={hotlineRefs.bfp2} value={selectedContactData.bfp2} />
                  <button onClick={() => copyText(hotlineRefs.bfp2)}>Copy</button>
                    </div>
                  </div>
                  <div className='cntctdiv'>
                  <h5>PNP (Philippine National Police)</h5>
                  <div className='cntctnum'>
                  <input type="text" ref={hotlineRefs.pnp} value={selectedContactData.pnp} />
                  <button onClick={() => copyText(hotlineRefs.pnp)}>Copy</button>
                    </div>
                  </div>
                  <div className='cntctdiv'>
                  <h5>CDRRMO (City Disaster Risk Reduction and Management Office)</h5>
                    <div className='cntctnum'>
                    <input type="text" ref={hotlineRefs.cdrrmo1} value={selectedContactData.cdrrmo1} />
                    <button onClick={() => copyText(hotlineRefs.cdrrmo1)}>Copy</button>
                    <br />
                    <input type="text" ref={hotlineRefs.cdrrmo2} value={selectedContactData.cdrrmo2} />
                    <button onClick={() => copyText(hotlineRefs.cdrrmo2)}>Copy</button>
                  </div>
                  </div>
                  <div className='cntctdiv'>
                  <h5>Red Cross</h5>
                      <div className='cntctnum'>
                      <input type="text" ref={hotlineRefs.redcross} value={selectedContactData.redcross} />
                      <button onClick={() => copyText(hotlineRefs.redcross)}>Copy</button>
                    </div>
                    </div>
                </div>
              )}
              <div className='buttonscroll'>
              <button  onClick={scrollToSectionButtons}>Back to top</button>
                </div>
              
            </div>
          )}
          {!isDisasterDataVisible && !isContactDataVisible && (
            <div id="contents">
              <div className='disimg'>
              <img src='./image/dissters.jpg'/>
              </div>
              <h1>Disasters</h1>
              <p>Select a disaster or city hotline numbers to get started.</p>
            </div>
          )}
        </div>
        {/* not registered/loggedin,show signup */}
          {showSignup && (
            <>
        <div className='signin'>
          
        <form onSubmit={handleSignup}>
            <p className='close' onClick={closeSLin}>Close</p>
            <h1>Sign in</h1>
            <label>
            Username:
            <input type="text" name="username" value={users.username} onChange={handleChange} />
            </label>
            <label>
            Password:
            <input
        type={passwordVisible ? 'text' : 'password'}
        id="idpass"
          name="password"
          value={users.password}
          onChange={handleChange}
        />
        <i class="far fa-eye" onClick={togglePasswordVisibility} id="togglePassword" style={{ marginLeft: '-30px', cursor: 'pointer' }}></i>
            </label>
            <label>
            Email:
            <input type="text" name="email" value={users.email} onChange={handleChange} />
            </label>
            <button type="submit">Sign In</button>
            <div className='openLog'>
                <p>Have an account already?<Link onClick={openLogin}>Log in</Link></p>
            </div>
        </form>
        </div>
            </>
          )}
          {/* have account,show login */}
          {showLogin && (
            <>
             <div className='login'>
    <form onSubmit={handleLogin}>
    <p className='close' onClick={closeSLin}>Close</p>
      <h1>Log in</h1>
        <label>
        Username:
        <input type="text" name="username" value={users.username} onChange={handleChange} />
        </label>
        <label>
        Password:
        <input
        type={passwordVisible ? 'text' : 'password'}
        id="idpass"
          name="password"
          value={users.password}
          onChange={handleChange}
        />
        <i class="far fa-eye" onClick={togglePasswordVisibility} id="togglePassword" style={{ marginLeft: '-30px', cursor: 'pointer' }}></i>
        </label>
        <button type="submit">Log in</button>
        <div className='openSign'>
            <p>Create an account.<Link onClick={closeLogin}>Sign in</Link></p>
        </div>
    </form>
    </div>
            </>
          )}
          
      </div>
      <Footer/>
      </>
    );
  };

  export default Preparation;
