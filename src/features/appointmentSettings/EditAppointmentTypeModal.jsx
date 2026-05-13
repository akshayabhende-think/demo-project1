import { useEffect, useState } from "react";
import { Modal, Button, Input, Select, ColorPicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "../../styles/appointmentSettings/editAppointmentTypeModal.css";

const DURATION_UNIT_OPTIONS = [
    { value: "Minutes", label: "Minutes" },
    { value: "Hours", label: "Hours" },
];

const splitDuration = (str) => {
    if (!str) return { value: "", unit: "Minutes" };
    const match = String(str).match(/^(\d+)\s*(.*)$/);
    if (!match) return { value: str, unit: "Minutes" };
    const unit = (match[2] || "Minutes").toLowerCase().startsWith("hour")
        ? "Hours"
        : "Minutes";
    return { value: match[1], unit };
};

const buildInitialState = (record) => {
    const { value, unit } = splitDuration(record?.duration);
    return {
        color: record?.color ?? "#fbbf24",
        title: record?.name ?? "",
        description: record?.description ?? "",
        durationValue: value,
        durationUnit: unit,
    };
};

const toHex = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value.toHexString === "function") return value.toHexString();
    return "";
};

const EditAppointmentTypeModal = ({ open, onClose, record }) => {
    const [form, setForm] = useState(() => buildInitialState(record));

    useEffect(() => {
        if (open) setForm(buildInitialState(record));
    }, [open, record]);

    const updateField = (field, value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleUpdate = () => {
        console.log("Update appointment type", {
            id: record?.id,
            ...form,
        });
        onClose?.();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={560}
            title={null}
            closable={false}
            destroyOnClose
            className="edit-type-modal"
            style={{ top: 60 }}
        >
            <div className="edit-type-head">
                <span className="edit-type-title">Edit Appointment Type</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="edit-type-close"
                    aria-label="Close"
                />
            </div>

            <div className="edit-type-color-row">
                <div className="edit-type-field edit-type-color-field">
                    <label className="edit-type-label">Select Color</label>
                    <ColorPicker
                        value={form.color}
                        onChange={(value) =>
                            updateField("color", toHex(value))
                        }
                        showText={false}
                        className="edit-type-color-picker"
                    />
                </div>
                <div className="edit-type-field edit-type-title-field">
                    <label className="edit-type-label">
                        Appointment Type Title{" "}
                        <span className="edit-type-required">*</span>
                    </label>
                    <Input
                        value={form.title}
                        onChange={(e) => updateField("title", e.target.value)}
                    />
                </div>
            </div>

            <div className="edit-type-field">
                <label className="edit-type-label">Description</label>
                <Input.TextArea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                        updateField("description", e.target.value)
                    }
                />
            </div>

            <div className="edit-type-field">
                <label className="edit-type-label">
                    Appointment Duration{" "}
                    <span className="edit-type-required">*</span>
                </label>
                <div className="edit-type-duration-row">
                    <Input
                        value={form.durationValue}
                        onChange={(e) =>
                            updateField("durationValue", e.target.value)
                        }
                    />
                    <Select
                        options={DURATION_UNIT_OPTIONS}
                        value={form.durationUnit}
                        onChange={(v) => updateField("durationUnit", v)}
                    />
                </div>
            </div>

            <div className="edit-type-footer">
                <Button className="edit-type-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="edit-type-update-btn"
                    onClick={handleUpdate}
                >
                    Update
                </Button>
            </div>
        </Modal>
    );
};

export default EditAppointmentTypeModal;
