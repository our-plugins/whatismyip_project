import React from 'react';
import IPDisplay from './components/IPDisplay';
import LocationInfo from './components/LocationInfo';
import NetworkInfo from './components/NetworkInfo';
import Loading from './components/Loading';
import { useIPInfo } from './hooks/useIPInfo';

function App() {
  const { ipInfo, loading, error, refetch } = useIPInfo();

  if (loading) return <Loading />;
  
  if (error) return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-red-500 text-xl font-semibold mb-2">Error</h2>
        <p className="text-gray-600 dark:text-gray-300">{error}</p>
        <button 
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          IP Address Information
        </h1>
        
        {ipInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IPDisplay ip={ipInfo.ip} />
            <LocationInfo 
              country={ipInfo.country_name}
              region={ipInfo.region}
              city={ipInfo.city}
              latitude={ipInfo.latitude}
              longitude={ipInfo.longitude}
            />
            <NetworkInfo 
              isp={ipInfo.org}
              asn={ipInfo.asn}
              timezone={ipInfo.timezone}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;