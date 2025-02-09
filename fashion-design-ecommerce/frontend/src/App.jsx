import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/designs')
      .then(response => setDesigns(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Fashion Designer Showcase</h1>
      <div className="gallery">
        {designs.map((design, index) => (
          <div key={index} className="design">
            <img src={design.image} alt={design.title} />
            <h2>{design.title}</h2>
            <p>{design.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;