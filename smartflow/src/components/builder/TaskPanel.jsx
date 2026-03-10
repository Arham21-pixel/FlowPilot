// components/builder/TaskPanel.jsx
// Left sidebar — draggable task items, self-contained
import React, { useState } from 'react';

const TASKS = {
  Triggers: [
    { id: 'trigger', label: 'Trigger', desc: 'Start your workflow', icon: '⚡', color: '#d4a017', bg: '#fff3cd' },
  ],
  Logic: [
    { id: 'condition', label: 'Condition', desc: 'If/else branch', icon: '⚖️', color: '#7c5cbf', bg: '#e8e0f7' },
    { id: 'loop',      label: 'Loop',      desc: 'Iterate items',  icon: '🔁', color: '#4a7fc1', bg: '#ddeeff' },
    { id: 'delay',     label: 'Delay',     desc: 'Wait timer',     icon: '⏱️', color: '#c4622d', bg: '#ffe8d6' },
  ],
  Actions: [
    { id: 'action',    label: 'Action',    desc: 'Perform action', icon: '▶️', color: '#2d8a56', bg: '#d6f5e3' },
    { id: 'api_call',  label: 'API Call',  desc: 'HTTP request',   icon: '🌐', color: '#2d6fa8', bg: '#d6eeff' },
    { id: 'transform', label: 'Transform', desc: 'Reshape data',   icon: '🔄', color: '#8a2d8a', bg: '#f5d6f5' },
  ],
  Output: [
    { id: 'output', label: 'Output', desc: 'Send result', icon: '📤', color: '#555555', bg: '#f0f0f0' },
  ],
};

export default function TaskPanel() {
  const [search, setSearch] = useState('');

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData('application/reactflow', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const q = search.toLowerCase();

  return (
    <aside className="sidebar">
      <div className="sidebar__search-box">
        <div className="sidebar__search-wrap">
          <span className="sidebar__search-icon">🔍</span>
          <input
            className="sidebar__search"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar__list">
        {Object.entries(TASKS).map(([section, items]) => {
          const filtered = items.filter(
            (t) => t.label.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
          );
          if (filtered.length === 0) return null;
          return (
            <div key={section}>
              <div className="sidebar__section-title">{section}</div>
              {filtered.map((task) => (
                <div
                  key={task.id}
                  className="sidebar__item"
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                >
                  <div
                    className="sidebar__item-pill"
                    style={{ background: task.bg, color: task.color }}
                  >
                    {task.icon}
                  </div>
                  <div className="sidebar__item-text">
                    <div className="sidebar__item-name">{task.label}</div>
                    <div className="sidebar__item-desc">{task.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
