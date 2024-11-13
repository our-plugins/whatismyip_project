import React from 'react';
import { ServerIcon } from '@heroicons/react/24/outline';

const NetworkInfo = ({ isp, asn, timezone }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:col-span-2">
      <div className="flex items-center space-x-4 mb-4">
        <ServerIcon className="h-8 w-8 text-purple-500" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Network Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">ISP:</span> {isp}
          </p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">ASN:</span> {asn}
          </p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Timezone:</span> {timezone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetworkInfo;