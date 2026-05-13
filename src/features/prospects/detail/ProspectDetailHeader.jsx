import { Avatar, Tag } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";

const ProspectDetailHeader = ({ prospect }) => (
    <div className="prospect-detail-header-row">
        <div className="prospect-detail-card prospect-detail-activity-card">
            <Avatar size={36} icon={<UserOutlined />} />
            <div>
                <div className="prospect-detail-activity-title">
                    DSM5 assessment updated
                </div>
                <div className="prospect-detail-activity-meta">
                    By- <strong>System Admin</strong> •{" "}
                    {prospect?.lastContacted || "--"}
                </div>
            </div>
        </div>

        <div className="prospect-detail-card prospect-detail-flags-card">
            <div className="prospect-detail-flags-head">
                <span>Flags</span>
                <PlusOutlined className="prospect-detail-flags-add" />
            </div>
            <div className="prospect-detail-flags-list">
                <Tag color="gold">xyz</Tag>
            </div>
        </div>

        <div className="prospect-detail-card prospect-detail-meta-card">
            <div className="prospect-detail-meta-row">
                <span>Next Appointment</span>
                <strong>: --</strong>
            </div>
            <div className="prospect-detail-meta-row">
                <span>Last Contact</span>
                <strong>: {prospect?.lastContacted || "--"}</strong>
            </div>
            <div className="prospect-detail-meta-row">
                <span>Intake Counselor</span>
                <strong>: --</strong>
            </div>
        </div>
    </div>
);

export default ProspectDetailHeader;
