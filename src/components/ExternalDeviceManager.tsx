import React, { useState } from 'react';
import { Smartphone, Watch, Wifi, Battery, Bluetooth } from 'lucide-react';
import { ExternalDevice } from '../types';

interface ExternalDeviceManagerProps {
  devices: ExternalDevice[];
  onConnect: (deviceId: string) => void;
  onDisconnect: (deviceId: string) => void;
}

export const ExternalDeviceManager: React.FC<ExternalDeviceManagerProps> = ({
  devices,
  onConnect,
  onDisconnect,
}) => {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 5000);
  };

  const getDeviceIcon = (type: ExternalDevice['type']) => {
    switch (type) {
      case 'watch':
        return <Watch className="w-5 h-5" />;
      case 'hearingAid':
        return <Wifi className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bluetooth className="w-5 h-5 text-navy-600" />
          <h3 className="text-lg font-semibold text-navy-900">External Devices</h3>
        </div>
        <button
          onClick={startScan}
          disabled={isScanning}
          className="px-4 py-2 bg-navy-500 text-white rounded-lg disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Scan for Devices'}
        </button>
      </div>

      <div className="space-y-3">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getDeviceIcon(device.type)}
              <div>
                <p className="font-medium">{device.name}</p>
                <p className="text-sm text-gray-500">
                  Last synced: {new Date(device.lastSync).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {device.batteryLevel !== undefined && (
                <div className="flex items-center gap-1 text-sm">
                  <Battery className="w-4 h-4" />
                  {device.batteryLevel}%
                </div>
              )}
              <button
                onClick={() => device.status === 'connected' 
                  ? onDisconnect(device.id)
                  : onConnect(device.id)
                }
                className={`px-3 py-1 rounded-lg ${
                  device.status === 'connected'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-navy-100 text-navy-600'
                }`}
              >
                {device.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};