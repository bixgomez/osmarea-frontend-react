import React, { useEffect, useState } from 'react';

const Map = ({ map, showTitle = false, showDescription = false, showImage = true }) => {
  const [mapImageUrl, setMapImageUrl] = useState('');

  useEffect(() => {
    const fetchMapImage = async () => {
      const mapImageLink = map.relationships?.field_map_image?.links?.related?.href;

      if (!mapImageLink) {
        console.error('Map image link not found');
        return;
      }

      try {
        const response = await fetch(mapImageLink);

        if (!response.ok) {
          console.error('Error fetching map image data:', response.statusText);
          return;
        }

        const data = await response.json();
        const imageUrl = data?.data?.attributes?.uri?.url;

        if (!imageUrl) {
          console.error('Map image URL not found in response');
          return;
        }

        setMapImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching map image:', error);
      }
    };

    if (map.relationships?.field_map_image?.links?.related?.href) {
      fetchMapImage();
    }
  }, [map]);

  return (
    <div>
      {showTitle && <h5>{map.attributes?.title || `Map ID: ${map.id}`}</h5>}
      
      {showImage && mapImageUrl && (
        <img
          src={`${process.env.REACT_APP_BASE_URL}${mapImageUrl}`}
          alt={map.attributes?.title || 'Map Image'}
          width={map.attributes?.field_map_image?.meta?.width || 'auto'}
          height={map.attributes?.field_map_image?.meta?.height || 'auto'}
        />
      )}

      {showDescription && map.attributes?.description && (
        <p>{map.attributes.description}</p>
      )}
    </div>
  );
};

export default Map;
