import React, { useState , useEffect} from 'react';
import axios from 'axios';
import '../css/news.css';
import LocalNews from './create/localnews';
import Footer from './footer';
const News = () =>{
  const [activeTab, setActiveTab] = useState("local");

const handleTabClick = (tab) => {
    setActiveTab(tab);
};
//localnews
const [allLocal, SetalllLocal] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/local/');
        SetalllLocal(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

//nationalnews
const [allNational, SetallNational] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/national/');
        SetallNational(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

//internationalnews
const [allInternational, SetallInternational] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/international/');
        SetallInternational(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

    return(
      <>
        <div className='news'>
          {/* <LocalNews/> */}
        <div className='title'>
            <h1>news | articles</h1>
        </div>
        <div className="choices">
        <nav>
            <a onClick={() => handleTabClick("local")} className={activeTab === "local" ? "active" : ""}>
                        LOCAL
            </a>
            <a onClick={() => handleTabClick("national")} className={activeTab === "national" ? "active" : ""}>
                        NATIONAL
            </a>
             <a onClick={() => handleTabClick("international")} className={activeTab === "international" ? "active" : ""}>
                        INTERNATIONAL
            </a>
        </nav>
        <div className='news-wrap'>
        <div className={`local ${activeTab === "local" ? "" : "hidden"}`}>
        {allLocal.map((data, key) => {
          return (
            <div className="card-container" key={key}>
                <div className="card">
                  <div className="cardimg">
                  <img
                  src={data.img ? `http://localhost:3001/${data.img}` : null}
                  alt="img"
                />
                    <p>LOCAL</p>
                  </div>
                  <div className='cardinfo'>
                    <div className='cardname'>
                      {data.title}
                    </div>
                    <div className='carddescription'>
                      {data.description}
                    </div>
                    <div className='cardddate'>
                      {data.date}
                    </div>
                    <div className='cardlink'>
                    <a className="link" href={data.link} target="_blank" >
                        Read
                        <hr/>
                     </a>
                    </div>
                  </div>
                </div>
            </div>
          );
        })}
      </div>
      <div className={`national ${activeTab === "national" ? "" : "hidden"}`}>
    {allNational.map((data, key) => {
          return (
            <div className="card-container" key={key}>
                <div className="card">
                  <div className="cardimg">
                  <img
                  src={data.img ? `http://localhost:3001/${data.img}` : null}
                  alt="img"
                />
                    <p>NATIONAL</p>
                  </div>
                  <div className='cardinfo'>
                    <div className='cardname'>
                      {data.title}
                    </div>
                    <div className='carddescription'>
                      {data.description}
                    </div>
                    <div className='cardddate'>
                      {data.date}
                    </div>
                    <div className='cardlink'>
                     <a className="link" href={data.link} target="_blank" >
                     Read
                        <hr/>
                     </a>
                    </div>
                  </div>
                </div>
            </div>
          );
        })}
    </div>
    <div className={`international ${activeTab === "international" ? "" : "hidden"}`}>
    {allInternational.map((data, key) => {
          return (
            <div className="card-container" key={key}>
                <div className="card">
                  <div className="cardimg">
                  <img
                  src={data.img ? `http://localhost:3001/${data.img}` : null}
                  alt="img"
                />
                    <p>INTERNATIONAL</p>
                  </div>
                  <div className='cardinfo'>
                    <div className='cardname'>
                      {data.title}
                    </div>
                    <div className='carddescription'>
                      {data.description}
                    </div>
                    <div className='cardddate'>
                      {data.date}
                    </div>
                    <div className='cardlink'>
                    <a className="link" href={data.link} target="_blank" >
                    Read
                        <hr/>
                     </a>
                    </div>
                  </div>
                </div>
            </div>
          );
        })}
    </div>
        </div>
    </div>
        </div>
        <Footer/>
        </>
    );
};
export default News;