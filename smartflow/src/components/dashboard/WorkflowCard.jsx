import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trash2, Clock, Zap, ArrowRight, MoreVertical, Sparkles, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkflowCard = ({ workflow, onDelete, index = 0 }) => {
    const navigate = useNavigate();
    const { id, name, status, lastRun, description } = workflow;

    const displayStatus = (status || 'active').toLowerCase();
    
    const getStatusTheme = () => {
        if (workflow.isTemplate) return { 
            bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', 
            dot: 'bg-indigo-500', label: '✨ Template', 
            gradient: 'from-primary-brand/10 to-amber-400/10' 
        };
        if (displayStatus === 'active') return { 
            bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', 
            dot: 'bg-emerald-500', label: '🟢 Active',
            gradient: 'from-emerald-500/10 to-teal-500/10'
        };
        if (displayStatus === 'paused') return { 
            bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', 
            dot: 'bg-amber-500', label: '⏸️ Paused',
            gradient: 'from-amber-500/10 to-orange-500/10'
        };
        if (displayStatus === 'error') return { 
            bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', 
            dot: 'bg-rose-500', label: '🔴 Error',
            gradient: 'from-rose-500/10 to-red-500/10'
        };
        return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-100', dot: 'bg-gray-500', label: displayStatus, gradient: 'from-gray-500/10 to-gray-400/10' };
    };

    const theme = getStatusTheme();
    const nodeCount = workflow.nodes?.length || 0;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 overflow-hidden flex flex-col h-72 border-glow"
        >
            {/* Animated Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* Top Corner Blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-brand/5 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-4">
                <div className="relative">
                    <motion.div 
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 rounded-2xl bg-primary-brand/10 flex items-center justify-center text-xl shadow-sm border border-primary-brand/20"
                    >
                        {workflow.emoji || '⚡'}
                    </motion.div>
                    {displayStatus === 'active' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                    )}
                </div>
                
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full flex items-center text-[10px] font-black uppercase tracking-widest border ${theme.bg} ${theme.text} ${theme.border}`}>
                        {theme.label}
                    </span>
                </div>
            </div>

            <div className="relative z-10 flex-1">
                <h3 className="text-gray-900 font-extrabold text-lg leading-tight mb-1.5 group-hover:text-primary-600 transition-colors">
                    {name || "Untitled Workflow"}
                </h3>
                {description && (
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{description}</p>
                )}
                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {lastRun || 'Never run'}
                    </div>
                    <div className="flex items-center gap-1">
                        <GitBranch className="w-3.5 h-3.5" />
                        {nodeCount} nodes
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold px-2 py-0.5 bg-gray-50 rounded-full">collab</span>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => {
                            if (window.confirm('Delete this workflow?')) onDelete(id);
                        }}
                        className="p-2.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100 opacity-0 group-hover:opacity-100"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/builder/${id}`)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-black transition-all ${
                            workflow.isTemplate 
                                ? 'bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-200' 
                                : 'bg-primary-brand text-gray-900 hover:bg-primary-400 shadow-lg shadow-primary-brand/20'
                        }`}
                    >
                        {workflow.isTemplate ? 'Use' : 'Edit'}
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default WorkflowCard;
