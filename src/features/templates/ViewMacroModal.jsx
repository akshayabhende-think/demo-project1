import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "../../styles/templates/viewMacroModal.css";

const ViewMacroModal = ({ open, macro, onClose }) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={520}
            title={null}
            closable={false}
            destroyOnClose
            className="vm-modal"
        >
            <div className="vm-modal-head">
                <span className="vm-modal-title">View Macro</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="vm-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="vm-field">
                <label className="vm-label">Macro Name</label>
                <div className="vm-value vm-value-single">
                    @ {macro?.title || "--"}
                </div>
            </div>

            <div className="vm-field">
                <label className="vm-label">Description</label>
                <div className="vm-value vm-value-multiline">
                    {(macro?.description || "")
                        .split("\n")
                        .filter((line) => line.length > 0)
                        .map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                </div>
            </div>
        </Modal>
    );
};

export default ViewMacroModal;
