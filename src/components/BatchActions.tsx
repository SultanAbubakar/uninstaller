
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';

interface BatchActionsProps {
  selectedCount: number;
  onUninstall: () => void;
  onCancel: () => void;
}

export const BatchActions = ({ selectedCount, onUninstall, onCancel }: BatchActionsProps) => {
  return (
    <div className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-white hover:bg-blue-700 p-1"
            >
              <X className="w-5 h-5" />
            </Button>
            <span className="font-medium">
              {selectedCount} app{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            onClick={onUninstall}
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Uninstall
          </Button>
        </div>
      </div>
    </div>
  );
};
