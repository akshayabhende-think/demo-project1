import { useEffect, useState } from "react";
import { Modal, Button, Input, Select, DatePicker, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { createFeeSchedule } from "../../api/feeScheduleApi";
import "../../styles/billing/addFeeScheduleModal.css";

const PROCEDURE_OPTIONS = [
    "99202 - New patient visit (20-29 min)",
    "99203 - New patient visit (30-44 min)",
    "99204 - New patient visit (45-59 min)",
    "99212 - Established patient visit (10-19 min)",
    "99213 - Established patient visit (20-29 min)",
    "99214 - Established patient visit (30-39 min)",
    "99215 - Established patient visit (40-54 min)",
    "90791 - Psychiatric diagnostic evaluation",
    "90837 - Psychotherapy, 60 minutes",
    "90834 - Psychotherapy, 45 minutes",
].map((v) => ({ value: v, label: v }));

const PROVIDER_OPTIONS = [
    "Devon Lane",
    "Jacob Jones",
    "Leslie Alexander",
    "Robert Fox",
    "Annette Black",
    "Cody Fisher",
    "Esther Howard",
    "Floyd Miles",
    "Ralph Edwards",
    "Brooklyn Simmons",
    "Eleanor Pena",
    "Guy Hawkins",
    "Wade Warren",
    "Courtney Henry",
    "Theresa Webb",
    "Jenny Wilson",
    "Marvin McKinney",
    "Dianne Russell",
    "Albert Flores",
    "Bessie Cooper",
].map((v) => ({ value: v, label: v }));

const PAYER_OPTIONS = [
    "Ambetter",
    "Providence Health Plan",
    "GEICO Health Insurance",
    "Independence Blue Cross",
    "Mutual of Omaha",
    "Harvard Pilgrim Health Care",
    "Prudential",
    "Health Net",
    "Medical Mutual",
    "Blue Cross Blue Shield",
    "Liberty Mutual Health",
    "UnitedHealthcare",
    "Centene Corporation",
    "EmblemHealth",
    "Aetna",
    "Cigna",
    "Kaiser Permanente",
    "Anthem Blue Cross",
    "Humana",
    "Molina Healthcare",
].map((v) => ({ value: v, label: v }));

const STATUS_OPTIONS = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
];

const EMPTY_FORM = {
    procedureCode: undefined,
    provider: undefined,
    payerName: undefined,
    amount: "",
    startDate: null,
    endDate: null,
    status: undefined,
};

const AddFeeScheduleModal = ({ open, onClose }) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (open) setForm(EMPTY_FORM);
    }, [open]);

    const mutation = useMutation({
        mutationFn: createFeeSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeSchedule"] });
            message.success("Fee schedule added");
            onClose?.();
        },
        onError: (err) => {
            message.error(err?.message || "Failed to add fee schedule");
        },
    });

    const updateField = (field) => (value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const updateInput = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = () => {
        if (!form.procedureCode) return message.warning("Procedure code is required");
        if (!form.provider) return message.warning("Provider is required");
        if (!form.payerName) return message.warning("Payer is required");

        mutation.mutate({
            procedureCode: form.procedureCode,
            provider: form.provider,
            payerName: form.payerName,
            amount: form.amount,
            startDate: form.startDate ? form.startDate.format("MM/DD/YYYY") : "",
            endDate: form.endDate ? form.endDate.format("MM/DD/YYYY") : "",
            status: form.status || "Active",
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={760}
            title={null}
            closable={false}
            destroyOnClose
            className="afs-modal"
        >
            <div className="afs-modal-head">
                <span className="afs-modal-title">Add Fee Schedule</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="afs-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="afs-row afs-row-2">
                <div className="afs-field">
                    <label className="afs-label">Procedure Code</label>
                    <Select
                        placeholder="Select Procedure Code"
                        options={PROCEDURE_OPTIONS}
                        value={form.procedureCode}
                        onChange={updateField("procedureCode")}
                    />
                </div>
                <div className="afs-field">
                    <label className="afs-label">Select Provider</label>
                    <Select
                        placeholder="Select Provider"
                        options={PROVIDER_OPTIONS}
                        value={form.provider}
                        onChange={updateField("provider")}
                        showSearch
                        optionFilterProp="label"
                    />
                </div>
            </div>

            <div className="afs-row afs-row-2">
                <div className="afs-field">
                    <label className="afs-label">Select Payer</label>
                    <Select
                        placeholder="Select Payer"
                        options={PAYER_OPTIONS}
                        value={form.payerName}
                        onChange={updateField("payerName")}
                        showSearch
                        optionFilterProp="label"
                    />
                </div>
                <div className="afs-field">
                    <label className="afs-label">Amount</label>
                    <Input
                        placeholder="Enter Amount"
                        value={form.amount}
                        onChange={updateInput("amount")}
                    />
                </div>
            </div>

            <div className="afs-row afs-row-3">
                <div className="afs-field">
                    <label className="afs-label">Start Date</label>
                    <DatePicker
                        placeholder="Select Category"
                        value={form.startDate}
                        onChange={updateField("startDate")}
                        format="MM/DD/YYYY"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="afs-field">
                    <label className="afs-label">End Date</label>
                    <DatePicker
                        placeholder="Select Category"
                        value={form.endDate}
                        onChange={updateField("endDate")}
                        format="MM/DD/YYYY"
                        style={{ width: "100%" }}
                        disabledDate={(d) =>
                            form.startDate && d && d.isBefore(form.startDate, "day")
                        }
                    />
                </div>
                <div className="afs-field">
                    <label className="afs-label">Status</label>
                    <Select
                        placeholder="Select"
                        options={STATUS_OPTIONS}
                        value={form.status}
                        onChange={updateField("status")}
                    />
                </div>
            </div>

            <div className="afs-modal-footer">
                <Button className="afs-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="afs-submit-btn"
                    onClick={handleSubmit}
                    loading={mutation.isPending}
                >
                    Save Fee Schedule
                </Button>
            </div>
        </Modal>
    );
};

export default AddFeeScheduleModal;
