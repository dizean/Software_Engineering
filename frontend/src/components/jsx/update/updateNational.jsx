import React, { useState , useEffect} from 'react';
import axios from 'axios';
import '../../css/local.css';

const UpdateNational = () => {
const [national, Setnational] = useState({
    title: '',
    img: '',
    imgPreview: '',
    description : '',
    date : '',
    link : ''
});

const [natnewsData, setnatnewsData] = useState([]);
const [selectedNatnews, setselectedNatnews] = useState(null);
//retrieve data
const [showForm, setShowForm] = useState(false);

const handleShowForm = () => {
  setShowForm(!showForm);
};
useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/national/');
    setnatnewsData(response.data);
    
  };
  fetchData();
  if (selectedNatnews) {
    Setnational({
    title: selectedNatnews.title,
    img: selectedNatnews.img,
    imgPreview: selectedNatnews.img ? `http://localhost:3001/${selectedNatnews.img}` : null,
    description : selectedNatnews.description,
    date : selectedNatnews.date,
    link : selectedNatnews.link
    });
  }
}, [selectedNatnews]);

//update
const updateUser = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(`http://localhost:3001/national/${selectedNatnews.id}`, national, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data)
    alert("Successfully Updated!");
    const viewResponse = await axios.get('http://localhost:3001/national/');
    setnatnewsData(viewResponse.data);
    setShowForm(!showForm);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    alert('Error updating user:', error);
  }
};
const handleChange = (e) => {
  Setnational({ ...national, [e.target.name]: e.target.value });
};
//delete
const deleteUser = async (natid) => {
  try {
    const response = await axios.delete(`http://localhost:3001/national/${natid}`);
    alert("Deleted successfully!")
    const viewResponse = await axios.get('http://localhost:3001/national/');
    setnatnewsData(viewResponse.data);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      Setnational((prevNat) => ({
        ...prevNat,
        [e.target.name]: file,
        [`${e.target.name}Preview`]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  } else {
    Setnational((prevNat) => ({
      ...prevNat,
      [e.target.name]: '',
      [`${e.target.name}Preview`]: '',
    }));
  }
};

const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [showNatnews, setshowNatnews] = useState(true);

const handleSearch = async () => {
  try {
    const response = await axios.post(`http://localhost:3001/national/search`, { searchTerm });
    setSearchResults(response.data);
    setshowNatnews(false);
  } catch (error) {
    console.error('Error searching users:', error);
  }
};

const handleResetSearch = async () => {
  try {
    const response = await axios.get('http://localhost:3001/national/');
    setSearchResults(response.data);
    setshowNatnews(true);
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


return (
    <div className='addlocal'>
        <input
        type="text"
        className='search'
        placeholder="Search by name of Title of News &#128269;"
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
    {searchResults.map((national) => (
      <tr key={national.id}>
        <td>{national.title}</td>
        <td>{national.description}</td>
        <td>
        <button onClick={() => setselectedNatnews(national)}> 
        <i onClick={handleShowForm} class="fa fa-edit">
        {showForm ? '' : ''}
        </i>
        </button>
        <button onClick={() => deleteUser(national.id)}> <i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    ))}
    </tbody>
    </table>
      </div>
    )}
    {showForm && (
      <form onSubmit={updateUser} encType="multipart/form-data">
      <h1>Update National News</h1>
        <label>
          Title:
          <input type="text" name="title" value={national.title} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image for the the News:
          </div>
        <div className='imagepreview'>
        {national.imgPreview && (
            <>
            <img
                src={national.imgPreview}
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
          Description:<br/>
          <textarea name="description" value={national.description} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={national.date} onChange={handleChange} />
        </label>
        <label>
          Link:
          <input type="text" name="link" value={national.link} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    )}
    </div>
);
};

export default UpdateNational;
