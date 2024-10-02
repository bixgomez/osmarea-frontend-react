import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [studyAreas, setStudyAreas] = useState([]);

  useEffect(() => {
    const fetchStudyAreas = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/node/study_area`);
        const data = await response.json();
        setStudyAreas(data.data);
      } catch (error) {
        console.error('Error fetching study areas:', error);
      }
    };

    fetchStudyAreas();
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
            {/* Pass the alias in the URL, but pass the UUID in the Link state */}
            <Link
              to={`/study-area/${area.attributes.path.alias.replace(/^\/+/, '')}`}
              state={{ uuid: area.id }}
            >
              {area.attributes.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
