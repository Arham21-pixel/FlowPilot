// pages/BuilderPage.jsx
// Root layout — full screen, manages all state, passes down to FlowCanvas
import React, { useState, useCallback } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import TaskPanel from '../components/builder/TaskPanel';
import FlowCanvas from '../components/builder/FlowCanvas';
import '../styles/builder.css';

export default function BuilderPage() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [workflowName, setWorkflowName] = useState('untitled_workflow');
  const [saved, setSaved] = useState(false);

  // Save workflow to Firestore
  const saveWorkflow = useCallback(async () => {
    if (!db) {
      console.warn('[FlowPilot] Firebase not configured — save skipped');
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
      return;
    }

    try {
      await setDoc(doc(db, 'workflows', workflowName), {
        name: workflowName,
        nodes,
        edges,
        updatedAt: new Date(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (err) {
      console.error('Save failed:', err);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
  }, [workflowName, nodes, edges]);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, []);

  return (
    <div className="builder-page">
      {/* Header bar — 44px, full width */}
      <header className="hdr">
        <div className="hdr__left">
          <span className="hdr__logo-bolt">⚡</span>
          <span className="hdr__logo-text">FlowPilot</span>
        </div>

        <div className="hdr__center">
          <input
            className="hdr__wf-name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            onBlur={() => {
              if (!workflowName.trim()) setWorkflowName('untitled_workflow');
            }}
            spellCheck={false}
          />
          <span className="hdr__badge">
            {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} connection{edges.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="hdr__right">
          <button className="btn btn--clear" onClick={clearCanvas}>
            🗑 Clear
          </button>
          <button
            className={`btn btn--dark ${saved ? 'btn--saved' : ''}`}
            onClick={saveWorkflow}
          >
            {saved ? '✓ Saved' : '💾 Save'}
          </button>
        </div>
      </header>

      {/* Body — row: TaskPanel 210px | FlowCanvas fills rest */}
      <div className="builder-body">
        <TaskPanel />
        <FlowCanvas
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </div>
    </div>
  );
}
