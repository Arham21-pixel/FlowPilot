import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Play, Settings as SettingsIcon, Share2, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { workflowService } from '../services/workflowService';
import TaskPanel from '../components/builder/TaskPanel';
import FlowCanvas from '../components/builder/FlowCanvas';

const BuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [currentNodes, setCurrentNodes] = useState([]);
  const [currentEdges, setCurrentEdges] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const data = await workflowService.getWorkflowById(id);
        if (data) {
          setWorkflow(data);
          setCurrentNodes(data.nodes || []);
          setCurrentEdges(data.edges || []);
        }
      } catch (err) {
        console.error("Error fetching workflow:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchWorkflow();
    }
  }, [id]);

  const handleNodesEdgesChange = useCallback((nodes, edges) => {
    setCurrentNodes(nodes);
    setCurrentEdges(edges);
  }, []);

  const handleSave = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      await workflowService.updateWorkflow(id, {
        nodes: currentNodes,
        edges: currentEdges,
      });
    } catch (err) {
      console.error("Error saving workflow:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary-brand/20 border-t-primary-brand rounded-full animate-spin"></div>
        <div className="text-gray-400 font-bold animate-pulse">Initializing Canvas...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Builder Header */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0 z-20">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 group text-gray-400 hover:text-gray-900 transition-colors"
          >
            <div className="p-1.5 rounded-lg border border-gray-100 group-hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold">Exit</span>
          </button>
          
          <div className="h-8 w-px bg-gray-100"></div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">Builder Mode</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Sync</span>
              </div>
            </div>
            <h1 className="text-sm font-black text-gray-900 mt-1 flex items-center gap-2">
              {workflow?.name || 'Untitled Workflow'}
              <Sparkles className="w-3 h-3 text-primary-brand" />
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
            <SettingsIcon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
            <Share2 className="w-5 h-5" />
          </button>
          
          <div className="h-8 w-px bg-gray-100 mx-1"></div>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
              isSaving 
                ? 'bg-primary-50 text-primary-400 cursor-not-allowed' 
                : 'bg-primary-brand text-gray-900 shadow-lg shadow-primary-brand/20 hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            <Save className={`w-4 h-4 ${isSaving ? 'animate-pulse' : ''}`} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10">
            <Play className="w-4 h-4 fill-white" />
            Run Test
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Task Panel (Left Sidebar) */}
        <div className="w-72 bg-white border-r border-gray-100 h-full z-10 shadow-xl shadow-gray-900/5">
          <TaskPanel />
        </div>

        {/* Flow Canvas (Center Area) */}
        <div className="flex-1 h-full relative bg-surface-50">
          <FlowCanvas 
            initialNodes={workflow?.nodes || []} 
            initialEdges={workflow?.edges || []} 
            onNodesEdgesChange={handleNodesEdgesChange}
          />
          
          {/* Canvas Utilities */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
            <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-100 shadow-premium">
              <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-500 transition-colors"><HelpCircle className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
