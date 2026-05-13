import { useEffect, useState } from "react";
import { Modal, Button, Select } from "antd";
import {
    CloseOutlined,
    DownloadOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import "../../styles/masterSettings/uploadDataModal.css";

const ENTITY_TYPE_OPTIONS = [
    { value: "icdCodes", label: "ICD Codes" },
    { value: "cptCodes", label: "CPT Codes" },
    { value: "zCodes", label: "Z Codes" },
    { value: "dsmCodes", label: "DSM Codes" },
    { value: "problemList", label: "Problem List" },
];

const SAMPLE_HEADERS = ["First Name", "Last Name", "Gender", "Date of Birth", "Age"];
const SAMPLE_ROW = ["Henna", "West", "Female", "14-07-1965", "65"];
const COLUMN_LETTERS = ["A", "B", "C", "D", "E"];

const Step = ({ number, label }) => (
    <div className="ud-step-head">
        <span className="ud-step-num">{number}</span>
        <span className="ud-step-label">{label}</span>
    </div>
);

const UploadDataModal = ({ open, onClose, onUpload }) => {
    const [entityType, setEntityType] = useState();
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (open) {
            setEntityType(undefined);
            setFileName("");
        }
    }, [open]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setFileName(file.name);
    };

    const handleDownload = () => {
        console.log("Download blank CSV template", { entityType });
    };

    const handleUpload = () => {
        if (onUpload) onUpload({ entityType, fileName });
        else console.log("Upload data", { entityType, fileName });
        onClose?.();
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
            className="ud-modal"
            style={{ top: 30 }}
        >
            <div className="ud-modal-head">
                <span className="ud-modal-title">Upload</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="ud-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="ud-field">
                <label className="ud-label">Entity Type</label>
                <Select
                    placeholder="Select"
                    options={ENTITY_TYPE_OPTIONS}
                    value={entityType}
                    onChange={setEntityType}
                />
            </div>

            <div className="ud-step">
                <Step number={1} label="Download CSV File" />
                <Button
                    icon={<DownloadOutlined />}
                    className="ud-template-btn"
                    onClick={handleDownload}
                >
                    Download Blank CSV Template
                </Button>
            </div>

            <div className="ud-step">
                <Step number={2} label="Add or edit entity info in CSV templete." />
                <div className="ud-sample-table">
                    <div className="ud-sample-row ud-sample-letters">
                        {COLUMN_LETTERS.map((letter) => (
                            <span key={letter}>{letter}</span>
                        ))}
                    </div>
                    <div className="ud-sample-row ud-sample-headers">
                        {SAMPLE_HEADERS.map((h) => (
                            <span key={h}>{h}</span>
                        ))}
                    </div>
                    <div className="ud-sample-row ud-sample-data">
                        {SAMPLE_ROW.map((cell, i) => (
                            <span key={i}>{cell}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ud-step">
                <Step number={3} label="Upload CSV File" />
                <label className="ud-upload-area">
                    <span className="ud-upload-icon">
                        <UploadOutlined />
                    </span>
                    <span className="ud-upload-text">
                        <span className="ud-upload-link">Click to upload</span>{" "}
                        or drag and drop
                    </span>
                    <span className="ud-upload-hint">
                        Supported formats: jpeg, png, jpg, bmp,
                    </span>
                    {fileName && (
                        <span className="ud-upload-filename">{fileName}</span>
                    )}
                    <input
                        type="file"
                        accept=".csv,.jpeg,.jpg,.png,.bmp"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </label>
            </div>

            <div className="ud-modal-footer">
                <Button className="ud-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="ud-upload-btn"
                    onClick={handleUpload}
                >
                    Upload
                </Button>
            </div>
        </Modal>
    );
};

export default UploadDataModal;
