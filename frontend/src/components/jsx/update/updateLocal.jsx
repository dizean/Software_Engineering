import React, { useState , useEffect} from 'react';
import axios from 'axios';
import '../../css/local.css';

const UpdateLocal = () => {
const [local, Setlocal] = useState({
    title: '',
    img: '',
    imgPreview: '',
    description : '',
    date : '',
    link : ''
});

const [localnewsData, setlocalnewsData] = useState([]);
const [selectedLocalNews, setselectedLocalNews] = useState(null);
//retrieve data
const [showForm, setShowForm] = useState(false);

const handleShowForm = () => {
  setShowForm(!showForm);
};
useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/local/');
    setlocalnewsData(response.data);
    
  };
  fetchData();
  if (selectedLocalNews) {
    Setlocal({
    title: selectedLocalNews.title,
    img: selectedLocalNews.img,
    imgPreview: selectedLocalNews.img ? `http://localhost:3001/${selectedLocalNews.img}` : null,
    description : selectedLocalNews.description,
    date : selectedLocalNews.date,
    link : selectedLocalNews.link
    });
  }
}, [selectedLocalNews]);

//update
const updateUser = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(`http://localhost:3001/local/${selectedLocalNews.id}`, local, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data)
    alert("Successfully Updated!");
    const viewResponse = await axios.get('http://localhost:3001/local/');
    setlocalnewsData(viewResponse.data);
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
  Setlocal({ ...local, [e.target.name]: e.target.value });
};
//delete
const deleteUser = async (localid) => {
  try {
    const response = await axios.delete(`http://localhost:3001/local/${localid}`);
    alert("Deleted successfully!")
    const viewResponse = await axios.get('http://localhost:3001/local/');
    setlocalnewsData(viewResponse.data);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      Setlocal((prevLocal) => ({
        ...prevLocal,
        [e.target.name]: file,
        [`${e.target.name}Preview`]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  } else {
    Setlocal((prevLocal) => ({
      ...prevLocal,
      [e.target.name]: '',
      [`${e.target.name}Preview`]: '',
    }));
  }
};

const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [showLocalNews, setshowLocalNews] = useState(true);

const handleSearch = async () => {
  try {
    const response = await axios.post(`http://localhost:3001/local/search`, { searchTerm });
    setSearchResults(response.data);
    setshowLocalNews(false);
  } catch (error) {
    console.error('Error searching users:', error);
  }
};

const handleResetSearch = async () => {
  try {
    const response = await axios.get('http://localhost:3001/local/');
    setSearchResults(response.data);
    setshowLocalNews(true);
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
    {searchResults.map((local) => (
      <tr key={local.id}>
        <td>{local.title}</td>
        <td>{local.description}</td>
        <td>
        <button onClick={() => setselectedLocalNews(local)}> 
        <i onClick={handleShowForm} class="fa fa-edit">
        {showForm ? '' : ''}
        </i>
        </button>
        <button onClick={() => deleteUser(local.id)}> <i className="fas fa-trash-alt"></i></button>
          
        </td>
      </tr>
    ))}
    </tbody>
    </table>
      </div>
    )}
    {showForm && (
      <form onSubmit={updateUser} encType="multipart/form-data">
      <h1>Update Local News</h1>
        <label>
          Title:
          <input type="text" name="title" value={local.title} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image for the the News:
          </div>
        <div className='imagepreview'>
        {local.imgPreview && (
            <>
            <img
                src={local.imgPreview}
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
          <textarea name="description" value={local.description} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={local.date} onChange={handleChange} />
        </label>
        <label>
          Link:
          <input type="text" name="link" value={local.link} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    )}
    </div>
);
};

export default UpdateLocal;
