import { useEffect, useState } from "react";
import { Modal, Button, Input, Switch } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "../../styles/practice/addNewRoleModal.css";

const PERMISSION_SECTIONS = [
    {
        key: "availability",
        title: "Availability",
        permissions: [
            {
                key: "createAvailability",
                label: "Create availability",
                description: "Allow user create, update & delete availability",
                default: true,
            },
            {
                key: "viewAvailability",
                label: "View availability",
                description: "Allow user view availability",
                default: false,
            },
            {
                key: "haveAvailability",
                label: "Have Availability",
                description: "Have availability",
                default: true,
            },
        ],
    },
    {
        key: "documents",
        title: "Documents",
        permissions: [
            {
                key: "editIntake",
                label: "Edit Intake Documents",
                description: "Allow the user to view & edit intake documents",
                default: true,
            },
            {
                key: "viewUploadDocs",
                label: "View/Download/Upload Patients Documents",
                description:
                    "Allow the user to view/download/upload patients documents",
                default: false,
            },
        ],
    },
];

const buildDefaultPermissions = () => {
    const state = {};
    for (const section of PERMISSION_SECTIONS) {
        for (const perm of section.permissions) {
            state[`${section.key}.${perm.key}`] = perm.default;
        }
    }
    return state;
};

const buildInitialState = () => ({
    roleName: "Substance Abuse Counsellor",
    description: "",
    permissions: buildDefaultPermissions(),
});

const AddNewRoleModal = ({ open, onClose, onSave }) => {
    const [form, setForm] = useState(buildInitialState);

    useEffect(() => {
        if (open) setForm(buildInitialState());
    }, [open]);

    const updateField = (field, value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const togglePermission = (key, value) =>
        setForm((prev) => ({
            ...prev,
            permissions: { ...prev.permissions, [key]: value },
        }));

    const handleSave = () => {
        if (onSave) onSave(form);
        else console.log("Save new role", form);
        onClose?.();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={780}
            title={null}
            closable={false}
            destroyOnClose
            className="anr-modal"
            style={{ top: 30 }}
        >
            <div className="anr-modal-head">
                <span className="anr-modal-title">Add New Role</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="anr-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="anr-top-grid">
                <div className="anr-field">
                    <label className="anr-label">Role Name</label>
                    <Input
                        value={form.roleName}
                        onChange={(e) =>
                            updateField("roleName", e.target.value)
                        }
                    />
                </div>
                <div className="anr-field">
                    <label className="anr-label">Description</label>
                    <Input
                        placeholder="Enter Description"
                        value={form.description}
                        onChange={(e) =>
                            updateField("description", e.target.value)
                        }
                    />
                </div>
            </div>

            {PERMISSION_SECTIONS.map((section) => (
                <section key={section.key} className="anr-perm-section">
                    <h4 className="anr-perm-section-title">
                        {section.title}
                    </h4>
                    <div className="anr-perm-table">
                        <div className="anr-perm-row anr-perm-head">
                            <span>Permission</span>
                            <span>Description</span>
                            <span />
                        </div>
                        {section.permissions.map((perm) => {
                            const cellKey = `${section.key}.${perm.key}`;
                            const checked = form.permissions[cellKey] ?? false;
                            return (
                                <div
                                    key={perm.key}
                                    className="anr-perm-row"
                                >
                                    <span className="anr-perm-name">
                                        {perm.label}
                                    </span>
                                    <span className="anr-perm-desc">
                                        {perm.description}
                                    </span>
                                    <span className="anr-perm-switch">
                                        <Switch
                                            checked={checked}
                                            onChange={(v) =>
                                                togglePermission(cellKey, v)
                                            }
                                        />
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}

            <div className="anr-modal-footer">
                <Button className="anr-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="anr-save-btn"
                    onClick={handleSave}
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default AddNewRoleModal;
