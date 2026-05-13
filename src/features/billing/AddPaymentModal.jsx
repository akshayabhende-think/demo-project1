import { useEffect, useState } from "react";
import { Modal, Button, Input, Radio } from "antd";
import {
    CloseOutlined,
    PhoneOutlined,
    MailOutlined,
} from "@ant-design/icons";
import "../../styles/billing/addPaymentModal.css";

const PATIENT_DEFAULT = {
    dob: "08/18/1980",
    age: "45 Yrs",
    gender: "Male",
    phone: "404-555-6574",
    email: "olivar@example.com",
};

const AddPaymentModal = ({ open, onClose, record }) => {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("card");

    useEffect(() => {
        if (open) {
            setAmount("");
            setMethod("card");
        }
    }, [open]);

    const amountDue = record?.patientBalance ?? 500;
    const clientName = record?.clientName ?? "Esther Howard";

    const handleCollect = () => {
        /* console.log("Collect payment", {
            superbillId: record?.id,
            amount,
            method,
        }); */
        onClose?.();
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
            className="pay-modal"
            style={{ top: 60 }}
        >
            <div className="pay-modal-head">
                <span className="pay-modal-title">Payment</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    className="pay-modal-close"
                    onClick={onClose}
                    aria-label="Close"
                />
            </div>

            <div className="pay-patient-card">
                <div className="pay-patient-line">
                    <span className="pay-patient-name">{clientName}</span>
                    <span className="pay-patient-meta">
                        {PATIENT_DEFAULT.dob}
                    </span>
                    <span className="pay-patient-meta">
                        {PATIENT_DEFAULT.age}
                    </span>
                    <span className="pay-patient-meta">
                        {PATIENT_DEFAULT.gender}
                    </span>
                </div>
                <div className="pay-patient-contact">
                    <span className="pay-contact-item">
                        <PhoneOutlined /> {PATIENT_DEFAULT.phone}
                    </span>
                    <span className="pay-contact-item">
                        <MailOutlined /> {PATIENT_DEFAULT.email}
                    </span>
                </div>
            </div>

            <div className="pay-due-row">
                <span>Amount Due :</span>
                <span className="pay-due-value">${amountDue}</span>
            </div>

            <div className="pay-field">
                <label className="pay-label">Enter Amount</label>
                <Input
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className="pay-field">
                <label className="pay-label">Select Payment Method</label>
                <Radio.Group
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="pay-method-group"
                >
                    <Radio value="card" className="pay-method-radio">
                        Card
                    </Radio>
                    <Radio value="cash" className="pay-method-radio">
                        Cash
                    </Radio>
                </Radio.Group>
            </div>

            <div className="pay-modal-footer">
                <Button className="pay-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="pay-collect-btn"
                    onClick={handleCollect}
                >
                    Collect
                </Button>
            </div>
        </Modal>
    );
};

export default AddPaymentModal;
