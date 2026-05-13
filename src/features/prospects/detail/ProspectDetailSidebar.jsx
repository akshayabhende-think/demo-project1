import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Calendar, Radio } from "antd";
import {
    LeftOutlined,
    RightOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    UserOutlined,
} from "@ant-design/icons";

const cleanId = (id) => String(id ?? "").replace(/^#/, "");

const ProspectDetailSidebar = ({ prospect, allProspects }) => {
    const navigate = useNavigate();
    const [intakeOption, setIntakeOption] = useState("anyone");

    const { prevId, nextId } = useMemo(() => {
        if (!Array.isArray(allProspects) || !prospect) return {};
        const idx = allProspects.findIndex((p) => p.id === prospect.id);
        return {
            prevId: idx > 0 ? allProspects[idx - 1].id : null,
            nextId:
                idx >= 0 && idx < allProspects.length - 1
                    ? allProspects[idx + 1].id
                    : null,
        };
    }, [allProspects, prospect]);

    const goTo = (id) => navigate(`/prospect/${encodeURIComponent(id)}`);

    if (!prospect) return null;

    return (
        <aside className="prospect-detail-sidebar">
            <div className="prospect-detail-avatar">
                <UserOutlined />
            </div>

            <div className="prospect-detail-name-row">
                <div className="prospect-detail-name">
                    <span className="prospect-detail-name-text">
                        {prospect.name}
                    </span>
                    <span className="prospect-detail-id-pill">
                        #{cleanId(prospect.id)}
                    </span>
                </div>
                <div className="prospect-detail-nav">
                    <Button
                        size="small"
                        icon={<LeftOutlined />}
                        disabled={!prevId}
                        onClick={() => goTo(prevId)}
                    />
                    <Button
                        size="small"
                        icon={<RightOutlined />}
                        disabled={!nextId}
                        onClick={() => goTo(nextId)}
                    />
                </div>
            </div>

            <div className="prospect-detail-contact">
                <div className="prospect-detail-line">
                    <MailOutlined /> {prospect.email || "--"}
                </div>
                <div className="prospect-detail-line prospect-detail-phone">
                    <span>
                        <PhoneOutlined /> {prospect.cellNumber || "--"}
                    </span>
                    <Button size="small" icon={<PhoneOutlined />}>
                        Call
                    </Button>
                </div>
                <div className="prospect-detail-line">
                    <EnvironmentOutlined /> {prospect.address || "--"}
                </div>
            </div>

            <div className="prospect-detail-section">
                <h4>Schedule Intake Appt.</h4>
                <Radio.Group
                    value={intakeOption}
                    onChange={(e) => setIntakeOption(e.target.value)}
                    className="prospect-detail-radios"
                >
                    <Radio value="anyone">Anyone Available</Radio>
                    <Radio value="specific">Specific Counsellor</Radio>
                    <Radio value="speakWith">I would Like to Speak with</Radio>
                </Radio.Group>
            </div>

            <div className="prospect-detail-section">
                <h4>Available Date</h4>
                <Calendar fullscreen={false} className="prospect-detail-calendar" />
            </div>

            <Button
                type="primary"
                block
                disabled
                className="prospect-detail-cta"
            >
                Schedule Initial Screening
            </Button>
        </aside>
    );
};

export default ProspectDetailSidebar;
