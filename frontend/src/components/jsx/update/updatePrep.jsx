import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import '../../css/prep.css';

const UpdatePrep = () => {
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

  const [disasterData, setDisasterData] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
//retrieve data
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/prepare/');
      setDisasterData(response.data);
      
    };
    fetchData();
    if (selectedDisaster) {
      Setprepare({
    name: selectedDisaster.name,
    imgprep: selectedDisaster.imgprep,
    imgprepPreview: selectedDisaster.imgprep ? `http://localhost:3001/${selectedDisaster.imgprep}` : null,
    description: selectedDisaster.description,
    prep1: selectedDisaster.prep1,
    prep1d: selectedDisaster.prep1d,
    prep1img: selectedDisaster.prep1img,
    prep1imgPreview: selectedDisaster.prep1img ? `http://localhost:3001/${selectedDisaster.prep1img}` : null,
    prep2: selectedDisaster.prep2,
    prep2d: selectedDisaster.prep2d,
    prep2img: selectedDisaster.prep2img,
    prep2imgPreview: selectedDisaster.prep2img ? `http://localhost:3001/${selectedDisaster.prep2img}` : null,
    prep3: selectedDisaster.prep3,
    prep3d: selectedDisaster.prep3d,
    prep3img: selectedDisaster.prep3img,
    prep3imgPreview: selectedDisaster.prep3img ? `http://localhost:3001/${selectedDisaster.prep3img}` : null,
    prep4: selectedDisaster.prep4,
    prep4d: selectedDisaster.prep4d,
    prep4img: selectedDisaster.prep4img,
    prep4imgPreview: selectedDisaster.prep4img ? `http://localhost:3001/${selectedDisaster.prep4img}` : null,
    prep5: selectedDisaster.prep5,
    prep5d: selectedDisaster.prep5d,
    prep5img: selectedDisaster.prep5img,
    prep5imgPreview: selectedDisaster.prep5img ? `http://localhost:3001/${selectedDisaster.prep5img}` : null,
    dur1: selectedDisaster.dur1,
    dur1d: selectedDisaster.dur1d,
    dur1img: selectedDisaster.dur1img,
    dur1imgPreview: selectedDisaster.dur1img ? `http://localhost:3001/${selectedDisaster.dur1img}` : null,
    dur2: selectedDisaster.dur2,
    dur2d: selectedDisaster.dur2d,
    dur2img: selectedDisaster.dur2img,
    dur2imgPreview: selectedDisaster.dur2img ? `http://localhost:3001/${selectedDisaster.dur2img}` : null,
    dur3: selectedDisaster.dur3,
    dur3d: selectedDisaster.dur3d,
    dur3img: selectedDisaster.dur3img,
    dur3imgPreview: selectedDisaster.dur3img ? `http://localhost:3001/${selectedDisaster.dur3img}` : null,
    dur4: selectedDisaster.dur4,
    dur4d: selectedDisaster.dur4d,
    dur4img: selectedDisaster.dur4img,
    dur4imgPreview: selectedDisaster.dur4img ? `http://localhost:3001/${selectedDisaster.dur4img}` : null,
    dur5: selectedDisaster.dur5,
    dur5d: selectedDisaster.dur5d,
    dur5img: selectedDisaster.dur5img,
    dur5imgPreview: selectedDisaster.dur5img ? `http://localhost:3001/${selectedDisaster.dur5img}` : null,
    aft1: selectedDisaster.aft1,
    aft1d: selectedDisaster.aft1d,
    aft1img: selectedDisaster.aft1img,
    aft1imgPreview: selectedDisaster.aft1img ? `http://localhost:3001/${selectedDisaster.aft1img}` : null,
    aft2: selectedDisaster.aft2,
    aft2d: selectedDisaster.aft2d,
    aft2img: selectedDisaster.aft2img,
    aft2imgPreview: selectedDisaster.aft2img ? `http://localhost:3001/${selectedDisaster.aft2img}` : null,
    aft3: selectedDisaster.aft3,
    aft3d: selectedDisaster.aft3d,
    aft3img: selectedDisaster.aft3img,
    aft3imgPreview: selectedDisaster.aft3img ? `http://localhost:3001/${selectedDisaster.aft3img}` : null,
    aft4: selectedDisaster.aft4,
    aft4d: selectedDisaster.aft4d,
    aft4img: selectedDisaster.aft4img,
    aft4imgPreview: selectedDisaster.aft4img ? `http://localhost:3001/${selectedDisaster.aft4img}` : null,
    aft5: selectedDisaster.aft5,
    aft5d: selectedDisaster.aft5d,
    aft5img: selectedDisaster.aft5img,
    aft5imgPreview: selectedDisaster.aft5img ? `http://localhost:3001/${selectedDisaster.aft5img}` : null
      });
    }
  }, [selectedDisaster]);

  //update
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/prepare/${selectedDisaster.id}`, prepare, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Successfuhefuieh");
      const viewResponse = await axios.get('http://localhost:3001/prepare/');
      setDisasterData(viewResponse.data);
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
    Setprepare({ ...prepare, [e.target.name]: e.target.value });
  };
  //delete
  const deleteUser = async (disasterid) => {
    try {
      const response = await axios.delete(`http://localhost:3001/prepare/${disasterid}`);
      alert("Deleted successfully!")
      const viewResponse = await axios.get('http://localhost:3001/prepare/');
      setDisasterData(viewResponse.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(true);

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/prepare/search`, { searchTerm });
      setSearchResults(response.data);
      setShowAllUsers(false);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleResetSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/prepare/');
      setSearchResults(response.data);
      setShowAllUsers(true);
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
    <div className='prep'>
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
    {searchResults.map((prepare) => (
      <tr key={prepare.id}>
        <td>{prepare.name}</td>
        <td>{prepare.description}</td>
        <td>
        <button onClick={() => setSelectedDisaster(prepare)}> 
        <i onClick={handleShowForm} class="fa fa-edit">
        {showForm ? '' : ''}
        </i>
        </button>
        <button onClick={() => deleteUser(prepare.id)}> <i className="fas fa-trash-alt"></i></button>
          
        </td>
      </tr>
    ))}
    </tbody>
    </table>
      </div>
    )}
{showForm && (
      <form onSubmit={updateUser} encType="multipart/form-data">
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
        <button type="submit">Update</button>
      </form>
         )}
      <button onClick={scrollToSectionButtons}>Go to Section Choices</button>
    </div>
  );
};

export default UpdatePrep;
