import { useCallback, useMemo, useState } from "react";
import { Alert, Button, Input } from "antd";
import {
    ArrowLeftOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FeeScheduleTable from "../features/billing/FeeScheduleTable";
import AddFeeScheduleModal from "../features/billing/AddFeeScheduleModal";
import { useFeeSchedule } from "../hooks/useFeeSchedule";
import "../styles/billing/feeSchedule.css";

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

const FeeSchedule = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [addOpen, setAddOpen] = useState(false);

    const query = useFeeSchedule();

    const filteredData = useMemo(() => {
        if (!Array.isArray(query.data)) return [];
        return query.data.filter((row) => matchesText(row, searchText));
    }, [query.data, searchText]);

    const handleBack = useCallback(() => navigate("/settings"), [navigate]);

    return (
        <div className="fs-page">
            <div className="fs-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    className="fs-back-btn"
                    onClick={handleBack}
                    aria-label="Back"
                />
                <span className="fs-title">Fee Schedule</span>

                <div className="fs-header-actions">
                    <Input
                        className="fs-search"
                        placeholder="Search..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="fs-add-btn"
                        onClick={() => setAddOpen(true)}
                    >
                        Add New Fee Schedule
                    </Button>
                </div>
            </div>

            <div className="fs-card">
                {query.isError ? (
                    <Alert
                        type="error"
                        message="Failed to load fee schedule"
                        description={query.error?.message}
                        action={
                            <button
                                onClick={() => query.refetch()}
                                className="fs-retry-btn"
                            >
                                Retry
                            </button>
                        }
                    />
                ) : (
                    <FeeScheduleTable
                        data={filteredData}
                        loading={query.isLoading}
                    />
                )}
            </div>

            <AddFeeScheduleModal
                open={addOpen}
                onClose={() => setAddOpen(false)}
            />
        </div>
    );
};

export default FeeSchedule;
