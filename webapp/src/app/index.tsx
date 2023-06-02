import React from 'react';
import Assessment from '../assessment';

function App() {
  return (
    <div className="m-0 surface-50 min-h-screen ">
      <div className="flex flex-column p-2 xl:w-8 lg:w-10 md:w-12 m-auto">
        <h1 className="ml-2 text-900 font-medium">Blueprint Healthcare</h1>
        <Assessment />
      </div>
    </div>
  );
}

export default App;
