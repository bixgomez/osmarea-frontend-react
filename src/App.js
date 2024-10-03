import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudyAreaDetail from './components/StudyAreaDetail'; // New component for each study area

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the new main page */}
        <Route path="/" element={<Home />} />

        {/* Dynamic route for each study area using the alias */}
        <Route path="/study-area/:alias" element={<StudyAreaDetail />} />

      </Routes>
    </Router>
  );
};

export default App;
