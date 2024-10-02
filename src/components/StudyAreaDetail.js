import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Map from './Map'; // Import the Map component to display individual maps

const StudyAreaDetail = () => {
  const { alias } = useParams(); // Alias from the URL
  const location = useLocation(); // Access location to get the state
  const [studyArea, setStudyArea] = useState(null); // Study area data
  const [loading, setLoading] = useState(true); // Loading state
  const [imageUrl, setImageUrl] = useState(''); // Guide map image URL
  const [maps, setMaps] = useState([]); // Related maps

  useEffect(() => {
    const fetchStudyAreaByUUID = async (uuid) => {
      try {
        // Fetch the study area by its UUID (or another identifier)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/node/study_area/${uuid}`);
        const data = await response.json();

        if (data && data.data) {
          const areaData = data.data;
          setStudyArea(areaData); // Set the study area data
          
          // Fetch guide map image
          const imageLink = areaData.relationships?.field_area_map_image?.links?.related?.href;
          if (imageLink) {
            fetchImage(imageLink);
          }

          // Fetch related maps
          const mapsLink = areaData.relationships?.field_maps?.links?.related?.href;
          if (mapsLink) {
            fetchMaps(mapsLink);
          }
        } else {
          console.error('No study area found for this UUID');
        }
      } catch (error) {
        console.error('Error fetching study area:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    const fetchImage = async (imageLink) => {
      try {
        const response = await fetch(imageLink);
        if (!response.ok) {
          console.error('Error fetching image data:', response.statusText);
          return;
        }
        const data = await response.json();
        const imageUrl = data?.data?.attributes?.uri?.url;
        if (imageUrl) {
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    const fetchMaps = async (mapsLink) => {
      try {
        const response = await fetch(mapsLink);
        if (!response.ok) {
          console.error('Error fetching maps data:', response.statusText);
          return;
        }
        const data = await response.json();
        setMaps(data.data); // Assuming maps are returned in data.data
      } catch (error) {
        console.error('Error fetching maps:', error);
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
    return <div>No Study Area found</div>; // If no study area is found
  }

  return (
    <div>
      <h1>{studyArea.attributes.title}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: studyArea.attributes.body?.value || 'No description available',
        }}
      /> 

      {imageUrl && (
        <img
          src={`${process.env.REACT_APP_BASE_URL}${imageUrl}`}
          alt={studyArea.attributes.field_area_map_image?.data?.meta?.alt || 'Study Area Image'}
          width={studyArea.attributes.field_area_map_image?.data?.meta?.width || 'auto'}
          height={studyArea.attributes.field_area_map_image?.data?.meta?.height || 'auto'}
        />
      )}

      {/* Related maps */}
      <ul>
        {maps.map((map) => (
          <li key={map.id}>
            <Map map={map} />
            <p>{map.attributes?.title || `Map ID: ${map.id}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyAreaDetail;
