import { useEffect, useState } from "react";
import { Modal, Button, Input, ColorPicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "../../styles/providerAccount/addPatientFlagModal.css";

const DEFAULT_COLOR = "#facc15";

const toHex = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value.toHexString === "function") return value.toHexString();
    return "";
};

const AddPatientFlagModal = ({ open, onClose, onCreate }) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState(DEFAULT_COLOR);

    useEffect(() => {
        if (open) {
            setName("");
            setColor(DEFAULT_COLOR);
        }
    }, [open]);

    const canCreate = name.trim().length > 0;

    const handleCreate = () => {
        if (!canCreate) return;
        const flag = { name: name.trim(), color };
        if (onCreate) onCreate(flag);
        else console.log("Create patient flag", flag);
        onClose?.();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={500}
            title={null}
            closable={false}
            destroyOnClose
            className="pf-modal"
            style={{ top: 80 }}
        >
            <div className="pf-modal-head">
                <span className="pf-modal-title">Add New Patient Flag</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="pf-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="pf-field">
                <label className="pf-label">
                    Flag Name <span className="pf-required">*</span>
                </label>
                <Input
                    placeholder="Enter Patient Flag Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="pf-field">
                <label className="pf-label">
                    Color <span className="pf-required">*</span>
                </label>
                <div className="pf-color-wrap">
                    <ColorPicker
                        value={color}
                        onChange={(v) => setColor(toHex(v))}
                        showText={false}
                        className="pf-color-picker"
                    />
                </div>
            </div>

            <div className="pf-modal-footer">
                <Button className="pf-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="pf-create-btn"
                    onClick={handleCreate}
                    disabled={!canCreate}
                >
                    Create Flag
                </Button>
            </div>
        </Modal>
    );
};

export default AddPatientFlagModal;
