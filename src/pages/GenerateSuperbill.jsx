import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Tag,
    Input,
    Select,
    DatePicker,
    Checkbox,
} from "antd";
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useBillingEncounters } from "../hooks/useBillingEncounters";
import "../styles/billing/superbill.css";

const GROUP_NAME_OPTIONS = [
    { value: "Stress Relief", label: "Stress Relief" },
    { value: "Anxiety Support", label: "Anxiety Support" },
    { value: "Family Therapy", label: "Family Therapy" },
];

const PROGRAM_OPTIONS = [
    { value: "Program 1", label: "Program 1" },
    { value: "Program 2", label: "Program 2" },
    { value: "Program 3", label: "Program 3" },
];

const PHASE_OPTIONS = [
    { value: "Phase 1", label: "Phase 1" },
    { value: "Phase 2", label: "Phase 2" },
    { value: "Phase 3", label: "Phase 3" },
];

const GROUP_TYPE_OPTIONS = [
    { value: "Group A", label: "Group A" },
    { value: "Group B", label: "Group B" },
    { value: "Group C", label: "Group C" },
];

const SERVICE_TIME_OPTIONS = [
    { value: "30 Mins", label: "30 Mins" },
    { value: "45 Mins", label: "45 Mins" },
    { value: "60 Mins", label: "60 Mins" },
];

const COUNSELLOR_OPTIONS = [
    { value: "Mark Wood", label: "Mark Wood" },
    { value: "Devon Lane", label: "Devon Lane" },
    { value: "Ralph Edwards", label: "Ralph Edwards" },
    { value: "Albert Flores", label: "Albert Flores" },
];

const SERVICE_OPTIONS = [
    { value: "Individual counseling", label: "Individual counseling" },
    { value: "Group counseling", label: "Group counseling" },
    { value: "Family counseling", label: "Family counseling" },
];

const DEFAULT_ICD_CODES = [
    { code: "Z59.0", label: "Homelessness", checked: true },
    {
        code: "Z59.7",
        label: "Insufficient social insurance/welfare support",
        checked: false,
    },
    {
        code: "Z60.2",
        label: "Problems related to living alone",
        checked: true,
    },
    {
        code: "Z55.0",
        label: "Illiteracy and low-level literacy",
        checked: false,
    },
    {
        code: "Z63.5",
        label: "Disruption of family by separation/divorce",
        checked: true,
    },
];

const PATIENT_DETAILS = {
    Name: "Olivia Rhye",
    Gender: "Female",
    DOB: "21 Oct 1965",
    "Contact Number": "(342) 2345-3932",
    Address: "919 St, Fairbanks, Laska 99710",
};

const INSURANCE_DETAILS = {
    "Insurance Name": "BlueCross BlueShield PPO",
    "Insurance Plan": "PPO Basic 2025",
    "Member ID": "456459845",
    "Group ID": "GRP458920",
    "Insured Group Name": "Group Name A",
};

const parseEncounterDate = (str) => {
    if (!str) return null;
    const [day, month, year] = str.split("/").map(Number);
    if (!day || !month || !year) return null;
    const parsed = dayjs(new Date(year, month - 1, day));
    return parsed.isValid() ? parsed : null;
};

const SidebarSection = ({ title, fields }) => (
    <div className="sb-side-section">
        <div className="sb-side-section-head">
            <span>{title}</span>
            <Button
                type="text"
                icon={<EditOutlined />}
                className="sb-side-edit"
                aria-label={`Edit ${title}`}
            />
        </div>
        <div className="sb-side-fields">
            {Object.entries(fields).map(([label, value]) => (
                <div key={label} className="sb-side-field">
                    <span className="sb-side-label">{label}</span>
                    <span className="sb-side-sep">:</span>
                    <span className="sb-side-value">{value}</span>
                </div>
            ))}
        </div>
    </div>
);

const ServiceRow = ({ index, service, onChange, onRemove, canRemove }) => {
    const handleToggleCode = (code) => {
        onChange({
            ...service,
            codes: service.codes.map((c) =>
                c.code === code ? { ...c, checked: !c.checked } : c
            ),
        });
    };

    return (
        <div className="sb-service-row">
            <div className="sb-service-head">
                <span className="sb-service-num">{index + 1}.</span>
                <div className="sb-service-fields">
                    <label className="sb-field-label">Services</label>
                    <Select
                        className="sb-service-select"
                        options={SERVICE_OPTIONS}
                        value={service.service}
                        onChange={(value) =>
                            onChange({ ...service, service: value })
                        }
                    />
                </div>
                <div className="sb-service-total">
                    <label className="sb-field-label">Total</label>
                    <Input
                        className="sb-total-input"
                        value={service.total}
                        onChange={(e) =>
                            onChange({ ...service, total: e.target.value })
                        }
                    />
                </div>
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    className="sb-service-remove"
                    onClick={onRemove}
                    disabled={!canRemove}
                    aria-label="Remove service"
                />
            </div>
            <div className="sb-attach-codes">
                <div className="sb-attach-codes-label">Attach Code</div>
                <div className="sb-codes-list">
                    {service.codes.map(({ code, label, checked }) => (
                        <Checkbox
                            key={code}
                            checked={checked}
                            onChange={() => handleToggleCode(code)}
                            className="sb-code-row"
                        >
                            <span className="sb-code-text">
                                {code} — {label}
                            </span>
                        </Checkbox>
                    ))}
                </div>
                <button type="button" className="sb-add-icd-btn">
                    <PlusOutlined /> ADD ICD 10 Code
                </button>
            </div>
        </div>
    );
};

const GenerateSuperbill = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useBillingEncounters();

    const encounter = useMemo(
        () =>
            Array.isArray(data)
                ? data.find((row) => String(row.id) === String(id))
                : null,
        [data, id]
    );

    const clientName = encounter?.clientName ?? "";

    const [form, setForm] = useState({
        groupName: "Stress Relief",
        program: "Program 2",
        phase: "Phase 1",
        groupType: "Group B",
        dateOfService: parseEncounterDate(encounter?.dateOfService),
        serviceTime: "30 Mins",
        counsellor: "Mark Wood",
        npiNumber: "1234567890",
    });

    const [services, setServices] = useState([
        {
            id: 1,
            service: "Individual counseling",
            total: "0.00",
            codes: DEFAULT_ICD_CODES.map((c) => ({ ...c })),
        },
    ]);

    const updateForm = (field, value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const updateService = (rowIndex, next) =>
        setServices((prev) =>
            prev.map((row, i) => (i === rowIndex ? next : row))
        );

    const removeService = (rowIndex) =>
        setServices((prev) => prev.filter((_, i) => i !== rowIndex));

    const addService = () =>
        setServices((prev) => [
            ...prev,
            {
                id: Date.now(),
                service: "Individual counseling",
                total: "0.00",
                codes: DEFAULT_ICD_CODES.map((c) => ({ ...c })),
            },
        ]);

    const handleCancel = () => navigate("/billing");
    const handleSave = () => {
        // console.log("Save superbill", { encounterId: id, form, services });
        navigate("/billing");
    };

    const patientFields = useMemo(
        () =>
            clientName
                ? { ...PATIENT_DETAILS, Name: clientName }
                : PATIENT_DETAILS,
        [clientName]
    );

    return (
        <div className="sb-page">
            <div className="sb-header">
                <div className="sb-header-left">
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        className="sb-back-btn"
                        onClick={handleCancel}
                        aria-label="Back"
                    />
                    <span className="sb-title">Generate Superbill</span>
                    {clientName && (
                        <Tag className="sb-client-tag">{clientName}</Tag>
                    )}
                </div>
                <div className="sb-header-actions">
                    <Button className="sb-cancel-btn" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        className="sb-save-btn"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </div>

            <div className="sb-body">
                <div className="sb-form">
                    <section className="sb-section">
                        <h3 className="sb-section-title">Service Details</h3>
                        <div className="sb-grid sb-grid-4">
                            <div className="sb-field">
                                <label className="sb-field-label">
                                    Group Name
                                </label>
                                <Select
                                    options={GROUP_NAME_OPTIONS}
                                    value={form.groupName}
                                    onChange={(v) =>
                                        updateForm("groupName", v)
                                    }
                                />
                            </div>
                            <div className="sb-field">
                                <label className="sb-field-label">
                                    Program
                                </label>
                                <Select
                                    options={PROGRAM_OPTIONS}
                                    value={form.program}
                                    onChange={(v) => updateForm("program", v)}
                                />
                            </div>
                            <div className="sb-field">
                                <label className="sb-field-label">Phase</label>
                                <Select
                                    options={PHASE_OPTIONS}
                                    value={form.phase}
                                    onChange={(v) => updateForm("phase", v)}
                                />
                            </div>
                            <div className="sb-field">
                                <label className="sb-field-label">
                                    Type of Group
                                </label>
                                <Select
                                    options={GROUP_TYPE_OPTIONS}
                                    value={form.groupType}
                                    onChange={(v) =>
                                        updateForm("groupType", v)
                                    }
                                />
                            </div>
                            <div className="sb-field">
                                <label className="sb-field-label">
                                    Date of Service
                                </label>
                                <DatePicker
                                    value={form.dateOfService}
                                    onChange={(v) =>
                                        updateForm("dateOfService", v)
                                    }
                                    format="DD/MM/YYYY"
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div className="sb-field">
                                <label className="sb-field-label">
                                    Service Time
                                </label>
                                <Select
                                    options={SERVICE_TIME_OPTIONS}
                                    value={form.serviceTime}
                                    onChange={(v) =>
                                        updateForm("serviceTime", v)
                                    }
                                    suffixIcon={<ClockCircleOutlined />}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="sb-section">
                        <h3 className="sb-section-title">
                            Counsellor Details
                        </h3>
                        <div className="sb-grid sb-grid-2">
                            <div className="sb-field">
                                <label className="sb-field-label">
                                    Counsellor
                                </label>
                                <Select
                                    options={COUNSELLOR_OPTIONS}
                                    value={form.counsellor}
                                    onChange={(v) =>
                                        updateForm("counsellor", v)
                                    }
                                />
                            </div>
                            <div className="sb-field">
                                <label className="sb-field-label">
                                    NPI Number
                                </label>
                                <Input
                                    value={form.npiNumber}
                                    onChange={(e) =>
                                        updateForm(
                                            "npiNumber",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    <section className="sb-section sb-coding-section">
                        <div className="sb-coding-head">
                            <h3 className="sb-section-title">Coding</h3>
                            <Button
                                type="primary"
                                ghost
                                icon={<PlusOutlined />}
                                className="sb-procedure-btn"
                                onClick={addService}
                            >
                                Procedure
                            </Button>
                        </div>
                        <div className="sb-services">
                            {services.map((service, index) => (
                                <ServiceRow
                                    key={service.id}
                                    index={index}
                                    service={service}
                                    onChange={(next) =>
                                        updateService(index, next)
                                    }
                                    onRemove={() => removeService(index)}
                                    canRemove={services.length > 1}
                                />
                            ))}
                        </div>
                        <div className="sb-charges-row">
                            <span className="sb-charges-label">
                                Procedural Charges
                            </span>
                            <span className="sb-charges-value">704.00</span>
                        </div>
                    </section>
                </div>

                <aside className="sb-sidebar">
                    <h3 className="sb-sidebar-title">Billing Details</h3>
                    <SidebarSection
                        title="Patient Details"
                        fields={patientFields}
                    />
                    <SidebarSection
                        title="Insurance Details"
                        fields={INSURANCE_DETAILS}
                    />
                    <SidebarSection
                        title="Counsellor"
                        fields={{ Counsellor: "Devon Lane" }}
                    />
                </aside>
            </div>
        </div>
    );
};

export default GenerateSuperbill;
