import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import EditProspectForm from "../features/prospects/EditProspectForm";
import { useCreateProspect } from "../features/prospects/useProspectMutations";
import "../styles/prospect/editProspect.css";

const AddProspect = () => {
    const navigate = useNavigate();
    const createMutation = useCreateProspect();

    const handleCancel = useCallback(() => {
        navigate("/prospect");
    }, [navigate]);

    const handleSave = useCallback(
        (payload) => {
            createMutation.mutate(payload, {
                onSuccess: () => {
                    message.success("Prospect added");
                    navigate("/prospect");
                },
                onError: () => message.error("Failed to add prospect"),
            });
        },
        [navigate, createMutation]
    );

    return (
        <div className="edit-prospect-page">
            <EditProspectForm
                title="Add Prospect"
                onCancel={handleCancel}
                onSave={handleSave}
                saving={createMutation.isPending}
            />
        </div>
    );
};

export default AddProspect;
