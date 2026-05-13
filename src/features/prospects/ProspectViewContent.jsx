import { Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { PROSPECT_STATUS_COLORS } from "./constants";

const cleanId = (id) => String(id ?? "").replace(/^#/, "");

const extractYear = (dob) => {
    if (!dob) return null;
    const parts = String(dob).split("/");
    const year = Number(parts[parts.length - 1]);
    return Number.isFinite(year) ? year : null;
};

const calcAge = (dob) => {
    const year = extractYear(dob);
    if (!year) return "-";
    return `${new Date().getFullYear() - year}Y`;
};

const Field = ({ label, value }) => (
    <div className="prospect-view-field">
        <span className="prospect-view-field-label">{label}</span>
        <span className="prospect-view-field-value">{value || "-"}</span>
    </div>
);

const ProspectViewContent = ({ record, onClose }) => {
    if (!record) return null;

    return (
        <div className="prospect-view-popover">
            <div className="prospect-view-popover-header">
                <span className="prospect-view-popover-title">View Profile</span>
                <CloseOutlined
                    className="prospect-view-popover-close"
                    onClick={onClose}
                />
            </div>

            <div className="prospect-view-card">
                <div className="prospect-view-header">
                    <div className="prospect-view-name">
                        <span className="prospect-view-name-text">{record.name}</span>
                        <span className="prospect-view-id">
                            ({cleanId(record.id)})
                        </span>
                    </div>
                    {record.status && (
                        <Tag
                            color={PROSPECT_STATUS_COLORS[record.status] ?? "default"}
                        >
                            {record.status}
                        </Tag>
                    )}
                </div>

                <div className="prospect-view-row">
                    <Field label="DOB" value={record.dob} />
                    <Field label="Age" value={calcAge(record.dob)} />
                    <Field label="Gender" value={record.sex} />
                </div>

                <div className="prospect-view-row">
                    <Field label="Phone No." value={record.cellNumber} />
                    <Field label="Email" value={record.email} />
                </div>
            </div>
        </div>
    );
};

export default ProspectViewContent;
