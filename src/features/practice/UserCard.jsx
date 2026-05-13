import { memo, useState } from "react";
import { Button, Switch, Tag } from "antd";
import {
    EditOutlined,
    PhoneOutlined,
    MailOutlined,
    CopyOutlined,
} from "@ant-design/icons";

const ROLE_CLASS = {
    Receptionist: "uc-role-receptionist",
    LPHA: "uc-role-lpha",
    Counsellor: "uc-role-counsellor",
    Admin: "uc-role-admin",
};

const noop = () => {};

const UserCard = ({ user, onEdit = noop, onToggleStatus = noop }) => {
    const [active, setActive] = useState(user.status === "Active");

    const handleToggle = (checked) => {
        setActive(checked);
        onToggleStatus(user, checked);
    };

    const handleCopy = (text) => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(() => {});
        }
    };

    return (
        <div className="uc-card">
            <Button
                type="text"
                icon={<EditOutlined />}
                className="uc-edit-btn"
                onClick={() => onEdit(user)}
                aria-label={`Edit ${user.name}`}
            />

            <div className="uc-head">
                <div
                    className="uc-avatar"
                    style={{ background: user.color || "#cbd5e1" }}
                >
                    {user.initials || user.name?.[0] || "?"}
                </div>
                <div className="uc-head-info">
                    <span className="uc-name">{user.name}</span>
                    <Tag
                        className={`uc-role ${ROLE_CLASS[user.role] ?? ""}`}
                    >
                        {user.role}
                    </Tag>
                    <span className="uc-last-login">
                        Last Login : {user.lastLogin}
                    </span>
                </div>
            </div>

            <div className="uc-row">
                <span className="uc-row-icon">
                    <PhoneOutlined />
                </span>
                <span className="uc-row-text">{user.phone}</span>
                <button
                    type="button"
                    className="uc-copy-btn"
                    onClick={() => handleCopy(user.phone)}
                    aria-label="Copy phone"
                >
                    <CopyOutlined />
                </button>
            </div>

            <div className="uc-row">
                <span className="uc-row-icon">
                    <MailOutlined />
                </span>
                <span className="uc-row-text">{user.email}</span>
                <button
                    type="button"
                    className="uc-copy-btn"
                    onClick={() => handleCopy(user.email)}
                    aria-label="Copy email"
                >
                    <CopyOutlined />
                </button>
            </div>

            <div className="uc-status-row">
                <span className="uc-status-label">Status:</span>
                <Switch
                    checked={active}
                    onChange={handleToggle}
                    size="small"
                />
                <span
                    className={`uc-status-text ${
                        active ? "is-active" : "is-inactive"
                    }`}
                >
                    {active ? "Active" : "Inactive"}
                </span>
            </div>
        </div>
    );
};

export default memo(UserCard);
