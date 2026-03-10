import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where
} from 'firebase/firestore';

const COLLECTION_NAME = 'workflows';

// Create a new workflow for a user
export const createWorkflow = async (userId, workflowData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...workflowData,
      userId,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Get all workflows for a user
export const getUserWorkflows = async (userId) => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

// Get a single workflow by ID
export const getWorkflow = async (workflowId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, workflowId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// Update an existing workflow
export const updateWorkflow = async (workflowId, updateData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, workflowId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};

// Delete a workflow
export const deleteWorkflow = async (workflowId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, workflowId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};
