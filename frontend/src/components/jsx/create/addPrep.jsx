import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import '../../css/prep.css';

const Prepare = () => {
  const [activeTab, setActiveTab] = useState("before");

  const handleTabClick = (tab) => {
    setActiveTab((prevTab) => (prevTab === tab ? "" : tab));
  };

  const sectionButtonsRef = React.useRef(null);

  const scrollToSectionButtons = () => {
    if (sectionButtonsRef.current) {
      sectionButtonsRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
  
  const [prepare, Setprepare] = useState({
    name: '',
    imgprep: '',
    imgprepPreview: '',
    description: '',
    prep1: '',
    prep1d: '',
    prep1img: '',
    prep1imgPreview: '',
    prep2: '',
    prep2d: '',
    prep2img: '',
    prep2imgPreview: '',
    prep3: '',
    prep3d: '',
    prep3img: '',
    prep3imgPreview: '',
    prep4: '',
    prep4d: '',
    prep4img: '',
    prep4imgPreview: '',
    prep5: '',
    prep5d: '',
    prep5img: '',
    prep5imgPreview: '',
    dur1: '',
    dur1d: '',
    dur1img: '',
    dur1imgPreview: '',
    dur2: '',
    dur2d: '',
    dur2img: '',
    dur2imgPreview: '',
    dur3: '',
    dur3d: '',
    dur3img: '',
    dur3imgPreview: '',
    dur4: '',
    dur4d: '',
    dur4img: '',
    dur4imgPreview: '',
    dur5: '',
    dur5d: '',
    dur5img: '',
    dur5imgPreview: '',
    aft1: '',
    aft1d: '',
    aft1img: '',
    aft1imgPreview: '',
    aft2: '',
    aft2d: '',
    aft2img: '',
    aft2imgPreview: '',
    aft3: '',
    aft3d: '',
    aft3img: '',
    aft3imgPreview: '',
    aft4: '',
    aft4d: '',
    aft4img: '',
    aft4imgPreview: '',
    aft5: '',
    aft5d: '',
    aft5img: '',
    aft5imgPreview: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in prepare) {
      formData.append(key, prepare[key]);
    }
  
    try {
      const response = await axios.post('http://localhost:3001/prepare/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      alert('Form submitted successfully!');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      Setprepare({
        name: '',
        imgprep:'',
        description: '',
        prep1: '',
        prep1d: '',
        prep1img: '',
        prep2: '',
        prep2d: '',
        prep2img: '',
        prep3: '',
        prep3d: '',
        prep3img: '',
        prep4: '',
        prep4d: '',
        prep4img: '',
        prep5: '',
        prep5d: '',
        prep5img: '',
        dur1: '',
        dur1d: '',
        dur1img: '',
        dur2: '',
        dur2d: '',
        dur2img: '',
        dur3: '',
        dur3d: '',
        dur3img: '',
        dur4: '',
        dur4d: '',
        dur4img: '',
        dur5: '',
        dur5d: '',
        dur5img: '',
        aft1: '',
        aft1d: '',
        aft1img: '',
        aft2: '',
        aft2d: '',
        aft2img: '',
        aft3: '',
        aft3d: '',
        aft3img: '',
        aft4: '',
        aft4d: '',
        aft4img: '',
        aft5: '',
        aft5d: '',
        aft5img: '',
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleChange = (e) => {
    Setprepare({ ...prepare, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        Setprepare((prevPrepare) => ({
          ...prevPrepare,
          [e.target.name]: file,
          [`${e.target.name}Preview`]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      Setprepare((prevPrepare) => ({
        ...prevPrepare,
        [e.target.name]: '',
        [`${e.target.name}Preview`]: '',
      }));
    }
  };

  return (
    <div className='prep'>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Add Prepare Descriptions</h1>
        <label>
          Name:
          <input type="text" name="name" value={prepare.name} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image for the the Disaster:
          </div>
        <div className='imagepreview'>
        {prepare.imgprepPreview && (
            <>
            <img
                src={prepare.imgprepPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="imgprep" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
          Description:
          <textarea type="text" name="description" value={prepare.description} onChange={handleChange} />
        </label>

        <div className="section-buttons" ref={sectionButtonsRef}>
          <a onClick={() => handleTabClick("before")} className={`tab ${activeTab === "before" ? "active" : ""}`}>
            Add Information for What to Before
          </a>
          <a onClick={() => handleTabClick("during")} className={`tab ${activeTab === "during" ? "active" : ""}`}>
            Add Information for What to During
          </a>
          <a onClick={() => handleTabClick("after")} className={`tab ${activeTab === "after" ? "active" : ""}`}>
            Add Information for What to After
          </a>
        </div>
        {/* Preparations */}
        <div className={`before ${activeTab === "before" ? "" : "hidden"}`}>
        <label>
          Prep1:
          <input type="text" name="prep1" value={prepare.prep1} onChange={handleChange} />
        </label>
        <label>
          Prep1 Description:
          <textarea type="text" name="prep1d" value={prepare.prep1d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.prep1imgPreview && (
            <>
            <img
                src={prepare.prep1imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="prep1img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
          Prep2:
          <input type="text" name="prep2" value={prepare.prep2} onChange={handleChange} />
        </label>
        <label>
          Prep2 Description:
          <textarea type="text" name="prep2d" value={prepare.prep2d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.prep2imgPreview && (
            <>
            <img
                src={prepare.prep2imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="prep2img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
        Prep3:
        <input type="text" name="prep3" value={prepare.prep3} onChange={handleChange} />
        </label>
        <label>
            Prep3 Description:
            <textarea type="text" name="prep3d" value={prepare.prep3d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.prep3imgPreview && (
            <>
            <img
                src={prepare.prep3imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="prep3img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
            Prep4:
            <input type="text" name="prep4" value={prepare.prep4} onChange={handleChange} />
        </label>
        <label>
            Prep4 Description:
            <textarea type="text" name="prep4d" value={prepare.prep4d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.prep4imgPreview && (
            <>
            <img
                src={prepare.prep4imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="prep4img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
            Prep5:
            <input type="text" name="prep5" value={prepare.prep5} onChange={handleChange} />
        </label>
        <label>
            Prep5 Description:
            <textarea type="text" name="prep5d" value={prepare.prep5d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.prep5imgPreview && (
            <>
            <img
                src={prepare.prep5imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="prep5img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        </div>
        {/* During */}
        <div className={`during ${activeTab === "during" ? "" : "hidden"}`}>
        <label>
          Dur1:
          <input type="text" name="dur1" value={prepare.dur1} onChange={handleChange} />
        </label>
        <label>
          Dur1 Description:
          <textarea type="text" name="dur1d" value={prepare.dur1d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.dur1imgPreview && (
            <>
            <img
                src={prepare.dur1imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="dur1img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>

        <label>
          Dur2:
          <input type="text" name="dur2" value={prepare.dur2} onChange={handleChange} />
        </label>
        <label>
          Dur2 Description:
          <textarea type="text" name="dur2d" value={prepare.dur2d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.dur2imgPreview && (
            <>
            <img
                src={prepare.dur2imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="dur2img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
          Dur3:
          <input type="text" name="dur3" value={prepare.dur3} onChange={handleChange} />
        </label>
        <label>
          Dur3 Description:
          <textarea type="text" name="dur3d" value={prepare.dur3d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.dur3imgPreview && (
            <>
            <img
                src={prepare.dur3imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="dur3img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>

        <label>
          Dur4:
          <input type="text" name="dur4" value={prepare.dur4} onChange={handleChange} />
        </label>
        <label>
          Dur4 Description:
          <textarea type="text" name="dur4d" value={prepare.dur4d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.dur4imgPreview && (
            <>
            <img
                src={prepare.dur4imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="dur4img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>

        <label>
          Dur5:
          <input type="text" name="dur5" value={prepare.dur5} onChange={handleChange} />
        </label>
        <label>
          Dur5 Description:
          <textarea type="text" name="dur5d" value={prepare.dur5d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.dur5imgPreview && (
            <>
            <img
                src={prepare.dur5imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="dur5img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        </div>
        
        {/* After  */}
        <div className={`after ${activeTab === "after" ? "" : "hidden"}`}>
        <label>
          Aft1:
          <input type="text" name="aft1" value={prepare.aft1} onChange={handleChange} />
        </label>
        <label>
          Aft1 Description:
          <textarea type="text" name="aft1d" value={prepare.aft1d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.aft1imgPreview && (
            <>
            <img
                src={prepare.aft1imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="aft1img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
          Aft2:
          <input type="text" name="aft2" value={prepare.aft2} onChange={handleChange} />
        </label>
        <label>
          Aft2 Description:
          <textarea type="text" name="aft2d" value={prepare.aft2d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.aft2imgPreview && (
            <>
            <img
                src={prepare.aft2imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="aft2img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
          Aft3:
          <input type="text" name="aft3" value={prepare.aft3} onChange={handleChange} />
        </label>
        <label>
          Aft3 Description:
          <textarea type="text" name="aft3d" value={prepare.aft3d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.aft3imgPreview && (
            <>
            <img
                src={prepare.aft3imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="aft3img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
          Aft4:
          <input type="text" name="aft4" value={prepare.aft4} onChange={handleChange} />
        </label>
        <label>
          Aft4 Description:
          <textarea type="text" name="aft4d" value={prepare.aft4d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.aft4imgPreview && (
            <>
            <img
                src={prepare.aft4imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="aft4img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        <label>
          Aft5:
          <input type="text" name="aft5" value={prepare.aft5} onChange={handleChange} />
        </label>
        <label>
          Aft5 Description:
          <textarea type="text" name="aft5d" value={prepare.aft5d} onChange={handleChange} />
        </label>
        <div className='imagediv'>
        <label>
          <div className='textimg'>
          Image Here
          </div>
        <div className='imagepreview'>
        {prepare.aft5imgPreview && (
            <>
            <img
                src={prepare.aft5imgPreview}
                alt="img"
                style={{ width: '200px', height: '200px' }}
            />
            </>
            )}
        </div>
        <div className='imageinput'>
        <p>(Note: need to reselect file or choose a new file to avoid errors.)</p>
        <input type="file" name="aft5img" accept="image/*" onChange={handleFileChange} />
        </div>
        </label>
        </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={scrollToSectionButtons}>Go to Section Choices</button>
    </div>
  );
};

export default Prepare;
