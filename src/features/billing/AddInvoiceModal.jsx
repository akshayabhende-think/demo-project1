import { useEffect, useMemo, useState } from "react";
import { Modal, Input, Select, DatePicker, Button } from "antd";
import {
    PlusOutlined,
    PrinterOutlined,
    HolderOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "../../styles/billing/addInvoiceModal.css";

const COUNSELLOR_OPTIONS = [
    { value: "Albert Flores", label: "Albert Flores" },
    { value: "Mark Wood", label: "Mark Wood" },
    { value: "Devon Lane", label: "Devon Lane" },
    { value: "Ralph Edwards", label: "Ralph Edwards" },
];

const SERVICE_OPTIONS = [
    { value: "Individual counseling", label: "Individual counseling" },
    { value: "Group counseling", label: "Group counseling" },
    { value: "Family counseling", label: "Family counseling" },
    { value: "Initial assessment", label: "Initial assessment" },
];

const CLIENT_OPTIONS_FALLBACK = [
    { value: "Bessie Cooper", label: "Bessie Cooper" },
    { value: "Olivia Rhye", label: "Olivia Rhye" },
    { value: "Cameron Williamson", label: "Cameron Williamson" },
    { value: "Esther Howard", label: "Esther Howard" },
];

const parseAmount = (val) => {
    const num = parseFloat(val);
    return Number.isFinite(num) ? num : 0;
};

const formatAmount = (val) => val.toFixed(2);

const buildInitialState = (encounter) => ({
    client: encounter?.clientName ?? undefined,
    clientEmail: "",
    dueDate: null,
    counsellor: encounter?.counsellor ?? undefined,
    services: [{ id: 1, service: undefined, total: "0.00" }],
    discount: "0.00",
    note: "",
});

const AddInvoiceModal = ({ open, onClose, encounter }) => {
    const [form, setForm] = useState(() => buildInitialState(encounter));

    useEffect(() => {
        if (open) setForm(buildInitialState(encounter));
    }, [open, encounter]);

    const updateField = (field, value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const updateService = (rowId, next) =>
        setForm((prev) => ({
            ...prev,
            services: prev.services.map((row) =>
                row.id === rowId ? { ...row, ...next } : row
            ),
        }));

    const addService = () =>
        setForm((prev) => ({
            ...prev,
            services: [
                ...prev.services,
                { id: Date.now(), service: undefined, total: "0.00" },
            ],
        }));

    const subtotal = useMemo(
        () =>
            form.services.reduce((sum, row) => sum + parseAmount(row.total), 0),
        [form.services]
    );

    const discountAmount = parseAmount(form.discount);
    const total = Math.max(subtotal - discountAmount, 0);
    const coPay = 100;

    const clientOptions = useMemo(() => {
        const base = [...CLIENT_OPTIONS_FALLBACK];
        if (form.client && !base.some((opt) => opt.value === form.client)) {
            base.unshift({ value: form.client, label: form.client });
        }
        return base;
    }, [form.client]);

    const handleSave = () => {
        console.log("Save invoice", form);
        onClose?.();
    };

    const handlePrint = () => {
        console.log("Print invoice", form);
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
            className="inv-modal"
            style={{ top: 20 }}
        >
            <div className="inv-modal-head">
                <span className="inv-modal-title">Add Invoice</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="inv-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="inv-grid inv-grid-4">
                <div className="inv-field">
                    <label className="inv-label">Client</label>
                    <Select
                        options={clientOptions}
                        value={form.client}
                        onChange={(v) => updateField("client", v)}
                        placeholder="Select Client"
                    />
                </div>
                <div className="inv-field">
                    <label className="inv-label">Client Email</label>
                    <Input
                        value={form.clientEmail}
                        onChange={(e) =>
                            updateField("clientEmail", e.target.value)
                        }
                        placeholder="Enter Client Email"
                    />
                </div>
                <div className="inv-field">
                    <label className="inv-label">Due Date</label>
                    <DatePicker
                        value={form.dueDate}
                        onChange={(v) => updateField("dueDate", v)}
                        format="DD/MM/YYYY"
                        placeholder="Select"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="inv-field">
                    <label className="inv-label">Counsellor</label>
                    <Select
                        options={COUNSELLOR_OPTIONS}
                        value={form.counsellor}
                        onChange={(v) => updateField("counsellor", v)}
                        placeholder="Select Counsellor"
                    />
                </div>
            </div>

            <div className="inv-service-block">
                <label className="inv-label">Service</label>
                <div className="inv-service-card">
                    <div className="inv-service-head">
                        <span>Service</span>
                        <span className="inv-total-head">Total</span>
                    </div>
                    {form.services.map((row) => (
                        <div key={row.id} className="inv-service-row">
                            <HolderOutlined className="inv-drag" />
                            <Select
                                className="inv-service-select"
                                options={SERVICE_OPTIONS}
                                value={row.service}
                                onChange={(v) =>
                                    updateService(row.id, { service: v })
                                }
                                placeholder="Search & Select Service"
                                showSearch
                            />
                            <Input
                                className="inv-total-input"
                                value={row.total}
                                onChange={(e) =>
                                    updateService(row.id, {
                                        total: e.target.value,
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="inv-add-service-btn"
                    onClick={addService}
                >
                    <PlusOutlined /> Add Services
                </button>
            </div>

            <div className="inv-summary">
                <div className="inv-summary-row">
                    <span className="inv-summary-label">SUBTOTAL</span>
                    <span className="inv-summary-value">
                        {formatAmount(subtotal)}
                    </span>
                </div>
                <div className="inv-summary-row">
                    <span className="inv-summary-label">DISCOUNT</span>
                    <Input
                        className="inv-summary-input"
                        value={form.discount}
                        onChange={(e) =>
                            updateField("discount", e.target.value)
                        }
                    />
                </div>
                <div className="inv-summary-row">
                    <span className="inv-summary-label">TOTAL</span>
                    <span className="inv-summary-value">
                        {formatAmount(total)}
                    </span>
                </div>
            </div>

            <div className="inv-copay-row">
                <span>Total Patient Responsibility (Co-pay):</span>
                <span className="inv-copay-value">
                    ${coPay.toFixed(2)}
                </span>
            </div>

            <div className="inv-field inv-note-field">
                <label className="inv-label">Invoice Note</label>
                <Input.TextArea
                    rows={3}
                    placeholder="Type here..."
                    value={form.note}
                    onChange={(e) => updateField("note", e.target.value)}
                />
            </div>

            <div className="inv-modal-footer">
                <Button className="inv-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    icon={<PrinterOutlined />}
                    className="inv-print-btn"
                    onClick={handlePrint}
                >
                    Print
                </Button>
                <Button
                    type="primary"
                    className="inv-save-btn"
                    onClick={handleSave}
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default AddInvoiceModal;
