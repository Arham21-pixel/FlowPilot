import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query,
  where,
  orderBy
} from 'firebase/firestore';

const COLLECTION_NAME = 'runs';

// Save run result
export const saveRunResult = async (workflowId, userId, status, logs) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      workflowId,
      userId,
      status, // 'success', 'failed', 'running'
      logs, // Array of log messages
      executedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Get run history for a workflow
export const getWorkflowRuns = async (workflowId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("workflowId", "==", workflowId),
      orderBy("executedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

// Get all runs by user
export const getUserRuns = async (userId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("userId", "==", userId),
      orderBy("executedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};
