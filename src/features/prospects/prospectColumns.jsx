import { Tag } from "antd";
import { Link } from "react-router-dom";
import DobCell from "./DobCell";
import ProspectActionCell from "./ProspectActionCell";
import { ARCHIVE_STATUS, PROSPECT_STATUS_COLORS } from "./constants";

const renderStatus = (status) => (
    <Tag color={PROSPECT_STATUS_COLORS[status] ?? "default"}>{status}</Tag>
);

export const buildProspectColumns = ({
    onView,
    onEdit,
    onArchive,
    onUnarchive,
    activeTab,
} = {}) => {
    const showStatus = activeTab === ARCHIVE_STATUS.ACTIVE;

    return [
        {
            title: "Name",
            dataIndex: "name",
            width: 170,
            render: (name, record) => (
                <Link
                    to={`/prospect/${encodeURIComponent(record.id)}`}
                    className="prospect-name-link"
                >
                    {name}
                </Link>
            ),
        },
        { title: "ID", dataIndex: "id", width: 60 },
        { title: "Referral Source", dataIndex: "referralSource", width: 120 },
        { title: "Sex", dataIndex: "sex", width: 70 },
        showStatus && {
            title: "Status",
            dataIndex: "status",
            width: 110,
            render: renderStatus,
        },
        {
            title: "Email",
            dataIndex: "email",
            width: 240,
            ellipsis: true,
        },
        {
            title: "Cell Number",
            dataIndex: "cellNumber",
            width: 110,
            render: (val) => val || "-",
        },
        {
            title: "DOB",
            dataIndex: "dob",
            width: 120,
            render: (dob) => <DobCell dob={dob} />,
        },
        {
            title: "Last Contacted",
            dataIndex: "lastContacted",
            width: 120,
            render: (val) => val || "-",
        },
        {
            title: "Action",
            key: "action",
            width: 60,
            render: (_, record) => (
                <ProspectActionCell
                    record={record}
                    activeTab={activeTab}
                    onView={onView}
                    onEdit={onEdit}
                    onArchive={onArchive}
                    onUnarchive={onUnarchive}
                />
            ),
        },
    ].filter(Boolean);
};
