import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [studyAreas, setStudyAreas] = useState([]);

  useEffect(() => {
    const fetchAllStudyAreas = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/node/study_area`);
        const data = await response.json();
        console.log(data); // Log the entire response to inspect the available fields
      } catch (error) {
        console.error('Error fetching study areas:', error);
      }
    };
  
    fetchAllStudyAreas();
  }, []);
  

  return (
    <div>
      <h1>Map Comparison Tool</h1>
      <p>From the late 20th century to the second quarter of the 21st!</p>

      {/* Render Study Areas */}
      <h2>Study Areas</h2>
      <ul>
        {studyAreas.map((area) => (
          <li key={area.id}>
            <Link to={`/study-area/${area.attributes.path.alias.replace(/^\/+/, '')}`}>
              {area.attributes.title}
            </Link>

            <Link to={`/study-area${area.attributes.path.alias}`}>
              {area.attributes.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
