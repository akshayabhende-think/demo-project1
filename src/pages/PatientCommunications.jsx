import { useCallback, useMemo, useState } from "react";
import { Alert, Button, Input } from "antd";
import {
    ArrowLeftOutlined,
    SearchOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RemindersTable from "../features/patientCommunications/RemindersTable";
import { useReminders } from "../hooks/useReminders";
import "../styles/patientCommunications/patientCommunications.css";

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

const PatientCommunications = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const remindersQuery = useReminders();
    const { data, isLoading, isError, error, refetch } = remindersQuery;

    const filteredData = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.filter((row) => matchesText(row, searchText));
    }, [data, searchText]);

    const handleBack = useCallback(() => navigate("/settings"), [navigate]);
    const handleAddReminder = useCallback(() => {
        console.log("Add reminder");
    }, []);

    return (
        <div className="pcom-page">
            <div className="pcom-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    className="pcom-back-btn"
                    onClick={handleBack}
                    aria-label="Back"
                />
                <span className="pcom-title">Patient Communications</span>

                <div className="pcom-header-actions">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="pcom-add-btn"
                        onClick={handleAddReminder}
                    >
                        Add Reminder
                    </Button>
                </div>
            </div>

            <div className="pcom-card">
                <div className="pcom-card-head">
                    <div>
                        <h3 className="pcom-card-title">Reminders</h3>
                        <p className="pcom-card-sub">
                            Manage automated reminders sent to patients via
                            email and SMS.
                        </p>
                    </div>
                    <Input
                        className="pcom-search"
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                </div>

                {isError ? (
                    <Alert
                        type="error"
                        message="Failed to load reminders"
                        description={error?.message}
                        action={
                            <button
                                onClick={() => refetch()}
                                className="pcom-retry-btn"
                            >
                                Retry
                            </button>
                        }
                    />
                ) : (
                    <RemindersTable data={filteredData} loading={isLoading} />
                )}
            </div>
        </div>
    );
};

export default PatientCommunications;
