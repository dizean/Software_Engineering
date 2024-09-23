import React, { useState , useEffect} from 'react';
import axios from 'axios';
// import '../css/signup.css';

const displayNational = () => {
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


return (
    <div className='addlocal'>  
{allNational.map((item) => (
<ul key={item.id}>
    <li>
        <h1>{item.title}44</h1>
        <p>{item.description}11</p>
        <p>{item.date}22</p>
        <p>{item.link}33</p>
        <img
          src={item.img ? `http://localhost:3001/${item.img}` : null}
          alt="img"
          style={{ width: '100px', height: '100px' }}
        />
    </li>
</ul>
))}
    </div>
);
};

export default displayNational;
