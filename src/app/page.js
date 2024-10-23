"use client"
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const fetchSystemInfo = async () => {
    try {
      const res = await fetch('/api/system'); // Fetch system info without PC selection
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      setSystemInfo(data);
    } catch (err) {
      console.error('Error fetching system info:', err);
      setError('Unable to fetch system data. Check the console for more details.');
    }
  };

  const updateCurrentTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    setCurrentTime(now.toLocaleTimeString([], options));
  };

  useEffect(() => {
    fetchSystemInfo(); // Fetch system data once on load
    updateCurrentTime(); // Set the initial time
    const timeInterval = setInterval(updateCurrentTime, 1000); // Update every second

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!systemInfo) return <div className="text-center">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">PC Status Dashboard</h1>

        {/* Current Time Display */}
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Current Time: {currentTime}
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-800">Username:</h2>
            <p className="text-gray-600">{systemInfo.username || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-800">CPU Cores:</h2>
            <p className="text-gray-600">{systemInfo.cpuCores}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-800">CPU Usage:</h2>
            <p className="text-gray-600">{systemInfo.cpuUsage}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-800">Total RAM:</h2>
            <p className="text-gray-600">{systemInfo.totalRam}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-800">Used RAM:</h2>
            <p className="text-gray-600">{systemInfo.usedRam}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-800">Free RAM:</h2>
            <p className="text-gray-600">{systemInfo.freeRam}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-800">Disk Total:</h2>
            <p className="text-gray-600">{systemInfo.diskTotal}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-800">Disk Used:</h2>
            <p className="text-gray-600">{systemInfo.diskUsed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
