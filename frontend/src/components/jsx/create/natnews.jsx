import React, { useState , useEffect} from 'react';
import axios from 'axios';
import '../../css/local.css';
const NationalNews = () => {
const [national, Setnational] = useState({
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
    for (const key in national) {
      formData.append(key, national[key]);
    }
  
    try {
      const response = await axios.post('http://localhost:3001/national/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      alert('Form submitted successfully!');
      Setnational({
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
    Setnational({ ...national, [e.target.name]: e.target.value });
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

return (
    <div className='addlocal'>  
      <form onSubmit={handleSubmit}>
      <h1>Add National News</h1>
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
          Description:
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
        <button type="submit">Submit News</button>
      </form>
    </div>
);
};

export default NationalNews;
