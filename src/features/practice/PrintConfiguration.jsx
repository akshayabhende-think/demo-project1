import { memo, useState } from "react";
import { Button, Radio } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";

const HEADERS = [
    {
        id: "header-left",
        title: "Custom EMR Practice Header",
        align: "left",
    },
    {
        id: "header-center",
        title: "Custom EMR Practice Header",
        align: "center",
    },
];

const HEADER_BODY = {
    accountName: "New Connections Test Account",
    address: "70 Washington Square South, New York, NY 10012, United States",
    contact: "Office Number- 414-690-5082 / Fax Number - 1-408-999 8888",
};

const noop = () => {};

const HeaderCard = ({ header, isDefault, onSelect = noop, onEdit = noop, onDelete = noop }) => (
    <div className="pc-header-card">
        <div className="pc-header-top">
            <span className="pc-header-title">{header.title}</span>
            <div className="pc-header-actions">
                <Button
                    icon={<EditOutlined />}
                    className="pc-edit-btn"
                    onClick={() => onEdit(header)}
                >
                    Edit
                </Button>
                <Button
                    icon={<DeleteOutlined />}
                    className="pc-delete-btn"
                    onClick={() => onDelete(header)}
                >
                    Delete
                </Button>
            </div>
        </div>

        <Radio
            checked={isDefault}
            onChange={() => onSelect(header.id)}
            className="pc-default-radio"
        >
            Set This As My Default Header
        </Radio>

        <div className={`pc-header-preview pc-align-${header.align}`}>
            <div className="pc-logo">
                <span className="pc-logo-icon">
                    <AppstoreOutlined />
                </span>
                <span className="pc-logo-text">
                    <span className="pc-logo-line1">New</span>
                    <span className="pc-logo-line2">Connections</span>
                </span>
            </div>
            <div className="pc-header-meta">
                <div className="pc-meta-name">{HEADER_BODY.accountName}</div>
                <div className="pc-meta-line">{HEADER_BODY.address}</div>
                <div className="pc-meta-line">{HEADER_BODY.contact}</div>
            </div>
        </div>
    </div>
);

const PrintConfiguration = () => {
    const [defaultHeaderId, setDefaultHeaderId] = useState(null);

    const handleEdit = (header) => { /* console.log("Edit header", header); */ };
    const handleDelete = (header) => { /* console.log("Delete header", header); */ };

    return (
        <div className="pc-body">
            <p className="pc-description">
                This is the list of document headers you can select from when
                printing from ThinkEMR
            </p>

            <div className="pc-header-list">
                {HEADERS.map((header) => (
                    <HeaderCard
                        key={header.id}
                        header={header}
                        isDefault={defaultHeaderId === header.id}
                        onSelect={setDefaultHeaderId}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(PrintConfiguration);
