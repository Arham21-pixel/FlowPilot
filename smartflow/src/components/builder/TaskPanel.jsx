import React from 'react';
import { Mail, Clock, Globe, GitBranch, Search, Zap } from 'lucide-react';

const TaskPanel = () => {
  const onDragStart = (event, nodeType, label, subtext) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('nodeLabel', label);
    event.dataTransfer.setData('nodeSubtext', subtext);
    event.dataTransfer.effectAllowed = 'move';
  };

  const categories = [
    {
      name: 'Common Tasks',
      tasks: [
        { type: 'Email Task', label: 'Send Email', subtext: 'Trigger an email to user', icon: Mail },
        { type: 'Delay Task', label: 'Wait/Delay', subtext: 'Wait before next step', icon: Clock },
      ]
    },
    {
      name: 'Integrations',
      tasks: [
        { type: 'Webhook Task', label: 'Webhook', subtext: 'Send HTTP request', icon: Globe },
      ]
    },
    {
      name: 'Logic',
      tasks: [
        { type: 'Condition Task', label: 'Branching', subtext: 'If/Else logic flow', icon: GitBranch },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white select-none">
      <div className="p-6 border-b border-gray-100">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search nodes..." 
            className="w-full bg-gray-50 border border-transparent rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:bg-white focus:border-primary-brand transition-all"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
        {categories.map((category) => (
          <div key={category.name}>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">
              {category.name}
            </h3>
            <div className="space-y-2">
              {category.tasks.map((task) => {
                const Icon = task.icon;
                return (
                  <div 
                    key={task.label}
                    className="group bg-white border border-gray-100 p-3 rounded-2xl flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-primary-brand hover:shadow-premium transition-all duration-200"
                    onDragStart={(event) => onDragStart(event, 'customNode', task.type, task.subtext)}
                    draggable
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-brand group-hover:text-gray-900 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">{task.label}</div>
                      <div className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">{task.subtext}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Pro Tip */}
        <div className="px-2 pt-4">
          <div className="bg-primary-50/50 rounded-2xl p-4 border border-primary-100/50">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3.5 h-3.5 text-primary-600 fill-primary-600" />
              <span className="text-[10px] font-bold text-primary-700 uppercase">Builder Tip</span>
            </div>
            <p className="text-[10px] text-primary-600 leading-relaxed font-medium">
              Connect nodes by dragging from one handle to another. Right-click to delete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPanel;
