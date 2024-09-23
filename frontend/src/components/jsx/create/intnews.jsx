import React, { useState , useEffect} from 'react';
import axios from 'axios';
import '../../css/local.css';

const InternationalNews = () => {
const [international, Setinternational] = useState({
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
    for (const key in international) {
      formData.append(key, international[key]);
    }
  
    try {
      const response = await axios.post('http://localhost:3001/international/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      alert('Form submitted successfully!');
      Setinternational({
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
    Setinternational({ ...international, [e.target.name]: e.target.value });
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
return (
    <div className='addlocal'> 
      <form onSubmit={handleSubmit}>
      <h1>Add International News</h1>
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
          Description:
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
        <button type="submit">Submit News</button>
      </form>
    </div>
);
};

export default InternationalNews;
