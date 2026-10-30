import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Buyer,
  CropActivity,
  FarmExpense,
  FarmField,
  FarmerNotification,
  FarmerProfile,
  HarvestBatch,
  InputShop,
  MarketPricePoint,
  SellingOptionComparison,
} from '../types';
import {
  INITIAL_ACTIVITIES,
  INITIAL_BUYERS,
  INITIAL_EXPENSES,
  INITIAL_FARMER_PROFILE,
  INITIAL_FIELDS,
  INITIAL_HARVEST_BATCHES,
  INITIAL_INPUT_SHOPS,
  INITIAL_MARKET_PRICES,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';
import { calculateBreakEven, calculateSellingComparisons } from '../utils/calculations';
import { api } from '../services/api';

export const DEFAULT_FARMER_PROFILE: FarmerProfile = {
  id: '',
  name: 'Farmer',
  nameMr: 'शेतकरी',
  mobile: '',
  village: '',
  district: 'Nashik',
  language: 'mr',
  primaryCrop: 'Grapes',
  totalAcres: 0,
  waterSource: '',
  soilType: '',
  memberSince: '2026',
};

interface FarmDataContextType {
  farmer: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  logout: () => void;
  fields: FarmField[];
  addField: (field: Omit<FarmField, 'id'>) => void;
  activities: CropActivity[];
  addActivity: (activity: Omit<CropActivity, 'id'>) => void;
  toggleActivityStatus: (id: string) => void;
  expenses: FarmExpense[];
  addExpense: (expense: Omit<FarmExpense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  harvestBatches: HarvestBatch[];
  addHarvestBatch: (batch: Omit<HarvestBatch, 'id'>) => void;
  buyers: Buyer[];
  marketPrices: MarketPricePoint[];
  inputShops: InputShop[];
  notifications: FarmerNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  refreshData: () => Promise<void>;
  // Computed stats
  totalCost: number;
  expectedYieldKg: number;
  expectedRevenue: number;
  estimatedProfit: number;
  profitMarginPercent: number;
  breakEvenPrice: number;
  bestBuyer: Buyer | undefined;
  sellingComparisons: SellingOptionComparison[];
}

const FarmDataContext = createContext<FarmDataContextType | undefined>(undefined);

export const FarmDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmer, setFarmer] = useState<FarmerProfile>(DEFAULT_FARMER_PROFILE);
  const [fields, setFields] = useState<FarmField[]>([]);
  const [activities, setActivities] = useState<CropActivity[]>([]);
  const [expenses, setExpenses] = useState<FarmExpense[]>([]);
  const [harvestBatches, setHarvestBatches] = useState<HarvestBatch[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [marketPrices, setMarketPrices] = useState<MarketPricePoint[]>([]);
  const [inputShops, setInputShops] = useState<InputShop[]>([]);
  const [notifications, setNotifications] = useState<FarmerNotification[]>([]);

  // Synchronize with Django database on mount and on authentication changes
  const loadBackendData = async (targetFarmerId?: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('sheetimitra_token') : null;
    const storedFarmerId = targetFarmerId || (typeof window !== 'undefined' ? localStorage.getItem('sheetimitra_farmer_id') : null);

    const [
      remoteFarmer,
      remoteFields,
      remoteActivities,
      remoteExpenses,
      remoteBatches,
      remoteBuyers,
      remotePrices,
      remoteShops,
      remoteNotifs,
    ] = await Promise.all([
      api.getCurrentFarmer(storedFarmerId || undefined),
      api.getFields(),
      api.getActivities(),
      api.getExpenses(),
      api.getHarvestBatches(),
      api.getBuyers(),
      api.getMarketPrices(),
      api.getInputShops(),
      api.getNotifications(),
    ]);

    if (remoteFarmer && remoteFarmer.id) {
      setFarmer(remoteFarmer);
      localStorage.setItem('sheetimitra_farmer_id', remoteFarmer.id);
    } else {
      setFarmer(DEFAULT_FARMER_PROFILE);
      if (typeof window !== 'undefined' && !token) {
        localStorage.removeItem('sheetimitra_farmer_id');
      }
    }

    // Strictly use live database records (no mock data fallback for user records)
    setFields(remoteFields || []);
    setActivities(remoteActivities || []);
    setExpenses(remoteExpenses || []);
    setHarvestBatches(remoteBatches || []);

    setBuyers(remoteBuyers && remoteBuyers.length > 0 ? remoteBuyers : INITIAL_BUYERS);
    setMarketPrices(remotePrices && remotePrices.length > 0 ? remotePrices : INITIAL_MARKET_PRICES);
    setInputShops(remoteShops && remoteShops.length > 0 ? remoteShops : INITIAL_INPUT_SHOPS);
    setNotifications(remoteNotifs && remoteNotifs.length > 0 ? remoteNotifs : INITIAL_NOTIFICATIONS);
  };

  useEffect(() => {
    loadBackendData();
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sheetimitra_token');
      localStorage.removeItem('sheetimitra_farmer_id');
    }
    setFarmer(DEFAULT_FARMER_PROFILE);
    setFields([]);
    setActivities([]);
    setExpenses([]);
    setHarvestBatches([]);
  };

  const updateFarmerProfile = (updates: Partial<FarmerProfile>) => {
    setFarmer((prev) => {
      const merged = { ...prev, ...updates };
      if (merged.id) {
        localStorage.setItem('sheetimitra_farmer_id', merged.id);
        api.updateFarmer(merged.id, updates);
      }
      return merged;
    });
    if (updates.id) {
      loadBackendData(updates.id);
    }
  };

  const addField = async (newField: Omit<FarmField, 'id'>) => {
    const tempId = `field-${Date.now()}`;
    const fieldObj = { ...newField, id: tempId };
    setFields((prev) => [...prev, fieldObj]);
    setFarmer((prev) => ({
      ...prev,
      totalAcres: parseFloat((prev.totalAcres + newField.acres).toFixed(1)),
    }));
    const created = await api.createField(fieldObj);
    if (created && created.id) {
      setFields((prev) => prev.map((f) => (f.id === tempId ? created : f)));
    }
  };

  const addActivity = async (newAct: Omit<CropActivity, 'id'>) => {
    const tempId = `act-${Date.now()}`;
    const actObj = { ...newAct, id: tempId };
    setActivities((prev) => [actObj, ...prev]);
    const created = await api.createActivity(actObj);
    if (created && created.id) {
      setActivities((prev) => prev.map((a) => (a.id === tempId ? created : a)));
    }
  };

  const toggleActivityStatus = async (id: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          const nextStatus = act.status === 'Completed' ? 'Upcoming' : 'Completed';
          return { ...act, status: nextStatus };
        }
        return act;
      })
    );
    api.toggleActivity(id);
  };

  const addExpense = async (newExp: Omit<FarmExpense, 'id'>) => {
    const tempId = `exp-${Date.now()}`;
    const expObj = { ...newExp, id: tempId };
    setExpenses((prev) => [expObj, ...prev]);
    const created = await api.createExpense(expObj);
    if (created && created.id) {
      setExpenses((prev) => prev.map((e) => (e.id === tempId ? created : e)));
    }
  };

  const deleteExpense = async (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    api.deleteExpense(id);
  };

  const addHarvestBatch = async (newBatch: Omit<HarvestBatch, 'id'>) => {
    const tempId = `batch-${Date.now()}`;
    const batchObj = { ...newBatch, id: tempId };
    setHarvestBatches((prev) => [batchObj, ...prev]);
    const created = await api.createHarvestBatch(batchObj);
    if (created && created.id) {
      setHarvestBatches((prev) => prev.map((b) => (b.id === tempId ? created : b)));
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    api.markNotificationRead(id);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    api.markAllNotificationsRead();
  };

  // Computed Financial Metrics
  const totalCost = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  const expectedYieldKg = useMemo(() => {
    const recordedHarvest = harvestBatches.reduce((sum, b) => sum + (b.quantityKg || 0), 0);
    if (recordedHarvest > 0) return recordedHarvest;
    const estimatedFromFields = fields.reduce((sum, f) => {
      const perAcreYield = f.crop === 'Pomegranate' ? 2500 : 3500;
      return sum + (f.acres * perAcreYield);
    }, 0);
    return estimatedFromFields > 0 ? estimatedFromFields : (farmer.totalAcres > 0 ? Math.round(farmer.totalAcres * 3500) : 0);
  }, [harvestBatches, fields, farmer.totalAcres]);

  const expectedRevenue = useMemo(() => {
    const recordedRevenue = harvestBatches.reduce((sum, b) => sum + (b.totalRevenue || 0), 0);
    if (recordedRevenue > 0) return recordedRevenue;
    const benchmarkPrice = marketPrices.length > 0 ? marketPrices[0].modalPrice : 100;
    return Math.round(expectedYieldKg * benchmarkPrice);
  }, [harvestBatches, expectedYieldKg, marketPrices]);

  const estimatedProfit = expectedRevenue - totalCost;
  const profitMarginPercent = expectedRevenue > 0 ? parseFloat(((estimatedProfit / expectedRevenue) * 100).toFixed(1)) : 0;
  const breakEvenPrice = expectedYieldKg > 0 ? calculateBreakEven(totalCost, expectedYieldKg) : 0;

  const bestBuyer = useMemo(() => {
    if (!buyers || buyers.length === 0) return undefined;
    return [...buyers].sort((a, b) => b.offerPricePerKg - a.offerPricePerKg)[0];
  }, [buyers]);

  const sellingComparisons = useMemo(() => {
    const marketPrice = marketPrices.length > 0 ? marketPrices[0].modalPrice : 0;
    return calculateSellingComparisons(buyers, expectedYieldKg, totalCost, marketPrice);
  }, [buyers, expectedYieldKg, totalCost, marketPrices]);

  return (
    <FarmDataContext.Provider
      value={{
        farmer,
        updateFarmerProfile,
        logout,
        fields,
        addField,
        activities,
        addActivity,
        toggleActivityStatus,
        expenses,
        addExpense,
        deleteExpense,
        harvestBatches,
        addHarvestBatch,
        buyers,
        marketPrices,
        inputShops,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        refreshData: () => loadBackendData(),
        totalCost,
        expectedYieldKg,
        expectedRevenue,
        estimatedProfit,
        profitMarginPercent,
        breakEvenPrice,
        bestBuyer,
        sellingComparisons,
      }}
    >
      {children}
    </FarmDataContext.Provider>
  );
};

export const useFarmData = () => {
  const context = useContext(FarmDataContext);
  if (!context) {
    throw new Error('useFarmData must be used within a FarmDataProvider');
  }
  return context;
};
