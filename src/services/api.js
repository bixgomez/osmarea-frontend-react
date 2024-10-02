const fetchMaps = async () => {
  const response = await fetch(process.env.REACT_APP_API_URL_MAP);
  if (!response.ok) {
    throw new Error('Failed to fetch maps');
  }
  return response.json();
};

const fetchStudyAreas = async () => {
  const response = await fetch(process.env.REACT_APP_API_URL_STUDY_AREA);
  if (!response.ok) {
    throw new Error('Failed to fetch study areas');
  }
  return response.json();
};

export { fetchMaps, fetchStudyAreas };
