import React, { useEffect, useState } from 'react';
import Map from './Map'; // Import the Map component

const StudyArea = ({ area }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [maps, setMaps] = useState([]);

  // Fetch the image for the study area
  useEffect(() => {
    const fetchImage = async () => {
      const imageLink = area.relationships?.field_area_map_image?.links?.related?.href;

      if (!imageLink) {
        console.error('Image link not found');
        return;
      }

      try {
        const response = await fetch(imageLink);

        if (!response.ok) {
          console.error('Error fetching image data:', response.statusText);
          return;
        }

        const data = await response.json();
        const imageUrl = data?.data?.attributes?.uri?.url;

        if (!imageUrl) {
          console.error('Image URL not found in response');
          return;
        }

        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    if (area.relationships?.field_area_map_image?.links?.related?.href) {
      fetchImage();
    }
  }, [area]);

  // Fetch the related maps
  useEffect(() => {
    const fetchMaps = async () => {
      const mapsLink = area.relationships?.field_maps?.links?.related?.href;

      if (!mapsLink) {
        console.error('Maps link not found');
        return;
      }

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

    if (area.relationships?.field_maps?.links?.related?.href) {
      fetchMaps();
    }
  }, [area]);

  return (
    <div>
      <h3>{area.attributes.title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: area.attributes.body?.value || 'No description available',
        }}
      />

      {/* Render the image */}
      {imageUrl && (
        <img
          src={`${process.env.REACT_APP_BASE_URL}${imageUrl}`}
          alt={area.attributes.field_area_map_image?.data?.meta?.alt || 'Study Area Image'}
          width={area.attributes.field_area_map_image?.data?.meta?.width || 'auto'}
          height={area.attributes.field_area_map_image?.data?.meta?.height || 'auto'}
        />
      )}

      {/* Render the related maps */}
      <h4>Maps</h4>
      <ul>
        {maps.map((map) => (
          <li key={map.id}>
            <Map map={map} /> {/* Pass the map object to the Map component */}
            <p>{map.attributes?.title || `Map ID: ${map.id}`}</p> {/* Show title or fallback to Map ID */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyArea;
