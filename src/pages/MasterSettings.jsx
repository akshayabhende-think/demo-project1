import { useCallback, useMemo, useState } from "react";
import { Alert, Button, Input } from "antd";
import {
    ArrowLeftOutlined,
    PlusOutlined,
    SearchOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { MASTER_TABS } from "../features/masterSettings/constants";
import DataImportsTable from "../features/masterSettings/DataImportsTable";
import CptCodesTable from "../features/masterSettings/CptCodesTable";
import ZCodesTable from "../features/masterSettings/ZCodesTable";
import DsmCodesTable from "../features/masterSettings/DsmCodesTable";
import ProblemListTable from "../features/masterSettings/ProblemListTable";
import UploadDataModal from "../features/masterSettings/UploadDataModal";
import AddProblemModal from "../features/masterSettings/AddProblemModal";
import { useDataImports } from "../hooks/useDataImports";
import { useCptCodes } from "../hooks/useCptCodes";
import { useZCodes } from "../hooks/useZCodes";
import { useDsmCodes } from "../hooks/useDsmCodes";
import { useProblemList } from "../hooks/useProblemList";
import "../styles/masterSettings/masterSettings.css";

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

const MasterSettings = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialTab = location.state?.initialTab ?? "icdCodes";

    const [activeTab, setActiveTab] = useState(initialTab);
    const [searchText, setSearchText] = useState("");
    const [uploadOpen, setUploadOpen] = useState(false);
    const [addProblemOpen, setAddProblemOpen] = useState(false);

    const isCptCodes = activeTab === "cptCodes";
    const isZCodes = activeTab === "zCodes";
    const isDsmCodes = activeTab === "dsmCodes";
    const isProblemList = activeTab === "problemList";
    const isCustomTable = isCptCodes || isZCodes || isDsmCodes || isProblemList;

    const importsQuery = useDataImports(!isCustomTable);
    const cptQuery = useCptCodes(isCptCodes);
    const zQuery = useZCodes(isZCodes);
    const dsmQuery = useDsmCodes(isDsmCodes);
    const problemQuery = useProblemList(isProblemList);

    let activeQuery = importsQuery;
    if (isCptCodes) activeQuery = cptQuery;
    else if (isZCodes) activeQuery = zQuery;
    else if (isDsmCodes) activeQuery = dsmQuery;
    else if (isProblemList) activeQuery = problemQuery;

    const filteredData = useMemo(() => {
        if (!Array.isArray(activeQuery.data)) return [];
        return activeQuery.data.filter((row) => matchesText(row, searchText));
    }, [activeQuery.data, searchText]);

    const handleBack = useCallback(() => navigate("/settings"), [navigate]);
    const handleUpload = useCallback(() => {
        setUploadOpen(true);
    }, []);

    return (
        <div className="ms-page">
            <div className="ms-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    className="ms-back-btn"
                    onClick={handleBack}
                    aria-label="Back"
                />
                <span className="ms-title">Master Settings</span>

                <div className="ms-header-actions">
                    <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        className="ms-upload-btn"
                        onClick={handleUpload}
                    >
                        Upload Data
                    </Button>
                </div>
            </div>

            <div className="ms-card">
                <div className="ms-toolbar">
                    <div className="ms-tabs" role="tablist">
                        {MASTER_TABS.map(({ key, label }) => {
                            const isActive = activeTab === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`ms-tab ${isActive ? "is-active" : ""}`}
                                    onClick={() => setActiveTab(key)}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="ms-toolbar-right">
                        <Input
                            className="ms-search"
                            placeholder="Search..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            allowClear
                        />
                        {isZCodes && (
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className="ms-add-btn"
                                onClick={() => console.log("Add Z Code")}
                            >
                                Add Z Codes
                            </Button>
                        )}
                        {isDsmCodes && (
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className="ms-add-btn"
                                onClick={() => console.log("Add DSM Code")}
                            >
                                Add DSM Codes
                            </Button>
                        )}
                        {isProblemList && (
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className="ms-add-btn"
                                onClick={() => setAddProblemOpen(true)}
                            >
                                Add Problem
                            </Button>
                        )}
                    </div>
                </div>

                {activeQuery.isError ? (
                    <Alert
                        type="error"
                        message="Failed to load data"
                        description={activeQuery.error?.message}
                        action={
                            <button
                                onClick={() => activeQuery.refetch()}
                                className="ms-retry-btn"
                            >
                                Retry
                            </button>
                        }
                    />
                ) : isCptCodes ? (
                    <CptCodesTable
                        data={filteredData}
                        loading={activeQuery.isLoading}
                    />
                ) : isZCodes ? (
                    <ZCodesTable
                        data={filteredData}
                        loading={activeQuery.isLoading}
                    />
                ) : isDsmCodes ? (
                    <DsmCodesTable
                        data={filteredData}
                        loading={activeQuery.isLoading}
                    />
                ) : isProblemList ? (
                    <ProblemListTable
                        data={filteredData}
                        loading={activeQuery.isLoading}
                    />
                ) : (
                    <DataImportsTable
                        data={filteredData}
                        loading={activeQuery.isLoading}
                    />
                )}
            </div>

            <UploadDataModal
                open={uploadOpen}
                onClose={() => setUploadOpen(false)}
            />

            <AddProblemModal
                open={addProblemOpen}
                onClose={() => setAddProblemOpen(false)}
            />
        </div>
    );
};

export default MasterSettings;
