import React from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const IPDisplay = ({ ip }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4">
        <GlobeAltIcon className="h-8 w-8 text-blue-500" />
        <div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Your IP Address</h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{ip}</p>
        </div>
      </div>
    </div>
  );
};

export default IPDisplay;