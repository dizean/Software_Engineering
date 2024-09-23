import React, { useState , useEffect} from 'react';
import axios from 'axios';
import '../../css/local.css';

const UpdateInternational = () => {
const [international, Setinternational] = useState({
    title: '',
    img: '',
    imgPreview: '',
    description : '',
    date : '',
    link : ''
});

const [intnewsData, setintnewsData] = useState([]);
const [selectedIntnews, setselectedIntnews] = useState(null);
//retrieve data
const [showForm, setShowForm] = useState(false);

const handleShowForm = () => {
  setShowForm(!showForm);
};
useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/international/');
    setintnewsData(response.data);
    
  };
  fetchData();
  if (selectedIntnews) {
    Setinternational({
    title: selectedIntnews.title,
    img: selectedIntnews.img,
    imgPreview: selectedIntnews.img ? `http://localhost:3001/${selectedIntnews.img}` : null,
    description : selectedIntnews.description,
    date : selectedIntnews.date,
    link : selectedIntnews.link
    });
  }
}, [selectedIntnews]);

//update
const updateUser = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(`http://localhost:3001/international/${selectedIntnews.id}`, international, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data)
    alert("Successfully Updated!");
    const viewResponse = await axios.get('http://localhost:3001/international/');
    setintnewsData(viewResponse.data);
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
  Setinternational({ ...international, [e.target.name]: e.target.value });
};
//delete
const deleteUser = async (intid) => {
  try {
    const response = await axios.delete(`http://localhost:3001/international/${intid}`);
    alert("Deleted successfully!")
    const viewResponse = await axios.get('http://localhost:3001/international/');
    setintnewsData(viewResponse.data);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      Setinternational((prevInt) => ({
        ...prevInt,
        [e.target.name]: file,
        [`${e.target.name}Preview`]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  } else {
    Setinternational((prevInt) => ({
      ...prevInt,
      [e.target.name]: '',
      [`${e.target.name}Preview`]: '',
    }));
  }
};

const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [showIntnews, setshowIntnews] = useState(true);

const handleSearch = async () => {
  try {
    const response = await axios.post(`http://localhost:3001/international/search`, { searchTerm });
    setSearchResults(response.data);
    setshowIntnews(false);
  } catch (error) {
    console.error('Error searching users:', error);
  }
};

const handleResetSearch = async () => {
  try {
    const response = await axios.get('http://localhost:3001/international/');
    setSearchResults(response.data);
    setshowIntnews(true);
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
    {searchResults.map((international) => (
      <tr key={international.id}>
        <td>{international.title}</td>
        <td>{international.description}</td>
        <td>
        <button onClick={() => setselectedIntnews(international)}> 
        <i onClick={handleShowForm} class="fa fa-edit">
        {showForm ? '' : ''}
        </i>
        </button>
        <button onClick={() => deleteUser(international.id)}> <i className="fas fa-trash-alt"></i></button>
          
        </td>
      </tr>
    ))}
    </tbody>
    </table>
      </div>
    )}
    {showForm && (
      <form onSubmit={updateUser} encType="multipart/form-data">
      <h1>Update International News</h1>
        <label>
          Title:
          <input type="text" name="title" value={international.title} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image for the the News:
          </div>
        <div className='imagepreview'>
        {international.imgPreview && (
            <>
            <img
                src={international.imgPreview}
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
          <textarea name="description" value={international.description} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={international.date} onChange={handleChange} />
        </label>
        <label>
          Link:
          <input type="text" name="link" value={international.link} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    )}
    </div>
);
};

export default UpdateInternational;
