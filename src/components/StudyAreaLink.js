import React from 'react';
import { Link } from 'react-router-dom';

const StudyAreaLink = ({ area }) => {
  return (
    <li key={area.id}>
      <Link
        to={`/study-area/${area.attributes.path.alias.replace(/^\/+/, '')}`}
        state={{ uuid: area.id }} // Pass the UUID in state
      >
        {area.attributes.title}
      </Link>
    </li>
  );
};

export default StudyAreaLink;
