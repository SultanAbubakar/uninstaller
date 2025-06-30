
import { App } from '@/pages/Index';
import { Checkbox } from '@/components/ui/checkbox';
import { formatBytes } from '@/lib/utils';

interface AppListProps {
  apps: App[];
  selectedApps: Set<string>;
  isSelectionMode: boolean;
  onAppSelect: (appId: string) => void;
  onLongPress: (appId: string) => void;
}

export const AppList = ({ 
  apps, 
  selectedApps, 
  isSelectionMode, 
  onAppSelect, 
  onLongPress 
}: AppListProps) => {
  const handleTouchStart = (appId: string) => {
    let pressTimer: NodeJS.Timeout;
    
    const startPress = () => {
      pressTimer = setTimeout(() => {
        onLongPress(appId);
      }, 500);
    };

    const endPress = () => {
      clearTimeout(pressTimer);
    };

    return { startPress, endPress };
  };

  return (
    <div className="px-4 pb-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {apps.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">📱</div>
            <p>No apps found</p>
          </div>
        ) : (
          apps.map((app) => {
            const { startPress, endPress } = handleTouchStart(app.id);
            const isSelected = selectedApps.has(app.id);
            
            return (
              <div
                key={app.id}
                className={`
                  flex items-center p-4 border-b border-gray-100 last:border-b-0 
                  cursor-pointer transition-colors duration-200
                  ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
                  ${app.isSystemApp ? 'opacity-75' : ''}
                `}
                onClick={() => onAppSelect(app.id)}
                onTouchStart={startPress}
                onTouchEnd={endPress}
                onMouseDown={startPress}
                onMouseUp={endPress}
                onMouseLeave={endPress}
              >
                {/* Selection Checkbox */}
                {isSelectionMode && (
                  <div className="mr-3">
                    <Checkbox
                      checked={isSelected}
                      readOnly
                      className="w-5 h-5"
                    />
                  </div>
                )}

                {/* App Icon */}
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-2xl">
                    {app.icon}
                  </div>
                </div>

                {/* App Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`
                      font-medium text-gray-900 truncate
                      ${app.isSystemApp ? 'text-gray-600' : ''}
                    `}>
                      {app.name}
                      {app.isSystemApp && (
                        <span className="ml-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                          System
                        </span>
                      )}
                    </h3>
                    <span className="text-sm text-gray-500 ml-2">
                      {app.size}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500 truncate">
                      v{app.version}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(app.installDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
