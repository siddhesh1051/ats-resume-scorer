import React, { useState } from 'react';
import axios from 'axios';
import GaugeChart from 'react-gauge-chart';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";


import './App.css';

function App() {
    const navigate = useNavigate();
  const [jd, setJd] = useState('');
  const [customTags, setCustomTags] = useState('');
  const [resume, setResume] = useState(null);
  const [score, setScore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('jd', jd);
    formData.append('custom_tags', customTags);
    formData.append('resume', resume);

    try {
      const response = await axios.post('https://ats-resume-scorer.onrender.com/calculate_similarity', formData);
      setScore(response.data.score);
      openModal();
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
                <button onClick={()=>{localStorage.removeItem("userPresent"); window.location.reload()
}} className="app-button-logout">Logout</button>

      <div className="app-header">
        <h1 className="app-heading">Resume Similarity Calculator</h1>
      </div>
      <div className="app-content">
        <form className="app-form" onSubmit={handleSubmit}>
          <label className="app-label" htmlFor="jd">Job Description:</label>
          <textarea className="app-textarea" id="jd" value={jd} onChange={(e) => setJd(e.target.value)} rows="4"  />

          <label className="app-label" htmlFor="custom_tags">Custom Tags (comma-separated):</label>
          <input className="app-input" type="text" id="custom_tags" value={customTags} onChange={(e) => setCustomTags(e.target.value)} />

          <label className="app-label" htmlFor="resume">Upload Resume:</label>
          <input className="app-file-input" type="file" id="resume" onChange={(e) => setResume(e.target.files[0])} />

          <button className="app-button" type="submit">Calculate Similarity</button>
        </form>

        <Modal
          isOpen={isModalOpen}
        //   style={{backgroundColor: 'black'}}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Similarity Score</h2>
          <GaugeChart
            id="gauge-chart-modal"
            nrOfLevels={20}
            percent={score / 100}
            textColor="#ffffff"
            className='gauge-chart'
            formatTextValue={(value) => `${value}%`}
          />
          <button className="app-button" onClick={closeModal}>Close</button>
        </Modal>
      </div>

    </div>
  );
}

export default App;
