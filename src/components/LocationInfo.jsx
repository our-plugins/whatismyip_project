import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

const LocationInfo = ({ country, region, city, latitude, longitude }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <MapPinIcon className="h-8 w-8 text-green-500" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Location Information</h2>
      </div>
      
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Country:</span> {country}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Region:</span> {region}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">City:</span> {city}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Coordinates:</span> {latitude}, {longitude}
        </p>
      </div>
    </div>
  );
};

export default LocationInfo;