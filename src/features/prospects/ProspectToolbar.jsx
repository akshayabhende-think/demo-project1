import { memo, useState } from "react";
import { Input, Button, Popover, Dropdown } from "antd";
import {
    SearchOutlined,
    UploadOutlined,
    FilterOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import ProspectFilterContent from "./ProspectFilterContent";
import {
    ARCHIVE_STATUS,
    EXPORT_MENU_ITEMS,
    PROSPECT_TABS,
} from "./constants";
import "../../styles/prospect/prospectToolbar.css";

const EMPTY_COUNTS = {
    [ARCHIVE_STATUS.ACTIVE]: 0,
    [ARCHIVE_STATUS.ON_HOLD]: 0,
    [ARCHIVE_STATUS.ARCHIVE]: 0,
};

const noop = () => {};

const ProspectToolbar = ({
    activeTab = ARCHIVE_STATUS.ACTIVE,
    onTabChange = noop,
    searchText = "",
    onSearchChange = noop,
    onExport = noop,
    onAddProspect = noop,
    filters,
    onApplyFilters = noop,
    tabCounts = EMPTY_COUNTS,
}) => {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="prospect-toolbar">
            <div className="prospect-tabs" role="tablist">
                {PROSPECT_TABS.map(({ key, label }) => {
                    const isActive = activeTab === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`prospect-tab ${isActive ? "is-active" : ""}`}
                            onClick={() => onTabChange(key)}
                        >
                            <span className="prospect-tab-text">{label}</span>
                            <span className="prospect-tab-count">
                                {tabCounts[key] ?? 0}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="prospect-toolbar-actions">
                <Input
                    className="prospect-search"
                    placeholder="Search Prospect"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                    allowClear
                />

                <Dropdown
                    menu={{
                        items: EXPORT_MENU_ITEMS,
                        onClick: ({ key }) => onExport(key),
                    }}
                    trigger={["click"]}
                    placement="bottomRight"
                >
                    <Button
                        className="prospect-icon-btn"
                        icon={<UploadOutlined />}
                        aria-label="Export prospects"
                    />
                </Dropdown>

                <Popover
                    open={filterOpen}
                    onOpenChange={setFilterOpen}
                    trigger="click"
                    placement="bottomRight"
                    arrow={false}
                    destroyOnHidden
                    content={
                        <ProspectFilterContent
                            initialValues={filters}
                            onClose={() => setFilterOpen(false)}
                            onApply={onApplyFilters}
                        />
                    }
                >
                    <Button
                        className="prospect-icon-btn"
                        icon={<FilterOutlined />}
                        aria-label="Filter prospects"
                    />
                </Popover>

                <Button
                    className="prospect-add-btn"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onAddProspect}
                >
                    Add Prospect
                </Button>
            </div>
        </div>
    );
};

export default memo(ProspectToolbar);
