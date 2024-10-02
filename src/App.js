import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudyAreasV1 from './StudyAreasV1';
import StudyAreaDetail from './components/StudyAreaDetail'; // New component for each study area

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the new main page */}
        <Route path="/" element={<Home />} />

        {/* Route for the old study areas version 1 page */}
        <Route path="/study-areas--v01" element={<StudyAreasV1 />} />

        {/* Dynamic route for each study area using the alias */}
        <Route path="/study-area/:alias" element={<StudyAreaDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
