import React, { useState , useEffect} from 'react';
import axios from 'axios';
import '../../css/local.css';

const LocalNews = () => {
const [local, Setlocal] = useState({
    title: '',
    img: '',
    imgPreview: '',
    description : '',
    date : '',
    link : ''
});
const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in local) {
      formData.append(key, local[key]);
    }
  
    try {
      const response = await axios.post('http://localhost:3001/local/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      alert('Form submitted successfully!');
      Setlocal({
        title: '',
        img: '',
        description : '',
        date : '',
        link : ''
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

const handleChange = (e) => {
    Setlocal({ ...local, [e.target.name]: e.target.value });
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


return (
    <div className='addlocal'> 
      <form onSubmit={handleSubmit}>
      <h1>Add Local News</h1>
        <label>
          Title:
          <input type="text" name="title" value={local.title} onChange={handleChange} />
        </label>
        <div className='imagediv'>
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
        <button type="submit">Submit News</button>
      </form>
    </div>
);
};

export default LocalNews;
