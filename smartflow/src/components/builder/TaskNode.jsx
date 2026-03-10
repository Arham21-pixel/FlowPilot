// components/builder/TaskNode.jsx
// Custom React Flow node — how each task looks on canvas
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const NODE_CONFIG = {
  trigger:   { label: 'Trigger',   desc: 'Start your workflow', icon: '⚡', color: '#d4a017', bg: '#fff3cd', border: '#d4a017' },
  condition: { label: 'Condition', desc: 'If/else branch',      icon: '⚖️', color: '#7c5cbf', bg: '#e8e0f7', border: '#7c5cbf' },
  loop:      { label: 'Loop',      desc: 'Iterate items',       icon: '🔁', color: '#4a7fc1', bg: '#ddeeff', border: '#4a7fc1' },
  delay:     { label: 'Delay',     desc: 'Wait timer',          icon: '⏱️', color: '#c4622d', bg: '#ffe8d6', border: '#c4622d' },
  action:    { label: 'Action',    desc: 'Perform action',      icon: '▶️', color: '#2d8a56', bg: '#d6f5e3', border: '#2d8a56' },
  api_call:  { label: 'API Call',  desc: 'HTTP request',        icon: '🌐', color: '#2d6fa8', bg: '#d6eeff', border: '#2d6fa8' },
  transform: { label: 'Transform', desc: 'Reshape data',        icon: '🔄', color: '#8a2d8a', bg: '#f5d6f5', border: '#8a2d8a' },
  output:    { label: 'Output',    desc: 'Send result',         icon: '📤', color: '#555555', bg: '#f0f0f0', border: '#555555' },
};

function TaskNode({ data, selected }) {
  const cfg = NODE_CONFIG[data.type] || NODE_CONFIG.action;

  return (
    <div
      className={`task-node ${selected ? 'selected' : ''}`}
      style={{ borderLeft: `3px solid ${cfg.border}` }}
    >
      {/* Input handle (top) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: cfg.color }}
      />

      {/* Header */}
      <div className="task-node__head" style={{ background: cfg.bg }}>
        <div
          className="task-node__head-icon"
          style={{ background: cfg.bg, color: cfg.color }}
        >
          {cfg.icon}
        </div>
        <div className="task-node__head-label" style={{ color: cfg.color }}>
          {cfg.label}
        </div>
      </div>

      {/* Body */}
      <div className="task-node__body">
        <div className="task-node__title">{cfg.label}</div>
        <div className="task-node__subtitle">{cfg.desc}</div>
      </div>

      {/* Config area */}
      <div className="task-node__config">
        <div className="task-node__config-label">CONFIG</div>
        <div className="task-node__config-value">
          // {cfg.label.toLowerCase()}...
        </div>
      </div>

      {/* Output handle (bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: cfg.color }}
      />
    </div>
  );
}

export default memo(TaskNode);
