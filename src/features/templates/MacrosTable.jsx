import { memo, useMemo, useState } from "react";
import { Dropdown, Popconfirm, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomTable from "../../components/common/CustomTable";
import { deleteMacro } from "../../api/templatesApi";
import ViewMacroModal from "./ViewMacroModal";

const TABLE_SCROLL = { y: 360, x: 600 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="tpl-col-title">{label}</span>;

const MacroActionCell = ({ record, onView, onDelete }) => {
    const items = [
        {
            key: "view",
            label: <span onClick={() => onView(record)}>View</span>,
        },
        {
            key: "delete",
            label: (
                <Popconfirm
                    title="Delete this macro?"
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

const MacrosTable = ({ data, loading }) => {
    const queryClient = useQueryClient();
    const [viewingMacro, setViewingMacro] = useState(null);

    const deleteMutation = useMutation({
        mutationFn: deleteMacro,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["macros"] });
            message.success("Macro deleted");
        },
        onError: (err) => {
            message.error(err?.message || "Failed to delete macro");
        },
    });

    const handleView = (record) => {
        setViewingMacro(record);
    };

    const handleDelete = (record) => {
        deleteMutation.mutate(record.id);
    };

    const columns = useMemo(
        () => [
            {
                title: renderTitle("Title"),
                dataIndex: "title",
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Created By"),
                dataIndex: "createdBy",
                width: 240,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Action"),
                dataIndex: "action",
                width: 80,
                align: "center",
                render: (_, record) => (
                    <MacroActionCell
                        record={record}
                        onView={handleView}
                        onDelete={handleDelete}
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
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
            <ViewMacroModal
                open={!!viewingMacro}
                macro={viewingMacro}
                onClose={() => setViewingMacro(null)}
            />
        </div>
    );
};

export default memo(MacrosTable);
