import React from 'react';

const Navbar = () => {
    return (
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Dashboard Title */}
            <h1 className="text-2xl font-black text-gray-800 tracking-tight flex-shrink-0 whitespace-nowrap">Analytics Overview</h1>

            {/* Center Tabs */}
            <div className="hidden lg:flex bg-white/80 backdrop-blur-sm p-1.5 rounded-xl shadow-sm border border-gray-100 flex-shrink-0 mx-4">
                {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                            tab === 'Monthly' 
                                ? 'bg-gradient-to-r from-[#e91e8c] to-[#7c3aed] text-white shadow-md' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4 flex-shrink-0">
                <button className="relative p-2.5 text-gray-400 hover:text-gray-600 bg-white rounded-full shadow-sm border border-gray-100 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#ff6b35] rounded-full border border-white"></span>
                </button>
                <button className="px-5 py-2.5 bg-white text-[#7c3aed] border border-[#7c3aed]/20 font-bold text-sm rounded-xl shadow-sm hover:shadow-md hover:bg-[#7c3aed]/5 transition-all">
                    Export Report
                </button>
            </div>
        </header>
    );
};

export default Navbar;
