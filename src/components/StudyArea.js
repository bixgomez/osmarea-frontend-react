import React, { useEffect, useState } from 'react';

const StudyArea = ({ area }) => {
  console.log('StudyArea component is rendering, area:', area);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    console.log('useEffect is running');
  
    const fetchImage = async () => {
      const fieldAreaMapImage = area.relationships?.field_area_map_image;
      
      if (!fieldAreaMapImage || !fieldAreaMapImage.links || !fieldAreaMapImage.links.related) {
        console.error('field_area_map_image or related link not found');
        return;
      }
      
      const imageLink = fieldAreaMapImage.links.related.href;
      try {
        console.log('Fetching image from:', imageLink);
        const response = await fetch(imageLink);
  
        if (!response.ok) {
          console.error('Error fetching image data:', response.statusText);
          return;
        }
  
        const data = await response.json();
  
        // Add a check to ensure the data object exists
        if (!data || !data.data) {
          console.error('No data found in response:', data);
          return;
        }
  
        console.log('Image data received:', data);
  
        const imageUrl = data.data.attributes?.uri?.url;
        if (!imageUrl) {
          console.error('Image URL not found in response');
          return;
        }
  
        console.log('Image URL:', imageUrl);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
  
    // Ensure `relationships` and `field_area_map_image` are present before running fetchImage
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
