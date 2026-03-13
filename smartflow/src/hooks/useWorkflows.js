import { useState, useEffect } from "react";
import { workflowService } from "../services/workflowService";
import { useAuth } from "./useAuth";

const useWorkflows = () => {
    const { user } = useAuth();
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWorkflows = async () => {
        // Fallback testing local user UID
        const uid = user ? user.uid : "local_test_user";
        setLoading(true);
        try {
            const data = await workflowService.getWorkflowsByUser(uid);
            setWorkflows(data);
        } catch (err) {
            console.error("Error fetching workflows:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkflows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const createWorkflow = async (data) => {
        const uid = user ? user.uid : "local_test_user";
        try {
            const newWorkflowId = await workflowService.createWorkflow(uid, data);
            await fetchWorkflows(); // Refresh list to get new item
            return newWorkflowId;
        } catch (err) {
            console.error("Error creating workflow:", err);
        }
    };

    const deleteWorkflow = async (workflowId) => {
        try {
            await workflowService.deleteWorkflow(workflowId);
            await fetchWorkflows(); // Refresh list to remove deleted item
        } catch (err) {
            console.error("Error deleting workflow:", err);
            throw err;
        }
    };

    return { workflows, loading, createWorkflow, deleteWorkflow };
};

export default useWorkflows;
