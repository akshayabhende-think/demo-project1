import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, Spin, Alert, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ProspectDetailSidebar from "../features/prospects/detail/ProspectDetailSidebar";
import ProspectDetailHeader from "../features/prospects/detail/ProspectDetailHeader";
import ProspectInfoSections from "../features/prospects/detail/ProspectInfoSections";
import { useProspects } from "../hooks/useProspects";
import { useProspectById } from "../features/prospects/useProspectById";
import "../styles/prospect/prospectDetail.css";

const TAB_ITEMS = [
    { key: "info", label: "Prospect Information" },
    { key: "documents", label: "Documents" },
    { key: "forms", label: "Form" },
    { key: "communication", label: "Communication Log" },
    { key: "activity", label: "Activity Timeline" },
];

const ProspectDetail = () => {
    const { id } = useParams();
    const decodedId = decodeURIComponent(id);
    const navigate = useNavigate();

    const { prospect, isLoading, isError, error } = useProspectById(decodedId);
    const { data: allProspects } = useProspects();

    const handleEdit = useCallback(() => {
        navigate(`/prospect/${encodeURIComponent(decodedId)}/edit`);
    }, [decodedId, navigate]);

    if (isLoading) {
        return (
            <div className="prospect-detail-page">
                <Spin />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="prospect-detail-page">
                <Alert
                    type="error"
                    message="Failed to load prospect"
                    description={error?.message}
                />
            </div>
        );
    }

    if (!prospect) {
        return (
            <div className="prospect-detail-page">
                <Alert
                    type="warning"
                    message={`No prospect found with id ${decodedId}`}
                />
            </div>
        );
    }

    const tabItems = TAB_ITEMS.map((t) => ({
        key: t.key,
        label: t.label,
        children:
            t.key === "info" ? (
                <ProspectInfoSections prospect={prospect} />
            ) : (
                <div className="prospect-detail-empty-tab">Coming soon</div>
            ),
    }));

    return (
        <div className="prospect-detail-page">
            <div className="prospect-detail-layout">
                <ProspectDetailSidebar
                    prospect={prospect}
                    allProspects={allProspects}
                />

                <div className="prospect-detail-main">
                    <ProspectDetailHeader prospect={prospect} />

                    <Tabs
                        defaultActiveKey="info"
                        items={tabItems}
                        className="prospect-detail-tabs"
                        tabBarExtraContent={
                            <Button
                                icon={<EditOutlined />}
                                onClick={handleEdit}
                                className="prospect-detail-edit-btn"
                            >
                                Edit Details
                            </Button>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ProspectDetail;
