import React from 'react';
import { Plus, Filter, LayoutGrid, List, Sparkles, TrendingUp, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import WorkflowList from '../components/dashboard/WorkflowList';
import useWorkflows from '../hooks/useWorkflows';

const DashboardPage = () => {
    const { workflows, loading, createWorkflow, deleteWorkflow } = useWorkflows();

    const handleCreateNew = async () => {
        const newWorkflow = {
            name: "New Automation Workflow",
            status: "Active",
            lastRun: null,
            nodes: [],
            edges: []
        };
        await createWorkflow(newWorkflow);
    };

    const showcaseWorkflows = [
        {
            id: 'sc-1',
            name: "GitHub Auto-Reviewer 🤖",
            status: "active",
            lastRun: "2 mins ago",
            isTemplate: true,
            nodes: [1, 2, 3, 4],
            edges: [1, 2, 3],
            emoji: "🤖",
            description: "Auto-reviews PRs with AI-powered code analysis"
        },
        {
            id: 'sc-2',
            name: "Discord Notification Bot 🔔",
            status: "active",
            lastRun: "1 hour ago",
            isTemplate: true,
            nodes: [1, 2, 3],
            edges: [1, 2],
            emoji: "🔔",
            description: "Sends alerts to your Discord server instantly"
        },
        {
            id: 'sc-3',
            name: "TikTok Content Pipeline 🎬",
            status: "active",
            lastRun: "5 mins ago",
            isTemplate: true,
            nodes: [1, 2, 3, 4, 5],
            edges: [1, 2, 3, 4],
            emoji: "🎬",
            description: "Auto-schedules and cross-posts your content"
        },
        {
            id: 'sc-4',
            name: "Spotify Mood Playlist ✨",
            status: "paused",
            lastRun: "30 mins ago",
            isTemplate: true,
            nodes: [1, 2, 3],
            edges: [1, 2],
            emoji: "✨",
            description: "Creates playlists based on your vibe"
        }
    ];

    const stats = [
        { label: "Total Runs", value: "2,847", change: "+12%", icon: Activity, color: "from-primary-brand to-amber-400" },
        { label: "Active Flows", value: "14", change: "+3", icon: Zap, color: "from-amber-400 to-primary-brand" },
        { label: "Time Saved", value: "48h", change: "this week", icon: TrendingUp, color: "from-primary-brand to-yellow-400" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            {/* Hero Section — Gen Z Vibe */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 p-8 md:p-12 text-white shadow-2xl"
            >
                {/* Animated gradient blobs */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary-brand/20 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-brand text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md border border-white/10"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Live & Automating
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]"
                        >
                            Your Flows <br />
                            <span className="text-gradient-genz">Hit Different</span>{' '}
                            <span className="animate-emoji-bounce inline-block">🚀</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-400 text-lg mb-8 max-w-lg font-medium"
                        >
                            No cap — automate literally everything. Build flows that are lowkey genius. 
                            <span className="text-primary-brand font-semibold"> 2,000+ builders</span> already vibing with us.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-4 justify-center md:justify-start"
                        >
                            <button 
                                onClick={handleCreateNew}
                                className="group px-8 py-4 bg-primary-brand text-gray-900 font-black rounded-2xl shadow-[0_10px_30px_rgba(245,197,24,0.4)] hover:shadow-[0_15px_40px_rgba(245,197,24,0.5)] hover:-translate-y-1 transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    Create Flow
                                </span>
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm hover:border-primary-brand/30">
                                Browse Templates ✨
                            </button>
                        </motion.div>
                    </div>
                    
                    {/* Animated Mini Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="flex-1 relative hidden lg:block"
                    >
                        <div className="glass-dark border-white/10 p-6 rounded-3xl animate-float glow-amber">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="ml-auto text-[10px] text-white/40 font-mono">flow-engine v2.0</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-primary-brand/30 border border-primary-brand/40 flex items-center justify-center text-xs">🎯</div>
                                    <div className="flex-1 h-3 bg-primary-brand/20 rounded-full overflow-hidden">
                                        <div className="h-full w-3/4 bg-gradient-to-r from-primary-brand to-amber-400 rounded-full animate-shimmer"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-amber-500/30 border border-amber-500/40 flex items-center justify-center text-xs">⚡</div>
                                    <div className="flex-1 h-3 bg-amber-500/20 rounded-full overflow-hidden">
                                        <div className="h-full w-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full animate-shimmer" style={{ animationDelay: '0.5s' }}></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center text-xs">✅</div>
                                    <div className="flex-1 h-3 bg-emerald-500/20 rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full animate-shimmer" style={{ animationDelay: '1s' }}></div>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-green-400 text-xs font-mono">All steps completed ✓</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1.5">
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.change}</span>
                                <span className="text-[10px] text-gray-400">vs last period</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Workflows List Section */}
            <div>
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 px-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-black text-gray-900">
                                My Collections
                            </h2>
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-black rounded-full uppercase tracking-wider">
                                {[...showcaseWorkflows, ...workflows].length} flows
                            </span>
                        </div>
                        <p className="text-gray-500 font-medium">
                            your workflows are literally on fire rn 🔥
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center gap-3"
                    >
                        <div className="flex glass p-1 rounded-2xl border-gray-100">
                            <button className="p-2.5 bg-white rounded-xl shadow-sm text-primary-600">
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors">
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <button className="flex items-center gap-2 px-5 py-2.5 glass border-gray-100 rounded-2xl text-sm font-bold text-gray-700 hover:border-primary-brand/30 transition-all">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </motion.div>
                </header>

                <div className="space-y-12">
                    <WorkflowList 
                        workflows={[...showcaseWorkflows, ...workflows]} 
                        loading={loading} 
                        onDelete={deleteWorkflow} 
                        onCreateNew={handleCreateNew}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
