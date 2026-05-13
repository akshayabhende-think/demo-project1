import { useEffect, useState } from "react";
import { Modal, Button, Input, Select } from "antd";
import {
    CloseOutlined,
    UploadOutlined,
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import "../../styles/practice/editPracticeProfileModal.css";

const PLACE_OF_SERVICE_OPTIONS = [
    { value: "office", label: "Office" },
    { value: "clinic", label: "Clinic" },
    { value: "hospital", label: "Hospital" },
];

const SPECIALTY_OPTIONS = [
    { value: "primaryCare", label: "Primary Care" },
    { value: "behavioralHealth", label: "Behavioral Health" },
    { value: "multispeciality", label: "Multispeciality" },
];

const TIMEZONE_OPTIONS = [
    { value: "utc", label: "(UTC) Coordinated Universal Time" },
    { value: "pst", label: "(UTC-08:00) Pacific Time" },
    { value: "est", label: "(UTC-05:00) Eastern Time" },
];

const ID_QUALIFIER_OPTIONS = [
    { value: "EI", label: "EI - Employer Identification" },
    { value: "SY", label: "SY - Social Security" },
    { value: "PI", label: "PI - Payer Identification" },
    { value: "XX", label: "XX - NPI" },
];

const buildInitialState = () => ({
    practiceName: "",
    placeOfService: undefined,
    contactNumber: "",
    contactPerson: "",
    specialty: undefined,
    emailId: "",
    website: "",
    timeZone: undefined,
    groupNpi: "",
    faxId: "",
    information: "",
    qualifiers: [{ id: 1, qualifier: undefined, number: "" }],
});

const EditPracticeProfileModal = ({ open, onClose, onSave }) => {
    const [form, setForm] = useState(buildInitialState);

    useEffect(() => {
        if (open) setForm(buildInitialState());
    }, [open]);

    const updateField = (field, value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const updateQualifier = (rowId, next) =>
        setForm((prev) => ({
            ...prev,
            qualifiers: prev.qualifiers.map((row) =>
                row.id === rowId ? { ...row, ...next } : row
            ),
        }));

    const removeQualifier = (rowId) =>
        setForm((prev) => ({
            ...prev,
            qualifiers: prev.qualifiers.filter((row) => row.id !== rowId),
        }));

    const addQualifier = () =>
        setForm((prev) => ({
            ...prev,
            qualifiers: [
                ...prev.qualifiers,
                { id: Date.now(), qualifier: undefined, number: "" },
            ],
        }));

    const canSave = form.practiceName.trim().length > 0;

    const handleSave = () => {
        if (!canSave) return;
        if (onSave) onSave(form);
        else { /* console.log("Save practice profile", form); */ }
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
            className="epp-modal"
            style={{ top: 30 }}
        >
            <div className="epp-modal-head">
                <span className="epp-modal-title">Edit Practice Profile</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="epp-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="epp-top-row">
                <div className="epp-logo-block">
                    <span className="epp-label">Practice Logo</span>
                    <button type="button" className="epp-logo-upload">
                        <UploadOutlined />
                        <span>Upload Image</span>
                        <span className="epp-logo-hint">up to 5MB.</span>
                    </button>
                </div>

                <div className="epp-top-fields">
                    <div className="epp-field">
                        <label className="epp-label">Practice Name</label>
                        <Input
                            placeholder="Enter Practice Name"
                            value={form.practiceName}
                            onChange={(e) =>
                                updateField("practiceName", e.target.value)
                            }
                        />
                    </div>
                    <div className="epp-field">
                        <label className="epp-label">Place of Service</label>
                        <Select
                            placeholder="Select Place of Service"
                            options={PLACE_OF_SERVICE_OPTIONS}
                            value={form.placeOfService}
                            onChange={(v) => updateField("placeOfService", v)}
                        />
                    </div>
                    <div className="epp-field">
                        <label className="epp-label">Contact Number</label>
                        <Input
                            placeholder="Enter Contact Number"
                            value={form.contactNumber}
                            onChange={(e) =>
                                updateField("contactNumber", e.target.value)
                            }
                        />
                    </div>
                    <div className="epp-field">
                        <label className="epp-label">Contact Person</label>
                        <Input
                            placeholder="Enter Contact Person Name"
                            value={form.contactPerson}
                            onChange={(e) =>
                                updateField("contactPerson", e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="epp-grid epp-grid-3">
                <div className="epp-field">
                    <label className="epp-label">Specialty Type</label>
                    <Select
                        placeholder="Select Specialty Type"
                        options={SPECIALTY_OPTIONS}
                        value={form.specialty}
                        onChange={(v) => updateField("specialty", v)}
                    />
                </div>
                <div className="epp-field">
                    <label className="epp-label">Email Id</label>
                    <Input
                        placeholder="Enter Email Id"
                        value={form.emailId}
                        onChange={(e) => updateField("emailId", e.target.value)}
                    />
                </div>
                <div className="epp-field">
                    <label className="epp-label">Website</label>
                    <Input
                        placeholder="Enter Website URL"
                        value={form.website}
                        onChange={(e) => updateField("website", e.target.value)}
                    />
                </div>

                <div className="epp-field">
                    <label className="epp-label">Time Zone</label>
                    <Select
                        placeholder="Select Time Zone"
                        options={TIMEZONE_OPTIONS}
                        value={form.timeZone}
                        onChange={(v) => updateField("timeZone", v)}
                    />
                </div>
                <div className="epp-field">
                    <label className="epp-label">Group NPI Number</label>
                    <Input
                        placeholder="Enter Group NPI Number"
                        value={form.groupNpi}
                        onChange={(e) =>
                            updateField("groupNpi", e.target.value)
                        }
                    />
                </div>
                <div className="epp-field">
                    <label className="epp-label">Fax Id</label>
                    <Input
                        placeholder="Enter Fax Id"
                        value={form.faxId}
                        onChange={(e) => updateField("faxId", e.target.value)}
                    />
                </div>
            </div>

            <div className="epp-field">
                <label className="epp-label">Information</label>
                <Input.TextArea
                    rows={3}
                    placeholder="Enter Information"
                    value={form.information}
                    onChange={(e) =>
                        updateField("information", e.target.value)
                    }
                />
            </div>

            <div className="epp-qualifier-block">
                <div className="epp-qualifier-head">
                    <span className="epp-label">ID Qualifier</span>
                    <button
                        type="button"
                        className="epp-add-link"
                        onClick={addQualifier}
                    >
                        <PlusOutlined /> Add
                    </button>
                    <span className="epp-label epp-qualifier-num-label">
                        Number
                    </span>
                </div>

                {form.qualifiers.map((row) => (
                    <div key={row.id} className="epp-qualifier-row">
                        <Select
                            placeholder="Select"
                            options={ID_QUALIFIER_OPTIONS}
                            value={row.qualifier}
                            onChange={(v) =>
                                updateQualifier(row.id, { qualifier: v })
                            }
                        />
                        <Input
                            placeholder="Enter Number"
                            value={row.number}
                            onChange={(e) =>
                                updateQualifier(row.id, {
                                    number: e.target.value,
                                })
                            }
                        />
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            className="epp-qualifier-remove"
                            onClick={() => removeQualifier(row.id)}
                            disabled={form.qualifiers.length <= 1}
                            aria-label="Remove qualifier"
                        />
                    </div>
                ))}
            </div>

            <div className="epp-modal-footer">
                <Button className="epp-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="epp-save-btn"
                    onClick={handleSave}
                    disabled={!canSave}
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default EditPracticeProfileModal;
