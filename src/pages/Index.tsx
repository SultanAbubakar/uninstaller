
import { useState, useEffect } from 'react';
import { Search, Menu, Trash2, Settings, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppList } from '@/components/AppList';
import { AppInfo } from '@/components/AppInfo';
import { SettingsModal } from '@/components/SettingsModal';
import { BatchActions } from '@/components/BatchActions';
import { MemoryStatus } from '@/components/MemoryStatus';
import { useToast } from '@/hooks/use-toast';

export interface App {
  id: string;
  name: string;
  packageName: string;
  version: string;
  size: string;
  installDate: string;
  icon: string;
  isSystemApp: boolean;
}

const Index = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [filteredApps, setFilteredApps] = useState<App[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set());
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockApps: App[] = [
      {
        id: '1',
        name: 'WhatsApp',
        packageName: 'com.whatsapp',
        version: '2.23.24.14',
        size: '95.2 MB',
        installDate: '2024-01-15',
        icon: '💬',
        isSystemApp: false
      },
      {
        id: '2',
        name: 'Instagram',
        packageName: 'com.instagram.android',
        version: '312.0.0.44',
        size: '180.5 MB',
        installDate: '2024-02-10',
        icon: '📷',
        isSystemApp: false
      },
      {
        id: '3',
        name: 'Spotify',
        packageName: 'com.spotify.music',
        version: '8.8.96.345',
        size: '145.3 MB',
        installDate: '2024-01-05',
        icon: '🎵',
        isSystemApp: false
      },
      {
        id: '4',
        name: 'Chrome',
        packageName: 'com.android.chrome',
        version: '120.0.6099.193',
        size: '234.7 MB',
        installDate: '2023-12-01',
        icon: '🌐',
        isSystemApp: true
      },
      {
        id: '5',
        name: 'TikTok',
        packageName: 'com.zhiliaoapp.musically',
        version: '32.7.4',
        size: '156.8 MB',
        installDate: '2024-03-20',
        icon: '🎬',
        isSystemApp: false
      },
      {
        id: '6',
        name: 'Telegram',
        packageName: 'org.telegram.messenger',
        version: '10.2.5',
        size: '78.9 MB',
        installDate: '2024-01-20',
        icon: '✈️',
        isSystemApp: false
      },
      {
        id: '7',
        name: 'YouTube',
        packageName: 'com.google.android.youtube',
        version: '18.45.43',
        size: '167.4 MB',
        installDate: '2023-11-15',
        icon: '📺',
        isSystemApp: false
      },
      {
        id: '8',
        name: 'Netflix',
        packageName: 'com.netflix.mediaclient',
        version: '8.86.1',
        size: '298.1 MB',
        installDate: '2024-02-25',
        icon: '🎭',
        isSystemApp: false
      }
    ];
    setApps(mockApps);
    setFilteredApps(mockApps);
  }, []);

  // Filter and sort apps
  useEffect(() => {
    let filtered = apps.filter(app =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort apps
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          const sizeA = parseFloat(a.size.replace(/[^\d.]/g, ''));
          const sizeB = parseFloat(b.size.replace(/[^\d.]/g, ''));
          comparison = sizeA - sizeB;
          break;
        case 'date':
          comparison = new Date(a.installDate).getTime() - new Date(b.installDate).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredApps(filtered);
  }, [apps, searchQuery, sortBy, sortOrder]);

  const handleAppSelect = (appId: string) => {
    if (isSelectionMode) {
      const newSelected = new Set(selectedApps);
      if (newSelected.has(appId)) {
        newSelected.delete(appId);
      } else {
        newSelected.add(appId);
      }
      setSelectedApps(newSelected);
      
      if (newSelected.size === 0) {
        setIsSelectionMode(false);
      }
    } else {
      const app = apps.find(a => a.id === appId);
      if (app) {
        setSelectedApp(app);
      }
    }
  };

  const handleLongPress = (appId: string) => {
    setIsSelectionMode(true);
    setSelectedApps(new Set([appId]));
  };

  const handleUninstall = (appId: string) => {
    const app = apps.find(a => a.id === appId);
    if (app?.isSystemApp) {
      toast({
        title: "Cannot uninstall system app",
        description: `${app.name} is a system app and cannot be uninstalled.`,
        variant: "destructive"
      });
      return;
    }

    setApps(prev => prev.filter(a => a.id !== appId));
    setSelectedApp(null);
    
    toast({
      title: "App uninstalled",
      description: `${app?.name} has been successfully uninstalled.`,
    });
  };

  const handleBatchUninstall = () => {
    const appsToUninstall = apps.filter(app => 
      selectedApps.has(app.id) && !app.isSystemApp
    );
    
    const systemApps = apps.filter(app => 
      selectedApps.has(app.id) && app.isSystemApp
    );

    if (systemApps.length > 0) {
      toast({
        title: "Some apps cannot be uninstalled",
        description: `${systemApps.length} system app(s) cannot be uninstalled.`,
        variant: "destructive"
      });
    }

    if (appsToUninstall.length > 0) {
      setApps(prev => prev.filter(app => !selectedApps.has(app.id) || app.isSystemApp));
      toast({
        title: "Apps uninstalled",
        description: `${appsToUninstall.length} app(s) have been successfully uninstalled.`,
      });
    }

    setSelectedApps(new Set());
    setIsSelectionMode(false);
  };

  const exitSelectionMode = () => {
    setSelectedApps(new Set());
    setIsSelectionMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Easy Uninstaller</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="text-gray-600"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Memory Status */}
          <MemoryStatus />

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Sort Options */}
          <div className="flex space-x-2 mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'size' | 'date')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
              <option value="date">Sort by Date</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="text-xs"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </div>

      {/* Batch Actions */}
      {isSelectionMode && (
        <BatchActions
          selectedCount={selectedApps.size}
          onUninstall={handleBatchUninstall}
          onCancel={exitSelectionMode}
        />
      )}

      {/* App List */}
      <div className="max-w-md mx-auto">
        <AppList
          apps={filteredApps}
          selectedApps={selectedApps}
          isSelectionMode={isSelectionMode}
          onAppSelect={handleAppSelect}
          onLongPress={handleLongPress}
        />
      </div>

      {/* App Info Modal */}
      {selectedApp && (
        <AppInfo
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onUninstall={handleUninstall}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={setSortBy}
          onSortOrderChange={setSortOrder}
        />
      )}
    </div>
  );
};

export default Index;
