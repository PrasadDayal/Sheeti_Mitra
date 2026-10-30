import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { MobileBottomNav } from './MobileBottomNav';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Default open on wide desktop screens (>= 1024px)
    return window.innerWidth >= 1024;
  });

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-950">
      {/* Desktop & Mobile Sidebar */}
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Shell (Header + Page Content): Shifts smoothly by sidebar width on desktop */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out min-w-0 ${
          sidebarOpen ? 'lg:pl-72' : 'lg:pl-0'
        }`}
      >
        <AppHeader onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        {/* Page Content: Never goes behind the menu */}
        <main className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-12">
          <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-7">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sticky Navigation */}
      <MobileBottomNav />
    </div>
  );
};
