import React, { useState } from 'react';
import axios from 'axios';
import GaugeChart from 'react-gauge-chart';
import Modal from 'react-modal';
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

function App() {
  const [jd, setJd] = useState('');
  const [customTags, setCustomTags] = useState('');
  const [resume, setResume] = useState(null);
  const [score, setScore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signup, setSignUp] = useState(false)


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
      <Router>
    {/* The rest of your app goes here */}
      {
        localStorage.getItem("userPresent")?
        

        <Home/>
        :
        (signup ? <Signup setSignUp={setSignUp}/> : <Login setSignUp={setSignUp} />)
      }

      {/* <Login/> */}


        </Router>
    </div>
  );
}

export default App;
