import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, Alert, message } from "antd";
import EditProspectForm from "../features/prospects/EditProspectForm";
import { useProspectById } from "../features/prospects/useProspectById";
import { useUpdateProspect } from "../features/prospects/useProspectMutations";
import "../styles/prospect/editProspect.css";

const EditProspect = () => {
    const { id } = useParams();
    const decodedId = decodeURIComponent(id);
    const navigate = useNavigate();

    const { prospect, isLoading, isError, error } = useProspectById(decodedId);
    const updateMutation = useUpdateProspect();

    const handleCancel = useCallback(() => {
        navigate("/prospect");
    }, [navigate]);

    const handleSave = useCallback(
        (payload) => {
            updateMutation.mutate(
                { id: decodedId, payload },
                {
                    onSuccess: () => {
                        message.success("Prospect updated");
                        navigate("/prospect");
                    },
                    onError: () => message.error("Failed to update prospect"),
                }
            );
        },
        [decodedId, navigate, updateMutation]
    );

    if (isLoading) {
        return (
            <div className="edit-prospect-page" style={{ textAlign: "center" }}>
                <Spin />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="edit-prospect-page">
                <Alert
                    type="error"
                    message="Failed to load prospect"
                    description={error?.message}
                />
            </div>
        );
    }

    if (!prospect) {
        return (
            <div className="edit-prospect-page">
                <Alert
                    type="warning"
                    message={`No prospect found with id ${decodedId}`}
                />
            </div>
        );
    }

    return (
        <div className="edit-prospect-page">
            <EditProspectForm
                record={prospect}
                onCancel={handleCancel}
                onSave={handleSave}
                saving={updateMutation.isPending}
            />
        </div>
    );
};

export default EditProspect;
