import { memo, useCallback, useMemo, useState } from "react";
import { Button, Tag } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    MailOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import CustomTable from "../../components/common/CustomTable";
import DeleteReminderModal from "./DeleteReminderModal";

const TYPE_ICON = {
    Email: <MailOutlined />,
    SMS: <MessageOutlined />,
};

const renderType = (val) => (
    <span className="pcom-type-cell">
        <span className="pcom-type-icon">{TYPE_ICON[val] ?? null}</span>
        <span>{val}</span>
    </span>
);

const renderStatus = (val) => (
    <Tag
        className={`pcom-status-tag ${
            val === "Active"
                ? "pcom-status-active"
                : "pcom-status-inactive"
        }`}
    >
        {val}
    </Tag>
);

const renderActions = ({ onEdit, onDelete }) => (_, record) => (
    <div className="pcom-action-cell">
        <Button
            type="text"
            icon={<EditOutlined />}
            className="pcom-edit-icon-btn"
            onClick={() => onEdit?.(record)}
            aria-label="Edit"
        />
        <Button
            type="text"
            icon={<DeleteOutlined />}
            className="pcom-delete-icon-btn"
            onClick={() => onDelete?.(record)}
            aria-label="Delete"
        />
    </div>
);

const TABLE_SCROLL = { y: 360, x: 900 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const RemindersTable = ({ data, loading }) => {
    const [deleteTarget, setDeleteTarget] = useState(null);

    const handleEdit = useCallback((record) => {
        console.log("Edit reminder", record);
    }, []);
    const handleDelete = useCallback((record) => {
        setDeleteTarget(record);
    }, []);
    const handleConfirmDelete = useCallback((record) => {
        console.log("Confirmed delete", record);
    }, []);

    const columns = useMemo(
        () => [
            {
                title: "Reminder Name",
                dataIndex: "name",
                width: 220,
                render: (val) => <span className="pcom-name-cell">{val}</span>,
            },
            {
                title: "Type",
                dataIndex: "type",
                width: 110,
                render: renderType,
            },
            {
                title: "Timing",
                dataIndex: "timing",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: "Status",
                dataIndex: "status",
                width: 110,
                render: renderStatus,
            },
            {
                title: "Template Preview",
                dataIndex: "templatePreview",
                width: 320,
                ellipsis: true,
                render: (val) => val || "--",
            },
            {
                title: "Action",
                key: "action",
                width: 100,
                align: "center",
                render: renderActions({
                    onEdit: handleEdit,
                    onDelete: handleDelete,
                }),
            },
        ],
        [handleEdit, handleDelete]
    );

    return (
        <div className="pcom-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={PAGINATION}
            />
            <DeleteReminderModal
                open={Boolean(deleteTarget)}
                record={deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default memo(RemindersTable);
