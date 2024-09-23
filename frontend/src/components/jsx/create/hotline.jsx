import React, { useState } from 'react';
import axios from 'axios';
import '../../css/hotline.css';

const Hotline = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in hotline) {
      formData.append(key, hotline[key]);
    }
  
    try {
      const response = await axios.post('http://localhost:3001/hotline/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      alert('Form submitted successfully!');
      setHotline({
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
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleChange = (e) => {
    setHotline({ ...hotline, [e.target.name]: e.target.value });
  };

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
      <form onSubmit={handleSubmit}>
      <h1>Add Hotline Numbers</h1>
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
          <textarea type="text" name="description" value={hotline.description} onChange={handleChange} />
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
        <button type="submit">Submit</button>
        
      </form>
    </div>
  );
};

export default Hotline;
