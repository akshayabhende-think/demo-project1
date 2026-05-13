import { memo } from "react";
import {
    CalendarOutlined,
    UserOutlined,
    BankOutlined,
    MailOutlined,
    DatabaseOutlined,
    FileTextOutlined,
    DollarOutlined,
    RightOutlined,
} from "@ant-design/icons";

const ICON_MAP = {
    calendar: CalendarOutlined,
    user: UserOutlined,
    building: BankOutlined,
    mail: MailOutlined,
    database: DatabaseOutlined,
    document: FileTextOutlined,
    dollar: DollarOutlined,
};

const noop = () => {};

const SettingsCard = ({ title, icon, items, onItemClick = noop }) => {
    const IconComponent = ICON_MAP[icon] ?? CalendarOutlined;

    return (
        <div className="settings-card">
            <div className="settings-card-head">
                <span className="settings-card-icon">
                    <IconComponent />
                </span>
                <span className="settings-card-title">{title}</span>
            </div>
            <ul className="settings-card-list">
                {items.map((item) => (
                    <li key={item.key}>
                        <button
                            type="button"
                            className="settings-card-link"
                            onClick={() => onItemClick(item.key)}
                        >
                            <span>{item.label}</span>
                            <RightOutlined className="settings-card-chevron" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default memo(SettingsCard);
