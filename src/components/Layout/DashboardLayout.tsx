import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-64 lg:w-72 flex-shrink-0 hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar Overlay - TODO: Implement mobile menu */}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};