import React from 'react';
import Summarize1 from '../components/Blsummary';
import GenerateBlog from '../components/GenerateBlog';
import Navbar from '../components/Navbar'
import NoteBox from '../components/NoteBox';
import GenerateImage from '../components/GenerateImage';

const Aitest = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">AI-Powered Blog Features</h1>
      <div className="max-w-4xl mx-auto">
        <Summarize1 />
        <GenerateBlog />
        <GenerateImage/>
        <NoteBox/>
      </div>
    </div>
    </>
  );
};

export default Aitest;
