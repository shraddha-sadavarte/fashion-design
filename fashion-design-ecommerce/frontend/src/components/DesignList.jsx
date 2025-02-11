import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DesignList() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    const response = await axios.get('http://localhost:5000/designs');
    setDesigns(response.data);
  };

  const deleteDesign = async (id) => {
    await axios.delete(`http://localhost:5000/designs/${id}`);
    fetchDesigns();
  };

  return (
    <div>
      <h2>Designs</h2>
      {designs.map(design => (
        <div key={design.id}>
          <img src={design.image} alt={design.title} width="200" />
          <h3>{design.title}</h3>
          <p>{design.description}</p>
          <button onClick={() => deleteDesign(design.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default DesignList;