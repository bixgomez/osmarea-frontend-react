import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudyAreasV1 from './StudyAreasV1'; // Import your old App.js as StudyAreasV1

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the new main page */}
        <Route path="/" element={<Home />} />

        {/* Route for the old study areas version 1 page */}
        <Route path="/study-areas--v01" element={<StudyAreasV1 />} />
      </Routes>
    </Router>
  );
};

export default App;
