import { Modal, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../../styles/patientCommunications/deleteReminderModal.css";

const DeleteReminderModal = ({ open, onClose, onConfirm, record }) => {
    const handleConfirm = () => {
        if (onConfirm) onConfirm(record);
        else { /* console.log("Delete reminder", record); */ }
        onClose?.();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={420}
            title={null}
            closable={false}
            destroyOnClose
            centered
            className="del-modal"
        >
            <div className="del-modal-icon">
                <DeleteOutlined />
            </div>
            <h3 className="del-modal-title">Delete Reminder</h3>
            <p className="del-modal-message">
                Are you sure you want to delete &quot;{record?.name}&quot; (
                {record?.type})? This action cannot be undone.
            </p>
            <div className="del-modal-footer">
                <Button className="del-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    danger
                    className="del-confirm-btn"
                    onClick={handleConfirm}
                >
                    Delete
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteReminderModal;
