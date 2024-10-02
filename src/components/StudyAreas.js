import React, { useEffect, useState } from 'react';
import StudyArea from './StudyArea'; // Import the StudyArea component

const StudyAreas = () => {
  const [studyAreas, setStudyAreas] = useState([]);

  useEffect(() => {
    const fetchStudyAreas = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL_STUDY_AREA);
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
      <h2>Study Areas</h2>
      <ul>
        {studyAreas.map(area => (
          <li key={area.id}>
            <StudyArea area={area} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyAreas;
