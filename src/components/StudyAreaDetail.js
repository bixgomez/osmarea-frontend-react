import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudyAreaDetail = () => {
  const { alias } = useParams(); // Extract the alias from the URL
  const [studyArea, setStudyArea] = useState(null); // To store study area data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchStudyAreas = async () => {
      try {
        // Fetch all study areas
        const response = await fetch(`${process.env.REACT_APP_API_URL}/node/study_area`);
        const data = await response.json();

        if (data && data.data && data.data.length > 0) {
          // Find the study area that matches the alias
          const matchedStudyArea = data.data.find((area) => area.attributes.path.alias === `/${alias}`);
          
          if (matchedStudyArea) {
            setStudyArea(matchedStudyArea); // Set the matched study area
          } else {
            console.error('No study area found for this alias');
          }
        } else {
          console.error('No study areas found in API');
        }
      } catch (error) {
        console.error('Error fetching study areas:', error);
      } finally {
        setLoading(false); // Set loading to false whether we succeed or fail
      }
    };

    fetchStudyAreas(); // Call the function when component mounts
  }, [alias]); // Re-run the effect when alias changes

  if (loading) {
    return <div>Loading...</div>; // Display loading while fetching
  }

  if (!studyArea) {
    return <div>No Study Area found</div>; // If no study area is found
  }

  return (
    <div>
      <h1>{studyArea.attributes.title}</h1> {/* Display the title */}
    </div>
  );
};

export default StudyAreaDetail;
