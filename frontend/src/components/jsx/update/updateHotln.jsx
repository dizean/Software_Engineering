import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../../css/hotline.css';

const UpdateHotline = () => {
  const [hotline, setHotline] = useState({
    city: '',
    img: '',
    imgPreview: '',
    description: '',
    bfp1: '',
    bfp2: '',
    pnp: '',
    cdrrmo1: '',
    cdrrmo2: '',
    redcross: '',
  });

  const [hotlineData, sethotlineData] = useState([]);
  const [selectedHotline, setselectedHotline] = useState(null);
//retrieve data
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/hotline/');
      sethotlineData(response.data);
    };
  
    fetchData();
  
    if (selectedHotline) {
      setHotline({
        city: selectedHotline.city,
        img: selectedHotline.img,
        imgPreview: selectedHotline.img ? `http://localhost:3001/${selectedHotline.img}` : null,
        description: selectedHotline.description,
        bfp1: selectedHotline.bfp1,
        bfp2: selectedHotline.bfp2,
        pnp: selectedHotline.pnp,
        cdrrmo1: selectedHotline.cdrrmo1,
        cdrrmo2: selectedHotline.cdrrmo2,
        redcross: selectedHotline.redcross,
      });
    }
  }, [selectedHotline]);

  const updateHotline = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/hotline/${selectedHotline.id}`, hotline,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Successfully updated!");
      setselectedHotline(null);
      const viewResponse = await axios.get('http://localhost:3001/hotline/');
      sethotlineData(viewResponse.data);
      setShowForm(!showForm);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      alert('Error updating hotline:', error);
    }
  };
  

  //delete
  const deleteUser = async (cityid) => {
    try {
      const response = await axios.delete(`http://localhost:3001/hotline/${cityid}`);
      alert("Deleted successfully!")
      const viewResponse = await axios.get('http://localhost:3001/hotline/');
      sethotlineData(viewResponse.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    setHotline({ ...hotline, [e.target.name]: e.target.value });
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAllHotline, setshowAllHotline] = useState(true);

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/hotline/search`, { searchTerm });
      setSearchResults(response.data);
      setshowAllHotline(false);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleResetSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/hotline/');
      setSearchResults(response.data);
      setshowAllHotline(true);
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      handleResetSearch();
    } else {
      handleSearch();
    }
  };
  
  useEffect(() => {
    handleResetSearch();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHotline((prevHotline) => ({
          ...prevHotline,
          [e.target.name]: file,
          [`${e.target.name}Preview`]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setHotline((prevHotline) => ({
        ...prevHotline,
        [e.target.name]: '',
        [`${e.target.name}Preview`]: '',
      }));
    }
  };
  
  return (
    <div className='hotlines'>
        <input
        type="text"
        className='search'
        placeholder="Search by name of Disaster &#128269;"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchResults.length > 0 && (
      <div className='prep-table-container'>
      <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    {searchResults.map((hotline) => (
      <tr key={hotline.id}>
        <td>{hotline.city}</td>
        <td>{hotline.description}</td>
        <td>
        <button onClick={() => setselectedHotline(hotline)}> 
        <i onClick={handleShowForm} class="fa fa-edit">
        {showForm ? '' : ''}
        </i>
        </button>
        <button onClick={() => deleteUser(hotline.id)}> <i className="fas fa-trash-alt"></i></button>
          
        </td>
      </tr>
    ))}
    </tbody>
    </table>
      </div>
    )}
    {showForm && (
      <form onSubmit={updateHotline}>
      <h1>Update Hotline Numbers</h1>
        <label>
          City:
          <input type="text" name="city" value={hotline.city} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image for the the News:
          </div>
        <div className='imagepreview'>
        {hotline.imgPreview && (
            <>
            <img
                src={hotline.imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
          Description:
          <input type="text" name="description" value={hotline.description} onChange={handleChange} />
        </label>
        <label>
          BFP1:
          <input type="text" name="bfp1" value={hotline.bfp1} onChange={handleChange} />
        </label>
        <label>
          BFP2:
          <input type="text" name="bfp2" value={hotline.bfp2} onChange={handleChange} />
        </label>
        <label>
          PNP:
          <input type="text" name="pnp" value={hotline.pnp} onChange={handleChange} />
        </label>
        <label>
          CDRRMO1:
          <input type="text" name="cdrrmo1" value={hotline.cdrrmo1} onChange={handleChange} />
        </label>
        <label>
          CDRRMO2:
          <input type="text" name="cdrrmo2" value={hotline.cdrrmo2} onChange={handleChange} />
        </label>
        <label>
          Red Cross:
          <input type="text" name="redcross" value={hotline.redcross} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
        
      </form>
      )}
    </div>
  );
};

export default UpdateHotline;
