import { Tag, Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const STATUS_CLASS = {
    "In Network": "bill-status-in",
    "Out Network": "bill-status-out",
    "Unpaid": "bill-status-unpaid",
    "Partially Paid": "bill-status-partial",
    "Paid": "bill-status-paid",
};

const BILLABLE_ACTION_ITEMS = [
    { key: "generateSuperbill", label: "Generate Superbill" },
    { key: "generateInvoice", label: "Generate Invoice" },
];

const DEFAULT_ACTION_ITEMS = [
    { key: "view", label: "View Details" },
    { key: "edit", label: "Edit" },
    { key: "remove", label: "Remove" },
];

const getActionItems = (subTab) =>
    subTab === "billable" ? BILLABLE_ACTION_ITEMS : DEFAULT_ACTION_ITEMS;

const renderStatus = (val) => (
    <Tag className={`bill-status-tag ${STATUS_CLASS[val] ?? ""}`}>{val}</Tag>
);

const renderRowAction = (onAction, subTab) => (_, record) => (
    <Dropdown
        menu={{
            items: getActionItems(subTab),
            onClick: ({ key }) => onAction?.(key, record),
        }}
        trigger={["click"]}
        placement="bottomRight"
    >
        <Button
            type="text"
            icon={<MoreOutlined />}
            className="bill-row-action-btn"
            aria-label="Row actions"
        />
    </Dropdown>
);

const renderAmount = (val) =>
    typeof val === "number" ? `$${val}` : val ?? "--";

export const buildEncounterColumns = ({ onAction, subTab } = {}) => [
    {
        title: "Service ID",
        dataIndex: "serviceId",
        width: 110,
        render: (val) => val || "--",
    },
    {
        title: "Date of Service",
        dataIndex: "dateOfService",
        width: 140,
        render: (val) => val || "--",
    },
    {
        title: "Client Name",
        dataIndex: "clientName",
        width: 180,
        render: (name) => <span className="bill-client-cell">{name}</span>,
    },
    {
        title: "Appointment Type",
        dataIndex: "appointmentType",
        width: 170,
        render: (val) => val || "--",
    },
    {
        title: "Counsellor",
        dataIndex: "counsellor",
        width: 170,
        render: (val) => val || "--",
    },
    {
        title: "Payer",
        dataIndex: "payer",
        width: 170,
        render: (val) => val || "--",
    },
    {
        title: "Bill Amount ($)",
        dataIndex: "billAmount",
        width: 130,
        render: renderAmount,
    },
    {
        title: "Last Eligibility Date",
        dataIndex: "lastEligibilityDate",
        width: 170,
        render: (val) => val || "--",
    },
    {
        title: "Status",
        dataIndex: "status",
        width: 130,
        render: renderStatus,
    },
    {
        title: "Action",
        key: "action",
        width: 80,
        align: "center",
        render: renderRowAction(onAction, subTab),
    },
];

const SUPERBILL_ACTION_ITEMS = [
    { key: "printBill", label: "Print Bill" },
    { key: "generateCms1500", label: "Generate CMS 1500" },
    { key: "addPayment", label: "Add Payment" },
];

const renderSuperbillAction = (onAction) => (_, record) => (
    <Dropdown
        menu={{
            items: SUPERBILL_ACTION_ITEMS,
            onClick: ({ key }) => onAction?.(key, record),
        }}
        trigger={["click"]}
        placement="bottomRight"
    >
        <Button
            type="text"
            icon={<MoreOutlined />}
            className="bill-row-action-btn"
            aria-label="Row actions"
        />
    </Dropdown>
);

export const buildSuperbillColumns = ({ onAction } = {}) => [
    {
        title: "Bill Date",
        dataIndex: "billDate",
        width: 100,
        render: (val) => val || "--",
    },
    {
        title: "Bill ID",
        dataIndex: "billId",
        width: 80,
        render: (val) => val || "--",
    },
    {
        title: "Date of Service",
        dataIndex: "dateOfService",
        width: 120,
        render: (val) => val || "--",
    },
    {
        title: "Client Name",
        dataIndex: "clientName",
        width: 150,
        render: (name) => <span className="bill-client-cell">{name}</span>,
    },
    {
        title: "Counsellor",
        dataIndex: "counsellor",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Payer",
        dataIndex: "payer",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Total Amount",
        dataIndex: "totalAmount",
        width: 105,
        render: renderAmount,
    },
    {
        title: "Patient Balance",
        dataIndex: "patientBalance",
        width: 115,
        render: renderAmount,
    },
    {
        title: "Status",
        dataIndex: "status",
        width: 110,
        render: renderStatus,
    },
    {
        title: "Action",
        key: "action",
        width: 60,
        align: "center",
        render: renderSuperbillAction(onAction),
    },
];

const INVOICE_ACTION_ITEMS = [
    { key: "viewInvoice", label: "View Invoice" },
    { key: "printInvoice", label: "Print Invoice" },
    { key: "sendInvoice", label: "Send Invoice" },
];

const renderInvoiceAction = (onAddPayment, onMenuAction) => (_, record) => (
    <div className="bill-invoice-action-cell">
        <Button
            className={`bill-add-payment-btn ${
                record.status === "Paid" ? "is-paid" : ""
            }`}
            onClick={() => onAddPayment?.(record)}
        >
            Add Payment
        </Button>
        <Dropdown
            menu={{
                items: INVOICE_ACTION_ITEMS,
                onClick: ({ key }) => onMenuAction?.(key, record),
            }}
            trigger={["click"]}
            placement="bottomRight"
        >
            <Button
                type="text"
                icon={<MoreOutlined />}
                className="bill-row-action-btn"
                aria-label="Row actions"
            />
        </Dropdown>
    </div>
);

export const buildInvoiceColumns = ({ onAddPayment, onMenuAction } = {}) => [
    {
        title: "Invoices ID",
        dataIndex: "invoiceId",
        width: 110,
        render: (val) => val || "--",
    },
    {
        title: "Invoices Date",
        dataIndex: "invoiceDate",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Date of Service",
        dataIndex: "dateOfService",
        width: 140,
        render: (val) => val || "--",
    },
    {
        title: "Client Name",
        dataIndex: "clientName",
        width: 170,
        render: (name) => <span className="bill-client-cell">{name}</span>,
    },
    {
        title: "Counsellor",
        dataIndex: "counsellor",
        width: 160,
        render: (val) => val || "--",
    },
    {
        title: "Total Amount",
        dataIndex: "totalAmount",
        width: 130,
        render: renderAmount,
    },
    {
        title: "Patient Balance",
        dataIndex: "patientBalance",
        width: 140,
        render: renderAmount,
    },
    {
        title: "Status",
        dataIndex: "status",
        width: 130,
        render: renderStatus,
    },
    {
        title: "Action",
        key: "action",
        width: 180,
        render: renderInvoiceAction(onAddPayment, onMenuAction),
    },
];

const RECEIPT_ACTION_ITEMS = [
    { key: "viewReceipt", label: "View Receipt" },
    { key: "printReceipt", label: "Print Receipt" },
    { key: "sendReceipt", label: "Send Receipt" },
    { key: "refund", label: "Refund" },
];

const renderReceiptAction = (onAction) => (_, record) => (
    <Dropdown
        menu={{
            items: RECEIPT_ACTION_ITEMS,
            onClick: ({ key }) => onAction?.(key, record),
        }}
        trigger={["click"]}
        placement="bottomRight"
    >
        <Button
            type="text"
            icon={<MoreOutlined />}
            className="bill-row-action-btn"
            aria-label="Row actions"
        />
    </Dropdown>
);

export const buildReceiptColumns = ({ onAction } = {}) => [
    {
        title: "Payment Date",
        dataIndex: "paymentDate",
        width: 120,
        render: (val) => val || "--",
    },
    {
        title: "Receipt No.",
        dataIndex: "receiptNo",
        width: 110,
        render: (val) => val || "--",
    },
    {
        title: "Client Name",
        dataIndex: "clientName",
        width: 170,
        render: (name) => <span className="bill-client-cell">{name}</span>,
    },
    {
        title: "Counsellor",
        dataIndex: "counsellor",
        width: 160,
        render: (val) => val || "--",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        width: 110,
        render: renderAmount,
    },
    {
        title: "Payment Method",
        dataIndex: "paymentMethod",
        width: 140,
        render: (val) => val || "--",
    },
    {
        title: "Refund Amount",
        dataIndex: "refundAmount",
        width: 130,
        render: renderAmount,
    },
    {
        title: "Unused Payment",
        dataIndex: "unusedPayment",
        width: 140,
        render: renderAmount,
    },
    {
        title: "Action",
        key: "action",
        width: 70,
        align: "center",
        render: renderReceiptAction(onAction),
    },
];
