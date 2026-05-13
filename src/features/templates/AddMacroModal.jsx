import { useEffect, useState } from "react";
import { Modal, Button, Input, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMacro } from "../../api/templatesApi";
import "../../styles/templates/addMacroModal.css";

const EMPTY_FORM = { title: "", description: "" };

const DEFAULT_CREATED_BY = "Kristin Watson";

const AddMacroModal = ({ open, onClose }) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (open) setForm(EMPTY_FORM);
    }, [open]);

    const mutation = useMutation({
        mutationFn: createMacro,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["macros"] });
            message.success("Macro added");
            onClose?.();
        },
        onError: (err) => {
            message.error(err?.message || "Failed to add macro");
        },
    });

    const handleChange = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = () => {
        if (!form.title.trim()) {
            message.warning("Macro name is required");
            return;
        }
        mutation.mutate({ ...form, createdBy: DEFAULT_CREATED_BY });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={520}
            title={null}
            closable={false}
            destroyOnClose
            className="am-modal"
        >
            <div className="am-modal-head">
                <span className="am-modal-title">Add Macro</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="am-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="am-field">
                <label className="am-label">Macro Name</label>
                <Input
                    placeholder="Enter Macro Name"
                    value={form.title}
                    onChange={handleChange("title")}
                />
            </div>

            <div className="am-field">
                <label className="am-label">Description</label>
                <Input.TextArea
                    placeholder="Enter Description"
                    value={form.description}
                    onChange={handleChange("description")}
                    rows={4}
                />
            </div>

            <div className="am-modal-footer">
                <Button className="am-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="am-submit-btn"
                    onClick={handleSubmit}
                    loading={mutation.isPending}
                >
                    Add
                </Button>
            </div>
        </Modal>
    );
};

export default AddMacroModal;
