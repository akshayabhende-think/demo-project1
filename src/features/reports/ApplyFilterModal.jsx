import { useEffect, useState } from "react";
import { Modal, Button, Select, DatePicker } from "antd";
import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";
import "../../styles/reports/applyFilterModal.css";

const { RangePicker } = DatePicker;

const RISK_OPTIONS = [
    { value: "None", label: "None" },
    { value: "Low", label: "Low" },
    { value: "Moderate", label: "Moderate" },
    { value: "High", label: "High" },
];

const EMPTY_DRAFT = {
    dateRange: null,
    counselor: undefined,
    program: undefined,
    riskLevel: undefined,
};

const toOptions = (values) =>
    values.map((v) => ({ value: v, label: v }));

const ApplyFilterModal = ({
    open,
    onClose,
    onApply,
    initial,
    counselorOptions = [],
    programOptions = [],
}) => {
    const [draft, setDraft] = useState(EMPTY_DRAFT);

    useEffect(() => {
        if (open) setDraft(initial ?? EMPTY_DRAFT);
    }, [open, initial]);

    const setField = (field) => (value) =>
        setDraft((prev) => ({ ...prev, [field]: value }));

    const handleReset = () => setDraft(EMPTY_DRAFT);

    const handleApply = () => {
        onApply?.(draft);
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
            className="af-modal"
        >
            <div className="af-modal-head">
                <span className="af-modal-title">Apply Filter</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="af-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="af-body">
                <div className="af-field">
                    <label className="af-label">Date Range</label>
                    <RangePicker
                        placeholder={["Select Date", "Select Date"]}
                        value={draft.dateRange}
                        onChange={setField("dateRange")}
                        format="DD/MM/YYYY"
                        style={{ width: "100%" }}
                    />
                </div>

                <div className="af-field">
                    <label className="af-label">Counselor</label>
                    <Select
                        placeholder="Select Counselor"
                        options={toOptions(counselorOptions)}
                        value={draft.counselor}
                        onChange={setField("counselor")}
                        showSearch
                        optionFilterProp="label"
                        allowClear
                    />
                </div>

                <div className="af-field">
                    <label className="af-label">Program</label>
                    <Select
                        placeholder="Select Program"
                        options={toOptions(programOptions)}
                        value={draft.program}
                        onChange={setField("program")}
                        allowClear
                    />
                </div>

                <div className="af-field">
                    <label className="af-label">Risk level</label>
                    <Select
                        placeholder="Select Risk level"
                        options={RISK_OPTIONS}
                        value={draft.riskLevel}
                        onChange={setField("riskLevel")}
                        allowClear
                    />
                </div>
            </div>

            <div className="af-modal-footer">
                <Button className="af-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <div className="af-footer-right">
                    <Button
                        icon={<ReloadOutlined />}
                        className="af-reset-btn"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        type="primary"
                        className="af-apply-btn"
                        onClick={handleApply}
                    >
                        Apply Filter
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ApplyFilterModal;
