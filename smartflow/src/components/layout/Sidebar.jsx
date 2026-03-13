import React from 'react';

const Sidebar = () => {
    return (
        <aside className="w-64 fixed inset-y-0 left-0 bg-gradient-to-b from-[#1a0533] to-[#2d1060] text-white flex flex-col shadow-2xl z-50">
            {/* Brand Logo */}
            <div className="h-20 flex items-center px-8 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#e91e8c] to-[#7c3aed] flex items-center justify-center shadow-lg mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight">FlowPilot</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                <a href="#" className="flex items-center px-4 py-3 bg-gradient-to-r from-[#e91e8c] to-[#c2185b] rounded-xl text-white font-medium shadow-md shadow-[#e91e8c]/20 transition-all">
                    <svg className="w-5 h-5 mr-3 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    Analytics
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group">
                    <svg className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    Workflows
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group">
                    <svg className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    History
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group">
                    <svg className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Settings
                </a>
            </nav>

            {/* Bottom User Area */}
            <div className="p-4 border-t border-white/10 m-4 rounded-xl bg-white/5 backdrop-blur-sm flex items-center space-x-3 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#f59e0b] flex items-center justify-center text-white font-bold text-sm shadow-md">
                    AD
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">Admin User</span>
                    <span className="text-xs text-white/60">Pro Plan</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
