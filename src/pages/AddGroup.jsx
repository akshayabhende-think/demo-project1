import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import AddGroupForm from "../features/groups/AddGroupForm";
import { useCreateGroup } from "../features/groups/useGroupMutations";
import "../styles/group/addGroup.css";

const AddGroup = () => {
    const navigate = useNavigate();
    const createMutation = useCreateGroup();

    const handleCancel = useCallback(() => {
        navigate("/groups");
    }, [navigate]);

    const handleSave = useCallback(
        (payload) => {
            createMutation.mutate(payload, {
                onSuccess: () => {
                    message.success("Group added");
                    navigate("/groups");
                },
                onError: () => message.error("Failed to add group"),
            });
        },
        [navigate, createMutation]
    );

    return (
        <div className="add-group-page">
            <AddGroupForm
                onCancel={handleCancel}
                onSave={handleSave}
                saving={createMutation.isPending}
            />
        </div>
    );
};

export default AddGroup;
