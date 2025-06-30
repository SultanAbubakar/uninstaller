
import { App } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { X, Trash2, ExternalLink, Share, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AppInfoProps {
  app: App;
  onClose: () => void;
  onUninstall: (appId: string) => void;
}

export const AppInfo = ({ app, onClose, onUninstall }: AppInfoProps) => {
  const { toast } = useToast();

  const handlePlayStoreOpen = () => {
    toast({
      title: "Opening Play Store",
      description: `Opening ${app.name} in Google Play Store`,
    });
  };

  const handleCreateShortcut = () => {
    toast({
      title: "Shortcut created",
      description: `Shortcut for ${app.name} added to home screen`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-md mx-4 mb-0 animate-in slide-in-from-bottom-2 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">App Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* App Info */}
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-3xl mr-4">
              {app.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {app.name}
              </h3>
              <p className="text-sm text-gray-500">
                {app.packageName}
              </p>
            </div>
          </div>

          {/* App Details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">{app.version}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Size</span>
              <span className="font-medium">{app.size}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Install Date</span>
              <span className="font-medium">
                {new Date(app.installDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Type</span>
              <span className={`font-medium ${app.isSystemApp ? 'text-amber-600' : 'text-green-600'}`}>
                {app.isSystemApp ? 'System App' : 'User App'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => onUninstall(app.id)}
              disabled={app.isSystemApp}
              className={`
                w-full flex items-center justify-center space-x-2
                ${app.isSystemApp 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
                }
              `}
            >
              <Trash2 className="w-4 h-4" />
              <span>
                {app.isSystemApp ? 'Cannot Uninstall System App' : 'Uninstall'}
              </span>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handlePlayStoreOpen}
                className="flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Play Store</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleCreateShortcut}
                className="flex items-center justify-center space-x-2"
              >
                <Share className="w-4 h-4" />
                <span>Shortcut</span>
              </Button>
            </div>
          </div>

          {app.isSystemApp && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-amber-600" />
                <p className="text-sm text-amber-800">
                  System apps cannot be uninstalled as they are essential for your device to function properly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
