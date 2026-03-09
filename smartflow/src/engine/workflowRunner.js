import { saveRunResult } from '../services/runService';

/**
 * Execute a workflow step by step
 * @param {Object} workflow - The workflow object containing nodes/steps
 * @param {string} userId - ID of the user triggering the run
 * @param {Function} onProgress - Callback for UI updates during run
 */
export const runWorkflow = async (workflow, userId, onProgress) => {
  const logs = [];
  const addLog = (msg) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${msg}`;
    logs.push(logEntry);
    if (onProgress) onProgress(logEntry);
  };

  try {
    addLog(`Starting workflow: ${workflow.name || 'Unnamed'}`);
    
    // Sort nodes if sequential or use directed graph execution logic
    // For MVP, assuming workflow.nodes is an array of tasks executed sequentially
    const nodes = workflow.nodes || [];
    
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      addLog(`Executing Task ${i + 1}: [${node.type}] ${node.label || 'Task'}`);
      
      // Simulate task execution delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Actual task logic based on node.type (e.g., API call, Scrape, etc.)
      
      addLog(`Task ${i + 1} completed successfully.`);
    }

    addLog('Workflow execution finished successfully.');
    // Save to Firestore
    if(workflow.id) {
        await saveRunResult(workflow.id, userId, 'success', logs);
    }
    return { success: true, logs };

  } catch (error) {
    addLog(`Workflow failed with error: ${error.message}`);
    if(workflow.id) {
        await saveRunResult(workflow.id, userId, 'failed', logs);
    }
    return { success: false, logs, error };
  }
};
