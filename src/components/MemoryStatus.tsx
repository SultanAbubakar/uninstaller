
import { HardDrive } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const MemoryStatus = () => {
  // Mock memory data
  const totalStorage = 128; // GB
  const usedStorage = 89; // GB
  const freeStorage = totalStorage - usedStorage;
  const usedPercentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <HardDrive className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Storage</span>
        </div>
        <span className="text-sm text-gray-600">
          {freeStorage} GB free of {totalStorage} GB
        </span>
      </div>
      <Progress 
        value={usedPercentage} 
        className="h-2"
      />
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Used: {usedStorage} GB</span>
        <span>{usedPercentage.toFixed(1)}% full</span>
      </div>
    </div>
  );
};
