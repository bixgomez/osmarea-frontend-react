import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudyAreaDetail = () => {
  const { alias } = useParams(); // Get the alias from the route
  const [studyArea, setStudyArea] = useState(null);

  useEffect(() => {
    const fetchStudyArea = async () => {
      try {
        const response = await fetch(`https://osmarea.ddev.site/jsonapi/node/study_area?filter[path][alias]=${alias}`);
        const data = await response.json();

        if (data && data.data && data.data.length > 0) {
          setStudyArea(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching study area:', error);
      }
    };

    fetchStudyArea();
  }, [alias]);

  if (!studyArea) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{studyArea.attributes.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: studyArea.attributes.body?.value || 'No description available' }} />
    </div>
  );
};

export default StudyAreaDetail;
