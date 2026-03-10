// P1 — Workflow Service: Save & Load workflows to/from Firebase
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION = 'workflows';

/**
 * Save a new workflow or update existing one
 */
export async function saveWorkflow(workflowId, data) {
  if (!db) {
    console.warn('[FlowPilot] Firebase not configured — workflow saved locally only.');
    return workflowId;
  }
  const ref = doc(db, COLLECTION, workflowId);
  await setDoc(
    ref,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
  return workflowId;
}

/**
 * Load a single workflow by ID
 */
export async function getWorkflow(workflowId) {
  if (!db) return null;
  const ref = doc(db, COLLECTION, workflowId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Load all workflows
 */
export async function getAllWorkflows() {
  if (!db) return [];
  const q = query(collection(db, COLLECTION), orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Delete a workflow
 */
export async function deleteWorkflow(workflowId) {
  if (!db) return;
  await deleteDoc(doc(db, COLLECTION, workflowId));
}
