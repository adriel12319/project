import React from 'react';

export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-gray-600 mb-4">
        This is another statically rendered page. The content here will be available
        immediately when requested through Postman or any other HTTP client.
      </p>
    </div>
  );
}