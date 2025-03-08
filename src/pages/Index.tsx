
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index: React.FC = () => {
  // Redirect to the learning page
  return <Navigate to="/learning" replace />;
};

export default Index;
