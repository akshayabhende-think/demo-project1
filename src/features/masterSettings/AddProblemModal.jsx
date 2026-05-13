import { useEffect, useState } from "react";
import { Modal, Button, Input, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProblem } from "../../api/masterSettingsApi";
import "../../styles/masterSettings/addProblemModal.css";

const EMPTY_FORM = {
    code: "",
    description: "",
    snomedCode: "",
    snomedDescription: "",
};

const AddProblemModal = ({ open, onClose }) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (open) setForm(EMPTY_FORM);
    }, [open]);

    const mutation = useMutation({
        mutationFn: createProblem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["masterProblemList"] });
            message.success("Problem added");
            onClose?.();
        },
        onError: (err) => {
            message.error(err?.message || "Failed to add problem");
        },
    });

    const handleChange = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = () => {
        if (!form.code.trim()) {
            message.warning("Problem code is required");
            return;
        }
        mutation.mutate({ ...form, active: true });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={460}
            title={null}
            closable={false}
            destroyOnClose
            className="ap-modal"
        >
            <div className="ap-modal-head">
                <span className="ap-modal-title">Add Problem</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="ap-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="ap-field">
                <label className="ap-label">Problem</label>
                <Input
                    placeholder="CPT Code"
                    value={form.code}
                    onChange={handleChange("code")}
                />
            </div>

            <div className="ap-field">
                <label className="ap-label">Description</label>
                <Input.TextArea
                    placeholder="Enter Description"
                    value={form.description}
                    onChange={handleChange("description")}
                    rows={3}
                />
            </div>

            <div className="ap-field">
                <label className="ap-label">SNOMED CT code</label>
                <Input
                    placeholder="SNOMED CT code"
                    value={form.snomedCode}
                    onChange={handleChange("snomedCode")}
                />
            </div>

            <div className="ap-field">
                <label className="ap-label">SNOMED Description</label>
                <Input.TextArea
                    placeholder="Enter Description"
                    value={form.snomedDescription}
                    onChange={handleChange("snomedDescription")}
                    rows={3}
                />
            </div>

            <div className="ap-modal-footer">
                <Button className="ap-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="ap-submit-btn"
                    onClick={handleSubmit}
                    loading={mutation.isPending}
                >
                    Add
                </Button>
            </div>
        </Modal>
    );
};

export default AddProblemModal;
