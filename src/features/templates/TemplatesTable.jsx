import { memo, useMemo } from "react";
import { Tag, Dropdown, Popconfirm, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomTable from "../../components/common/CustomTable";
import { deleteNoteTemplate } from "../../api/templatesApi";

const TABLE_SCROLL = { y: 360, x: 1100 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="tpl-col-title">{label}</span>;

const STATUS_CLASS = {
    Active: "tpl-status-active",
    Inactive: "tpl-status-inactive",
};

const NoteActionCell = ({ record, onView, onDelete }) => {
    const items = [
        {
            key: "view",
            label: <span onClick={() => onView(record)}>View</span>,
        },
        {
            key: "delete",
            label: (
                <Popconfirm
                    title="Delete this note template?"
                    okText="Delete"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                    onConfirm={() => onDelete(record)}
                >
                    <span className="tpl-action-delete">Delete</span>
                </Popconfirm>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
        >
            <button
                type="button"
                className="tpl-action-trigger"
                aria-label="Actions"
                onClick={(e) => e.stopPropagation()}
            >
                <MoreOutlined />
            </button>
        </Dropdown>
    );
};

const TemplatesTable = ({ data, loading, typeLabel, onRowClick }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteNoteTemplate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["noteTemplates"] });
            message.success("Note template deleted");
        },
        onError: (err) => {
            message.error(err?.message || "Failed to delete note template");
        },
    });

    const handleView = (record) => {
        navigate(`/settings/templates/${record.slug}`);
    };

    const handleDelete = (record) => {
        deleteMutation.mutate(record.id);
    };

    const columns = useMemo(
        () => [
            {
                title: renderTitle(typeLabel),
                dataIndex: "name",
                width: 220,
                render: (val, record) => (
                    <button
                        type="button"
                        className="tpl-name-link"
                        onClick={() => {
                            if (onRowClick) onRowClick(record);
                            else navigate(`/settings/templates/${record.slug}`);
                        }}
                    >
                        {val || "--"}
                    </button>
                ),
            },
            {
                title: renderTitle("Created By"),
                dataIndex: "createdBy",
                width: 200,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Created On"),
                dataIndex: "createdOn",
                width: 160,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Updated On"),
                dataIndex: "updatedOn",
                width: 160,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Status"),
                dataIndex: "status",
                width: 120,
                render: (val) => (
                    <Tag
                        className={`tpl-status-tag ${STATUS_CLASS[val] || ""}`}
                    >
                        {val || "--"}
                    </Tag>
                ),
            },
            {
                title: renderTitle("Action"),
                dataIndex: "action",
                width: 80,
                align: "center",
                render: (_, record) => (
                    <NoteActionCell
                        record={record}
                        onView={handleView}
                        onDelete={handleDelete}
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [typeLabel, navigate, onRowClick]
    );

    return (
        <div className="tpl-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={PAGINATION}
            />
        </div>
    );
};

export default memo(TemplatesTable);
