import React, { useEffect, useState } from 'react';

const StudyArea = ({ area }) => {
  const [imageUrl, setImageUrl] = useState('');

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

  return (
    <div>
      <h3>{area.attributes.title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: area.attributes.body?.value || 'No description available',
        }}
      />
      {imageUrl && (
        <img
          src={`${process.env.REACT_APP_BASE_URL}${imageUrl}`}
          alt={area.attributes.field_area_map_image?.data?.meta?.alt || 'Study Area Image'}
          width={area.attributes.field_area_map_image?.data?.meta?.width || 'auto'}
          height={area.attributes.field_area_map_image?.data?.meta?.height || 'auto'}
        />
      )}
    </div>
  );
};

export default StudyArea;
