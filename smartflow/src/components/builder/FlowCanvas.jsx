import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TaskNode from './TaskNode';

const nodeTypes = {
  customNode: TaskNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowCanvasInner = ({ initialNodes, initialEdges, onNodesEdgesChange }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges || []);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Sync state to parent whenever nodes/edges change
  useEffect(() => {
    onNodesEdgesChange(nodes, edges);
  }, [nodes, edges, onNodesEdgesChange]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#F5C518', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('nodeLabel');
      const subtext = event.dataTransfer.getData('nodeSubtext');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label, subtext, type: label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
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
      >
        <Controls />
        <MiniMap nodeStrokeColor={(n) => '#F5C518'} nodeColor={(n) => '#FAFAFA'} />
        <Background color="#ccc" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

// Wrap in ReactFlowProvider so screenToFlowPosition works correctly
const FlowCanvas = ({ initialNodes, initialEdges, onNodesEdgesChange }) => {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner 
        initialNodes={initialNodes} 
        initialEdges={initialEdges} 
        onNodesEdgesChange={onNodesEdgesChange} 
      />
    </ReactFlowProvider>
  );
};

export default FlowCanvas;
