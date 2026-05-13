import { Tag, Button, Dropdown } from "antd";
import { MoreOutlined, EyeOutlined } from "@ant-design/icons";

const RESULT_CLASS = {
    Negative: "tox-result-tag-negative",
    Positive: "tox-result-tag-positive",
};

const renderResultTag = (val) => (
    <Tag className={`tox-result-tag ${RESULT_CLASS[val] ?? ""}`}>{val}</Tag>
);

const renderViewAction = (onView) => (_, record) => (
    <Button
        className="tox-view-btn"
        icon={<EyeOutlined />}
        onClick={() => onView?.(record)}
    >
        View
    </Button>
);

const PENDING_ACTION_ITEMS = [
    { key: "view", label: "View Details" },
    { key: "edit", label: "Edit" },
    { key: "remove", label: "Remove" },
];

const renderPendingAction = (onAction) => (_, record) => (
    <Dropdown
        menu={{
            items: PENDING_ACTION_ITEMS,
            onClick: ({ key }) => onAction?.(key, record),
        }}
        trigger={["click"]}
        placement="bottomRight"
    >
        <Button
            type="text"
            icon={<MoreOutlined />}
            className="tox-row-action-btn"
            aria-label="Row actions"
        />
    </Dropdown>
);

const SCHEDULE_TYPE_COLORS = {
    Random: "purple",
    "One Time": "red",
    Recurring: "blue",
};

const EXCEPTION_TYPE_CLASS = {
    Invalid: "tox-exc-tag-invalid",
    "Failure to Provide": "tox-exc-tag-failure",
    "No Show": "tox-exc-tag-noshow",
};

const renderScheduleType = (type) => (
    <Tag
        color={SCHEDULE_TYPE_COLORS[type] ?? "default"}
        className="tox-schedule-tag"
    >
        {type}
    </Tag>
);

const renderExceptionType = (type) => (
    <Tag
        className={`tox-exc-tag ${EXCEPTION_TYPE_CLASS[type] ?? ""}`}
    >
        {type}
    </Tag>
);

const renderActions = ({ onPrintLabel, onCollect }) => (_, record) => (
    <div className="tox-action-cell">
        <Button
            className="tox-action-btn"
            onClick={() => onPrintLabel?.(record)}
        >
            Print Label
        </Button>
        <Button
            className="tox-action-btn tox-action-btn-primary"
            onClick={() => onCollect?.(record)}
        >
            Collect
        </Button>
    </div>
);

export const buildToxicologyColumns = ({ onPrintLabel, onCollect } = {}) => [
    {
        title: "Client Name",
        dataIndex: "clientName",
        width: 180,
        render: (name) => <span className="tox-client-cell">{name}</span>,
    },
    {
        title: "Schedule Type",
        dataIndex: "scheduleType",
        width: 150,
        render: renderScheduleType,
    },
    {
        title: "Test Type",
        dataIndex: "testType",
        width: 150,
        render: (val) => val || "--",
    },
    {
        title: "Sample Type",
        dataIndex: "sampleType",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Start Date",
        dataIndex: "startDate",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "End Date",
        dataIndex: "endDate",
        width: 130,
        render: (val) => val || "-",
    },
    {
        title: "Action",
        key: "action",
        width: 220,
        align: "right",
        render: renderActions({ onPrintLabel, onCollect }),
    },
];

export const buildResultsColumns = ({ onView } = {}) => [
    {
        title: "Client Name",
        dataIndex: "clientName",
        width: 170,
        render: (name) => <span className="tox-client-cell">{name}</span>,
    },
    {
        title: "Requisition No.",
        dataIndex: "requisitionNo",
        width: 140,
        render: (val) => val || "--",
    },
    {
        title: "Agency",
        dataIndex: "agency",
        width: 200,
        render: (val) => val || "--",
    },
    {
        title: "Results",
        dataIndex: "result",
        width: 120,
        render: renderResultTag,
    },
    {
        title: "Specimen Type",
        dataIndex: "specimenType",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Test Type",
        dataIndex: "testType",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Collector",
        dataIndex: "collector",
        width: 150,
        render: (val) => val || "--",
    },
    {
        title: "Received Date",
        dataIndex: "receivedDate",
        width: 140,
        render: (val) => val || "--",
    },
    {
        title: "Action",
        key: "action",
        width: 110,
        align: "center",
        render: renderViewAction(onView),
    },
];

export const buildPendingResultsColumns = ({ onAction } = {}) => [
    {
        title: "Client Name",
        dataIndex: "clientName",
        width: 170,
        render: (name) => <span className="tox-client-cell">{name}</span>,
    },
    {
        title: "Requisition No.",
        dataIndex: "requisitionNo",
        width: 140,
        render: (val) => val || "--",
    },
    {
        title: "Agency",
        dataIndex: "agency",
        width: 200,
        render: (val) => val || "--",
    },
    {
        title: "Reason",
        dataIndex: "reason",
        width: 280,
        ellipsis: true,
        render: (val) => val || "--",
    },
    {
        title: "Collection Date & Time",
        dataIndex: "collectionAt",
        width: 200,
        render: (val) => val || "--",
    },
    {
        title: "Specimen Type",
        dataIndex: "specimenType",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Action",
        key: "action",
        width: 80,
        align: "center",
        render: renderPendingAction(onAction),
    },
];

export const buildShipmentsColumns = () => [
    {
        title: "Identification",
        dataIndex: "identification",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Medical Record No.",
        dataIndex: "medicalRecordNo",
        width: 150,
        render: (val) => val || "--",
    },
    {
        title: "Client Name",
        dataIndex: "clientName",
        width: 170,
        render: (name) => <span className="tox-client-cell">{name}</span>,
    },
    {
        title: "Requisition No.",
        dataIndex: "requisitionNo",
        width: 140,
        render: (val) => val || "--",
    },
    {
        title: "Collection Date & Time",
        dataIndex: "collectionAt",
        width: 200,
        render: (val) => val || "--",
    },
    {
        title: "Specimen Type",
        dataIndex: "specimenType",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Collector",
        dataIndex: "collector",
        width: 150,
        render: (val) => val || "--",
    },
    {
        title: "Storage Location",
        dataIndex: "storageLocation",
        width: 160,
        render: (val) => val || "--",
    },
];

export const buildExceptionsColumns = () => [
    {
        title: "Client Name",
        dataIndex: "clientName",
        width: 170,
        render: (name) => <span className="tox-client-cell">{name}</span>,
    },
    {
        title: "Requisition No.",
        dataIndex: "requisitionNo",
        width: 140,
        render: (val) => val || "--",
    },
    {
        title: "Scheduled Date & Time",
        dataIndex: "scheduledAt",
        width: 200,
        render: (val) => val || "--",
    },
    {
        title: "Exception Type",
        dataIndex: "exceptionType",
        width: 170,
        render: renderExceptionType,
    },
    {
        title: "Exception Reasons",
        dataIndex: "exceptionReason",
        width: 280,
        ellipsis: true,
        render: (val) => val || "--",
    },
    {
        title: "Sample Type",
        dataIndex: "sampleType",
        width: 120,
        render: (val) => val || "--",
    },
    {
        title: "Collector",
        dataIndex: "collector",
        width: 170,
        render: (val) => val || "--",
    },
];
