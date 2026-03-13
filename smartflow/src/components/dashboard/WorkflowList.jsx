import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import WorkflowCard from './WorkflowCard';

const WorkflowList = ({ workflows, loading, onCreateNew, onDelete }) => {
    
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-3xl p-6 h-72 border border-gray-100 shadow-sm animate-pulse">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-primary-50 rounded-2xl"></div>
                            <div className="flex-1">
                                <div className="w-20 h-5 bg-primary-50 rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-2/3 h-5 bg-gray-100 rounded-lg mb-2"></div>
                        <div className="w-1/2 h-4 bg-gray-50 rounded-lg mb-8"></div>
                        <div className="flex space-x-2 mt-auto">
                            <div className="flex-1 h-10 bg-gray-50 rounded-xl"></div>
                            <div className="w-10 h-10 bg-gray-50 rounded-xl"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (workflows.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-brand/5 to-amber-400/5"></div>
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="relative w-20 h-20 bg-[#FFF4CC] rounded-full flex items-center justify-center mb-6 shadow-lg"
                >
                    <Sparkles className="w-10 h-10 text-primary-brand" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 relative">no flows yet bestie 💅</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs text-center relative">
                    Start automating your tasks by building your first workflow. It's giving productivity.
                </p>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCreateNew}
                    className="relative px-8 py-3 bg-primary-brand text-gray-900 font-black rounded-2xl shadow-lg shadow-primary-brand/20 hover:bg-primary-400 transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Create your first flow
                </motion.button>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((wf, index) => (
                <WorkflowCard key={wf.id} workflow={wf} onDelete={onDelete} index={index} />
            ))}
        </div>
    );
};

export default WorkflowList;
