import { db } from '../firebase/config';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc, Timestamp, getDoc } from 'firebase/firestore';

export const workflowService = {
  getWorkflowsByUser: async (userId) => {
    const q = query(collection(db, 'workflows'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  getWorkflowById: async (id) => {
    const docSnap = await getDoc(doc(db, 'workflows', id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  },

  createWorkflow: async (userId, data) => {
    const docRef = await addDoc(collection(db, 'workflows'), {
      ...data,
      userId,
      createdAt: Timestamp.now(),
      status: data.status || 'Draft',
    });
    return docRef.id;
  },
  
  deleteWorkflow: async (id) => {
    await deleteDoc(doc(db, 'workflows', id));
  },
  
  updateWorkflow: async (id, data) => {
    const ref = doc(db, 'workflows', id);
    await updateDoc(ref, {
      ...data,
      updatedAt: Timestamp.now()
    });
  }
};
