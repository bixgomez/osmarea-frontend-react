import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const StudyAreaDetail = () => {
  const { alias } = useParams(); // Alias from the URL
  const location = useLocation(); // Access location to get the state
  const [studyArea, setStudyArea] = useState(null); // Study area data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchStudyAreaByUUID = async (uuid) => {
      try {
        // Fetch the study area by its UUID (or another identifier)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/node/study_area/${uuid}`);
        const data = await response.json();

        if (data && data.data) {
          setStudyArea(data.data); // Set the study area data
        } else {
          console.error('No study area found for this UUID');
        }
      } catch (error) {
        console.error('Error fetching study area:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    // Get the UUID from state, which was passed via Link
    if (location.state && location.state.uuid) {
      fetchStudyAreaByUUID(location.state.uuid); // Fetch study area by UUID
    } else {
      console.error('No UUID provided in the link state');
      setLoading(false);
    }
  }, [alias, location.state]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!studyArea) {
    return <div>No Study Area found</div>; // If no study area found
  }

  return (
    <div>
      <h1>{studyArea.attributes.title}</h1> {/* Display study area title */}
    </div>
  );
};

export default StudyAreaDetail;
