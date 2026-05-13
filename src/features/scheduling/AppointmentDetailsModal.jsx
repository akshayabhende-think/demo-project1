import { useEffect, useState } from "react";
import { Modal, Select, Tag } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const STATUS_TAG_COLOR = {
    Scheduled: "blue",
    SCHEDULED: "blue",
    Cancelled: "blue",
    CANCELLED: "blue",
    Completed: "green",
    COMPLETED: "green",
    "No Show": "orange",
    "NO SHOW": "orange",
    Error: "red",
};

const STATUS_OPTIONS = [
    { value: "Scheduled", label: "Scheduled", color: "#1677ff" },
    { value: "Cancelled", label: "Cancel", color: "#dc2626" },
    { value: "Completed", label: "Completed", color: "#059669" },
    { value: "No Show", label: "No Show", color: "#f97316" },
];

const DEFAULT_FORMS = [
    "Health Questionnaire",
    "BQuIP",
    "CalOMS",
    "Physical Exam History",
];

const cleanId = (id) => String(id ?? "").replace(/^#/, "");

const formatYearMask = (dob) => {
    if (!dob) return "--";
    const parts = String(dob).split("/");
    return `**/**/${parts[parts.length - 1]}`;
};

const computeAge = (dob) => {
    if (!dob) return "--";
    const parts = String(dob).split("/");
    const year = Number(parts[parts.length - 1]);
    if (!Number.isFinite(year)) return "--";
    return `${new Date().getFullYear() - year}Y`;
};

const formatDateTime = (date, start) => {
    if (!date) return "--";
    const [y, m, d] = String(date).split("-");
    const dateStr = `${m}/${d}/${y}`;
    if (!start) return dateStr;
    const [hh, mm] = String(start).split(":").map(Number);
    const period = hh >= 12 ? "PM" : "AM";
    const h12 = hh % 12 || 12;
    return `${dateStr}, ${h12}:${String(mm).padStart(2, "0")} ${period}`;
};

const Field = ({ label, value }) => (
    <div className="appt-modal-field">
        <span className="appt-modal-field-label">{label}</span>
        <span className="appt-modal-field-value">{value || "--"}</span>
    </div>
);

const DobField = ({ dob }) => {
    const [visible, setVisible] = useState(false);
    const ToggleIcon = visible ? EyeInvisibleOutlined : EyeOutlined;
    return (
        <div className="appt-modal-field">
            <span className="appt-modal-field-label">DOB :</span>
            <span className="appt-modal-field-value appt-modal-mask">
                {dob ? (visible ? dob : formatYearMask(dob)) : "--"}
                {dob && (
                    <ToggleIcon
                        className="appt-modal-mask-toggle"
                        onClick={() => setVisible((v) => !v)}
                    />
                )}
            </span>
        </div>
    );
};

const AppointmentDetailsModal = ({ open, record, onClose, onStatusChange }) => {
    const [status, setStatus] = useState(record?.status);

    useEffect(() => {
        setStatus(record?.status);
    }, [record]);

    if (!record) return null;

    const dob = record.dob ?? null;
    const forms = record.forms ?? DEFAULT_FORMS;

    const handleStatusChange = (val) => {
        setStatus(val);
        onStatusChange?.(record, val);
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={720}
            destroyOnClose
            title={
                <div className="appt-modal-title">
                    <span className="appt-modal-title-text">
                        Appointment Details
                    </span>
                    <Tag
                        color={STATUS_TAG_COLOR[record.status] ?? "default"}
                        className="appt-modal-title-status"
                    >
                        {record.status}
                    </Tag>
                </div>
            }
        >
            <div className="appt-modal-body">
                {/* Patient summary */}
                <div className="appt-modal-card appt-modal-card-tinted">
                    <div className="appt-modal-name-row">
                        <span className="appt-modal-name">
                            {record.patientName || "--"}
                        </span>
                        <span className="appt-modal-id">
                            #{cleanId(record.id)}
                        </span>
                    </div>
                    <div className="appt-modal-grid appt-modal-grid-5">
                        <DobField dob={dob} />
                        <Field label="Age :" value={computeAge(dob)} />
                        <Field label="Gender :" value={record.gender ?? "--"} />
                        <Field
                            label="Phone No.:"
                            value={record.phone ?? "--"}
                        />
                        <Field label="Email ID :" value={record.email ?? "--"} />
                    </div>
                </div>

                {/* Appointment info */}
                <div className="appt-modal-card">
                    <div className="appt-modal-grid appt-modal-grid-4">
                        <Field
                            label="Date & Time"
                            value={formatDateTime(record.date, record.start)}
                        />
                        <Field
                            label="Appointment Type"
                            value={record.appointmentType ?? "Initial Screening"}
                        />
                        <Field label="Location" value={record.location ?? "—"} />
                        <Field
                            label="Provider"
                            value={record.counsellorName ?? "--"}
                        />
                    </div>
                </div>

                {/* Forms */}
                <div className="appt-modal-card">
                    <h3 className="appt-modal-section-title">Forms</h3>
                    <ol className="appt-modal-forms">
                        {forms.map((name, i) => (
                            <li key={name}>
                                {i + 1}.{name}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Status change */}
                <div className="appt-modal-status-row">
                    <label className="appt-modal-status-label">
                        Change Status of Appointment
                    </label>
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        className="appt-modal-status-select"
                        options={STATUS_OPTIONS.map((opt) => ({
                            value: opt.value,
                            label: (
                                <span className="appt-modal-status-option">
                                    <span
                                        className="appt-modal-status-dot"
                                        style={{ background: opt.color }}
                                    />
                                    {opt.label}
                                </span>
                            ),
                        }))}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AppointmentDetailsModal;
