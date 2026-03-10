// components/builder/FlowCanvas.jsx
// Main canvas — uses React Flow, receives state from BuilderPage
import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TaskNode from './TaskNode';

function FlowCanvasInner({ nodes, edges, setNodes, setEdges }) {
  const nodeTypes = useMemo(() => ({ taskNode: TaskNode }), []);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Handle new connections
  const onConnect = useCallback(
    (params) =>
      setEdges((prev) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            style: { stroke: '#c8c4b8', strokeWidth: 1.5 },
          },
          prev
        )
      ),
    [setEdges]
  );

  // Handle node changes (drag, select, remove)
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        let updated = [...nds];
        for (const change of changes) {
          if (change.type === 'position' && change.position) {
            updated = updated.map((n) =>
              n.id === change.id ? { ...n, position: change.position } : n
            );
          }
          if (change.type === 'remove') {
            updated = updated.filter((n) => n.id !== change.id);
          }
          if (change.type === 'select') {
            updated = updated.map((n) =>
              n.id === change.id ? { ...n, selected: change.selected } : n
            );
          }
        }
        return updated;
      });
    },
    [setNodes]
  );

  // Handle edge changes (remove)
  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => {
        let updated = [...eds];
        for (const change of changes) {
          if (change.type === 'remove') {
            updated = updated.filter((e) => e.id !== change.id);
          }
          if (change.type === 'select') {
            updated = updated.map((e) =>
              e.id === change.id ? { ...e, selected: change.selected } : e
            );
          }
        }
        return updated;
      });
    },
    [setEdges]
  );

  // Handle DROP from TaskPanel
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type: 'taskNode',
        position,
        data: { type },
      };

      setNodes((prev) => [...prev, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Quick-add from empty state
  const quickAdd = useCallback(
    (type) => {
      const newNode = {
        id: `${type}-${Date.now()}`,
        type: 'taskNode',
        position: { x: 250, y: 200 },
        data: { type },
      };
      setNodes((prev) => [...prev, newNode]);
    },
    [setNodes]
  );

  const isEmpty = nodes.length === 0;

  return (
    <div className="canvas-wrap">
      {/* Empty state */}
      {isEmpty && (
        <div className="empty-state">
          <svg className="empty-state__svg" viewBox="0 0 72 72" fill="none">
            <rect x="6" y="6" width="20" height="16" rx="4" stroke="#c8c4b8" strokeWidth="1.5" />
            <rect x="46" y="6" width="20" height="16" rx="4" stroke="#c8c4b8" strokeWidth="1.5" />
            <rect x="26" y="50" width="20" height="16" rx="4" stroke="#c8c4b8" strokeWidth="1.5" />
            <path d="M16 22 L16 36 Q16 42 22 42 L36 42 L36 50" stroke="#c8c4b8" strokeWidth="1.5" fill="none" />
            <path d="M56 22 L56 36 Q56 42 50 42 L36 42" stroke="#c8c4b8" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="22" r="2" fill="#d4d0c8" />
            <circle cx="56" cy="22" r="2" fill="#d4d0c8" />
            <circle cx="36" cy="50" r="2" fill="#d4d0c8" />
          </svg>
          <div className="empty-state__text">Drag a task to start your workflow</div>
          <div className="empty-state__pills">
            <button className="empty-state__pill" onClick={() => quickAdd('trigger')}>⚡ Trigger</button>
            <button className="empty-state__pill" onClick={() => quickAdd('action')}>⚙ Action</button>
            <button className="empty-state__pill" onClick={() => quickAdd('output')}>📤 Output</button>
          </div>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode="Delete"
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { stroke: '#c8c4b8', strokeWidth: 1.5 },
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant="dots" gap={22} size={1.5} color="#d4d0c8" />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor="#e8c84a"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 12,
          }}
          maskColor="rgba(234, 232, 224, 0.6)"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}

export default function FlowCanvas(props) {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
