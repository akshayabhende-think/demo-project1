import { memo } from "react";
import { Input, Button, Dropdown } from "antd";
import {
    SearchOutlined,
    FilterOutlined,
    PlusOutlined,
    DownloadOutlined,
} from "@ant-design/icons";
import { BILLING_TABS } from "./constants";

const noop = () => {};

const EXPORT_MENU_ITEMS = [
    { key: "xlsx", label: "Export as XLSX" },
    { key: "pdf", label: "Export as PDF" },
];

const BillingToolbar = ({
    activeTab = "encounterForBilling",
    onTabChange = noop,
    searchText = "",
    onSearchChange = noop,
    onExport = noop,
    onBatchSubmit = noop,
    onGenerateSuperbill = noop,
    onAddInvoice = noop,
}) => {
    const isSuperbillTab = activeTab === "superbill";
    const isInvoicesTab = activeTab === "invoices";
    const isReceiptTab = activeTab === "receipt";

    return (
        <div className="bill-toolbar">
            <div className="bill-tabs" role="tablist">
                {BILLING_TABS.map(({ key, label }) => {
                    const isActive = activeTab === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`bill-tab ${isActive ? "is-active" : ""}`}
                            onClick={() => onTabChange(key)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {isSuperbillTab ? (
                <div className="bill-toolbar-actions">
                    <Button
                        icon={<DownloadOutlined />}
                        className="bill-batch-btn"
                        onClick={onBatchSubmit}
                    >
                        Batch CMS1500 Submit
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="bill-generate-btn"
                        onClick={onGenerateSuperbill}
                    >
                        Generate Superbill
                    </Button>
                </div>
            ) : isInvoicesTab ? (
                <div className="bill-toolbar-actions">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="bill-generate-btn"
                        onClick={onAddInvoice}
                    >
                        Add Invoice
                    </Button>
                </div>
            ) : isReceiptTab ? null : (
                <div className="bill-toolbar-actions">
                    <Input
                        className="bill-search"
                        placeholder="Search"
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
                            className="bill-icon-btn"
                            icon={<FilterOutlined />}
                            aria-label="Export"
                        />
                    </Dropdown>
                </div>
            )}
        </div>
    );
};

export default memo(BillingToolbar);
