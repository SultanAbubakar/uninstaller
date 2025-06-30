
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X, Bell, Moon, Palette } from 'lucide-react';
import { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
  sortBy: 'name' | 'size' | 'date';
  sortOrder: 'asc' | 'desc';
  onSortChange: (sort: 'name' | 'size' | 'date') => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

export const SettingsModal = ({ 
  onClose, 
  sortBy, 
  sortOrder, 
  onSortChange, 
  onSortOrderChange 
}: SettingsModalProps) => {
  const [quickAccessEnabled, setQuickAccessEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6">
          {/* Sorting Preferences */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Sorting</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value as 'name' | 'size' | 'date')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">App Name</option>
                  <option value="size">App Size</option>
                  <option value="date">Install Date</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Order</label>
                <select
                  value={sortOrder}
                  onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Quick Access</p>
                <p className="text-xs text-gray-500">Show persistent notification</p>
              </div>
            </div>
            <Switch
              checked={quickAccessEnabled}
              onCheckedChange={setQuickAccessEnabled}
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Notifications</p>
                <p className="text-xs text-gray-500">App uninstall confirmations</p>
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                <p className="text-xs text-gray-500">Enable dark theme</p>
              </div>
            </div>
            <Switch
              checked={darkModeEnabled}
              onCheckedChange={setDarkModeEnabled}
            />
          </div>

          {/* App Info */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">EU</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Easy Uninstaller</p>
                <p className="text-xs text-gray-500">Version 1.0.0</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Safely remove apps from your device with ease. Built with Material Design principles.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
          <Button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
