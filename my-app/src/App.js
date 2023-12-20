import React from 'react';
import MultiStepForm from './MultiStepForm';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <MultiStepForm />
      </div>
    </div>
  );
};

export default App;
