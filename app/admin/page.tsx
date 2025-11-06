"use client";

import { Users, Activity, Coins, TrendingUp, Zap, Calendar, CreditCard, LogOut } from 'lucide-react';

function Sidebar() {
  return (
    <div
      className="w-64 text-[#AD49E1] shadow-2xl h-screen relative flex flex-col justify-between"
      style={{
        background: '#FFFFFF',
        boxShadow: '4px 0 20px rgba(173, 73, 225, 0.15)',
      }}
    >
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#AD49E1]/10 flex items-center justify-center backdrop-blur-sm"></div>
            <div>
              <h2 className="font-semibold text-lg">Instavizz</h2>
              <p className="text-xs text-[#AD49E1]/70">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {[
            { icon: Users, label: 'User Management' },
            { icon: Activity, label: 'Activities' },
            { icon: Coins, label: 'Tokens' },
            { icon: TrendingUp, label: 'Insights' },
            { icon: Zap, label: 'Actions' },
            { icon: Calendar, label: 'Plans' },
            { icon: CreditCard, label: 'Payments' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="group w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-[#AD49E1] hover:text-white hover:shadow-lg backdrop-blur-sm"
            >
              <Icon size={20} className="transition-colors duration-200 group-hover:text-white" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Section (Logout Styled Like Others) */}
      <div className="border-t border-[#AD49E1]/10 bg-[#AD49E1]/5 p-4">
        <button
          className="group w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-[#AD49E1] hover:text-white hover:shadow-lg backdrop-blur-sm"
        >
          <LogOut size={20} className="transition-colors duration-200 group-hover:text-white" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
