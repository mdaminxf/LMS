'use client';

const OFFLINE_STORAGE_KEY = 'sap_offline_data';

export interface OfflineData {
  activities: any[];
  notifications: any[];
  lastSync: string;
}

export class OfflineService {
  static saveOfflineData(data: Partial<OfflineData>): void {
    if (typeof window !== 'undefined') {
      const existing = this.getOfflineData();
      const updated = { ...existing, ...data, lastSync: new Date().toISOString() };
      localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(updated));
    }
  }

  static getOfflineData(): OfflineData {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(OFFLINE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : { activities: [], notifications: [], lastSync: '' };
    }
    return { activities: [], notifications: [], lastSync: '' };
  }

  static isOnline(): boolean {
    if (typeof navigator !== 'undefined') {
      return navigator.onLine;
    }
    return true;
  }

  static async syncData(): Promise<boolean> {
    if (!this.isOnline()) {
      return false;
    }

    try {
      const offlineData = this.getOfflineData();
      
      // In a real app, this would sync with the actual backend
      if (offlineData.activities.length > 0) {
        await fetch('/api/activities/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activities: offlineData.activities })
        });
      }

      // Clear offline data after successful sync
      localStorage.removeItem(OFFLINE_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Sync failed:', error);
      return false;
    }
  }
}

export function useOffline() {
  return {
    saveOfflineData: OfflineService.saveOfflineData,
    getOfflineData: OfflineService.getOfflineData,
    isOnline: OfflineService.isOnline,
    syncData: OfflineService.syncData
  };
}