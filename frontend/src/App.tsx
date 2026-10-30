import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { FarmDataProvider } from './context/FarmDataContext';
import { AppLayout } from './components/layout/AppLayout';
import { PrivateRoute } from './components/common/PrivateRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { FarmProfile } from './pages/FarmProfile';
import { CropActivities } from './pages/CropActivities';
import { Expenses } from './pages/Expenses';
import { Harvest } from './pages/Harvest';
import { InputIntelligence } from './pages/InputIntelligence';
import { MarketIntelligence } from './pages/MarketIntelligence';
import { BuyerIntelligence } from './pages/BuyerIntelligence';
import { BuyerDetail } from './pages/BuyerDetail';
import { SellingDecision } from './pages/SellingDecision';
import { TrueCropProfit } from './pages/TrueCropProfit';
import { AIAssistant } from './pages/AIAssistant';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { EquipmentStore } from './pages/EquipmentStore';

export function App() {
  return (
    <LanguageProvider>
      <FarmDataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Authenticated SaaS App Routes protected by PrivateRoute */}
            <Route element={<PrivateRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/farm" element={<FarmProfile />} />
                <Route path="/crop-activities" element={<CropActivities />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/harvest" element={<Harvest />} />
                <Route path="/inputs" element={<InputIntelligence />} />
                <Route path="/equipment" element={<EquipmentStore />} />
                <Route path="/market" element={<MarketIntelligence />} />
                <Route path="/buyers" element={<BuyerIntelligence />} />
                <Route path="/buyer/:id" element={<BuyerDetail />} />
                <Route path="/selling-decision" element={<SellingDecision />} />
                <Route path="/profit" element={<TrueCropProfit />} />
                <Route path="/assistant" element={<AIAssistant />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </FarmDataProvider>
    </LanguageProvider>
  );
}

export default App;
