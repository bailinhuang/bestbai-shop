import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>Ooops! You just got 404'd. Page Not Found</h1>
      <Link to="/">You might as well go back to Home</Link>
    </div>
  );
}
