import { useCallback, useMemo, useState } from "react";
import { Alert, Button, Input } from "antd";
import {
    ArrowLeftOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import TemplatesTable from "../features/templates/TemplatesTable";
import MacrosTable from "../features/templates/MacrosTable";
import AddMacroModal from "../features/templates/AddMacroModal";
import AddNoteFormatModal from "../features/templates/AddNoteFormatModal";
import { useNoteTemplates } from "../hooks/useNoteTemplates";
import { useMacros } from "../hooks/useMacros";
import "../styles/templates/templates.css";

const TABS = [
    { key: "note", label: "Note" },
    { key: "macros", label: "Macros" },
];

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

const Templates = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialTab = location.state?.initialTab ?? "note";

    const [activeTab, setActiveTab] = useState(initialTab);
    const [searchText, setSearchText] = useState("");
    const [addMacroOpen, setAddMacroOpen] = useState(false);
    const [addNoteOpen, setAddNoteOpen] = useState(false);

    const isNote = activeTab === "note";
    const isMacros = activeTab === "macros";

    const noteQuery = useNoteTemplates(isNote);
    const macrosQuery = useMacros(isMacros);
    const activeQuery = isNote ? noteQuery : macrosQuery;

    const filteredData = useMemo(() => {
        if (!Array.isArray(activeQuery.data)) return [];
        return activeQuery.data.filter((row) => matchesText(row, searchText));
    }, [activeQuery.data, searchText]);

    const handleBack = useCallback(() => navigate("/settings"), [navigate]);

    const addLabel = isNote ? "Add New Note" : "Create New Macros";

    return (
        <div className="tpl-page">
            <div className="tpl-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    className="tpl-back-btn"
                    onClick={handleBack}
                    aria-label="Back"
                />
                <span className="tpl-title">Templates</span>
            </div>

            <div className="tpl-card">
                <div className="tpl-toolbar">
                    <div className="tpl-tabs" role="tablist">
                        {TABS.map(({ key, label }) => {
                            const isActive = activeTab === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`tpl-tab ${isActive ? "is-active" : ""}`}
                                    onClick={() => setActiveTab(key)}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="tpl-toolbar-right">
                        <Input
                            className="tpl-search"
                            placeholder="Search..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            allowClear
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            className="tpl-add-btn"
                            onClick={() => {
                                if (isMacros) setAddMacroOpen(true);
                                else setAddNoteOpen(true);
                            }}
                        >
                            {addLabel}
                        </Button>
                    </div>
                </div>

                {activeQuery.isError ? (
                    <Alert
                        type="error"
                        message="Failed to load templates"
                        description={activeQuery.error?.message}
                        action={
                            <button
                                onClick={() => activeQuery.refetch()}
                                className="tpl-retry-btn"
                            >
                                Retry
                            </button>
                        }
                    />
                ) : isNote ? (
                    <TemplatesTable
                        data={filteredData}
                        loading={activeQuery.isLoading}
                        typeLabel="Note Type"
                    />
                ) : (
                    <MacrosTable
                        data={filteredData}
                        loading={activeQuery.isLoading}
                    />
                )}
            </div>

            <AddMacroModal
                open={addMacroOpen}
                onClose={() => setAddMacroOpen(false)}
            />

            <AddNoteFormatModal
                open={addNoteOpen}
                onClose={() => setAddNoteOpen(false)}
            />
        </div>
    );
};

export default Templates;
