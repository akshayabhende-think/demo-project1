import { memo } from "react";
import { Input, Button, Dropdown } from "antd";
import {
    SearchOutlined,
    FilterOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { TOX_TABS } from "./constants";

const noop = () => {};

const EXPORT_MENU_ITEMS = [
    { key: "xlsx", label: "Export as XLSX" },
    { key: "pdf", label: "Export as PDF" },
];

const ToxicologyToolbar = ({
    activeTab = "active",
    onTabChange = noop,
    searchText = "",
    onSearchChange = noop,
    onExport = noop,
    onCreateShipment = noop,
}) => (
    <div className="tox-toolbar">
        <div className="tox-tabs" role="tablist">
            {TOX_TABS.map(({ key, label }) => {
                const isActive = activeTab === key;
                return (
                    <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`tox-tab ${isActive ? "is-active" : ""}`}
                        onClick={() => onTabChange(key)}
                    >
                        {label}
                    </button>
                );
            })}
        </div>

        <div className="tox-toolbar-actions">
            <Input
                className="tox-search"
                placeholder="Search..."
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
                    className="tox-icon-btn"
                    icon={<FilterOutlined />}
                    aria-label="Export"
                />
            </Dropdown>

            {activeTab === "shipping" && (
                <Button
                    type="primary"
                    onClick={onCreateShipment}
                    icon={<PlusOutlined />}
                    className="tox-create-btn"
                >
                    Create Shipment
                </Button>
            )}
        </div>
    </div>
);

export default memo(ToxicologyToolbar);
