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
} from '../types';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.port !== '5173' && window.location.port !== '8000'
    ? 'http://127.0.0.1:8000/api'
    : '/api');

async function request<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('sheetimitra_token') : null;
    const farmerId = typeof window !== 'undefined' ? localStorage.getItem('sheetimitra_farmer_id') : null;

    const authHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      authHeaders['Authorization'] = `Bearer ${token}`;
    }
    if (farmerId) {
      authHeaders['X-Farmer-Id'] = farmerId;
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        ...authHeaders,
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      const errMsg = errorBody?.error || `API error (${res.status})`;
      if (res.status === 401 && !endpoint.includes('/auth/')) {
        localStorage.removeItem('sheetimitra_token');
      }
      if (endpoint.includes('/auth/')) {
        throw new Error(errMsg);
      }
      console.warn(`[API] ${endpoint} returned status ${res.status}: ${errMsg}`);
      return null;
    }

    const data = await res.json();
    if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as { results: unknown[] }).results)) {
      return (data as { results: T }).results;
    }
    return data as T;
  } catch (err) {
    if (endpoint.includes('/auth/')) {
      throw err;
    }
    console.warn(`[API] Network error requesting ${endpoint}`, err);
    return null;
  }
}

export const api = {
  // Farmer
  getCurrentFarmer: (idOrMobile?: string) => {
    const q = idOrMobile ? `?id=${encodeURIComponent(idOrMobile)}` : '';
    return request<FarmerProfile>(`/farmers/current/${q}`);
  },
  updateFarmer: (id: string, data: Partial<FarmerProfile>) =>
    request<FarmerProfile>(`/farmers/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Fields
  getFields: () => request<FarmField[]>('/fields/'),
  createField: (data: Omit<FarmField, 'id'>) =>
    request<FarmField>('/fields/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Activities
  getActivities: () => request<CropActivity[]>('/activities/'),
  createActivity: (data: Omit<CropActivity, 'id'>) =>
    request<CropActivity>('/activities/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  toggleActivity: (id: string) =>
    request<CropActivity>(`/activities/${id}/toggle/`, {
      method: 'POST',
    }),

  // Expenses
  getExpenses: () => request<FarmExpense[]>('/expenses/'),
  createExpense: (data: Omit<FarmExpense, 'id'>) =>
    request<FarmExpense>('/expenses/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  deleteExpense: (id: string) =>
    request<{ status: string }>(`/expenses/${id}/`, {
      method: 'DELETE',
    }),

  // Harvest Batches
  getHarvestBatches: () => request<HarvestBatch[]>('/harvest/'),
  createHarvestBatch: (data: Omit<HarvestBatch, 'id'>) =>
    request<HarvestBatch>('/harvest/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Buyers & Market
  getBuyers: (crop?: string, district?: string) => {
    const params = new URLSearchParams();
    if (crop) params.append('crop', crop);
    if (district) params.append('district', district);
    const query = params.toString() ? `?${params.toString()}` : '';
    return request<Buyer[]>(`/buyers/${query}`);
  },
  getMarketPrices: (crop?: string, district?: string) => {
    const params = new URLSearchParams();
    if (crop) params.append('crop', crop);
    if (district) params.append('district', district);
    const query = params.toString() ? `?${params.toString()}` : '';
    return request<MarketPricePoint[]>(`/market-prices/${query}`);
  },

  // Input Shops & Notifications
  getInputShops: () => request<InputShop[]>('/input-shops/'),
  getNotifications: () => request<FarmerNotification[]>('/notifications/'),
  markNotificationRead: (id: string) =>
    request<FarmerNotification>(`/notifications/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ read: true }),
    }),
  markAllNotificationsRead: () =>
    request<{ status: string }>('/notifications/mark_all_read/', {
      method: 'POST',
    }),

  // AI Services
  sendAIChat: async (prompt: string, language: string = 'mr') => {
    const res = await request<{ reply: string }>('/ai/chat/', {
      method: 'POST',
      body: JSON.stringify({ prompt, language }),
    });
    return res?.reply;
  },
  generateNegotiation: async (
    buyerName: string,
    offerPrice: number,
    mandiPrice: number,
    crop: string,
    language: string = 'mr'
  ) => {
    const res = await request<{ message: string }>('/ai/negotiate/', {
      method: 'POST',
      body: JSON.stringify({ buyerName, offerPrice, mandiPrice, crop, language }),
    });
    return res?.message;
  },
  // Auth Services
  login: (mobile: string, otp: string) =>
    request<{ token: string; farmer: FarmerProfile }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ mobile, otp }),
    }),
  loginWithPassword: (mobile: string, password: string) =>
    request<{ token: string; farmer: FarmerProfile }>('/auth/login-password/', {
      method: 'POST',
      body: JSON.stringify({ mobile, password }),
    }),
  register: (data: Record<string, unknown>) =>
    request<{ token: string; farmer: FarmerProfile }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  forgotPassword: (mobile: string, otp?: string, newPassword?: string) =>
    request<{ success: boolean; message: string; token?: string; farmer?: FarmerProfile }>('/auth/forgot-password/', {
      method: 'POST',
      body: JSON.stringify({ mobile, otp, new_password: newPassword }),
    }),

  // Free Weather & Live Mandi Sync
  getWeather: (district: string = 'Nashik') =>
    request<{
      district: string;
      temperature: number;
      windSpeedKmH: number;
      isSpraySuitable: boolean;
      sprayRecommendation: string;
    }>(`/weather/?district=${encodeURIComponent(district)}`),
  syncLiveMandiPrices: () =>
    request<{ status: string; count: number; marketPrices: MarketPricePoint[] }>(
      '/market-prices/sync_live/',
      { method: 'POST' }
    ),
};
