import { useCallback, useState } from "react";
import { Alert, Button } from "antd";
import {
    ArrowLeftOutlined,
    EditOutlined,
    UserOutlined,
    MoreOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import {
    PROVIDER_ACCOUNT_TABS,
    PROVIDER_PROFILE,
} from "../features/providerAccount/providerProfileData";
import NotificationPreferences from "../features/providerAccount/NotificationPreferences";
import PatientFlagsTable from "../features/providerAccount/PatientFlagsTable";
import AddPatientFlagModal from "../features/providerAccount/AddPatientFlagModal";
import { buildDefaultNotificationState } from "../features/providerAccount/notificationConfig";
import { usePatientFlags } from "../hooks/usePatientFlags";
import "../styles/providerAccount/providerAccount.css";

const Field = ({ label, value, wide = false }) => (
    <div className={`pa-field ${wide ? "is-wide" : ""}`}>
        <span className="pa-label">{label}</span>
        <span className="pa-value">{value || "--"}</span>
    </div>
);

const ProviderAccountSettings = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialTab = location.state?.initialTab ?? "providerGroupProfile";

    const [activeTab, setActiveTab] = useState(initialTab);
    const [notifState, setNotifState] = useState(buildDefaultNotificationState);
    const [addFlagOpen, setAddFlagOpen] = useState(false);

    const isPatientFlagTab = activeTab === "patientFlag";
    const patientFlagsQuery = usePatientFlags(isPatientFlagTab);

    const handleBack = useCallback(() => navigate("/settings"), [navigate]);
    const handleEdit = useCallback(() => {
        console.log("Edit provider profile");
    }, []);
    const handleResetNotifDefaults = useCallback(() => {
        setNotifState(buildDefaultNotificationState());
    }, []);
    const handleSaveNotif = useCallback(() => {
        console.log("Save notification preferences", notifState);
    }, [notifState]);
    const handleAddPatientFlag = useCallback(() => {
        setAddFlagOpen(true);
    }, []);
    const handleCreateFlag = useCallback((flag) => {
        console.log("Create patient flag", flag);
    }, []);

    return (
        <div className="pa-page">
            <div className="pa-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    className="pa-back-btn"
                    onClick={handleBack}
                    aria-label="Back"
                />
                <span className="pa-title">Provider Account Settings</span>
            </div>

            <div className="pa-toolbar">
                <div className="pa-tabs" role="tablist">
                    {PROVIDER_ACCOUNT_TABS.map(({ key, label }) => {
                        const isActive = activeTab === key;
                        return (
                            <button
                                key={key}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`pa-tab ${isActive ? "is-active" : ""}`}
                                onClick={() => setActiveTab(key)}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                {activeTab === "providerGroupProfile" && (
                    <Button
                        icon={<EditOutlined />}
                        className="pa-edit-btn"
                        onClick={handleEdit}
                    >
                        Edit Provider Profile
                    </Button>
                )}

                {activeTab === "notification" && (
                    <div className="pa-toolbar-actions">
                        <Button
                            className="pa-set-default-btn"
                            onClick={handleResetNotifDefaults}
                        >
                            Set Default
                        </Button>
                        <Button
                            type="primary"
                            className="pa-save-btn"
                            onClick={handleSaveNotif}
                        >
                            Save
                        </Button>
                    </div>
                )}

                {activeTab === "patientFlag" && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="pa-save-btn"
                        onClick={handleAddPatientFlag}
                    >
                        Add New Patient Flag
                    </Button>
                )}
            </div>

            {activeTab === "providerGroupProfile" ? (
                <div className="pa-body">
                    <section className="pa-card">
                        <h3 className="pa-section-title">Basic Details</h3>
                        <div className="pa-basic-row">
                            <div className="pa-photo">
                                <UserOutlined />
                            </div>
                            <div className="pa-grid pa-grid-6">
                                {PROVIDER_PROFILE.basicDetails.map((field) => (
                                    <Field
                                        key={field.label}
                                        label={field.label}
                                        value={field.value}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="pa-two-col">
                        <section className="pa-card">
                            <h3 className="pa-section-title">
                                Provider Contact Details
                            </h3>
                            <div className="pa-grid pa-grid-3">
                                {PROVIDER_PROFILE.contactDetails.map((field) => (
                                    <Field
                                        key={field.label}
                                        label={field.label}
                                        value={field.value}
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="pa-card">
                            <h3 className="pa-section-title">Other Details</h3>
                            <div className="pa-grid pa-grid-3">
                                {PROVIDER_PROFILE.otherDetails.map((field) => (
                                    <Field
                                        key={field.label}
                                        label={field.label}
                                        value={field.value}
                                        wide={field.wide}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="pa-two-col pa-edu-row">
                        <section className="pa-card">
                            <h3 className="pa-section-title">
                                Education & Work Experience
                            </h3>
                            <div className="pa-edu-block">
                                <span className="pa-label">
                                    Education & Work Experience
                                </span>
                                <p className="pa-edu-text">
                                    {PROVIDER_PROFILE.education}
                                </p>
                            </div>
                        </section>

                        <section className="pa-card pa-signature-card">
                            <div className="pa-card-head">
                                <h3 className="pa-section-title">Signature</h3>
                                <Button
                                    type="text"
                                    icon={<MoreOutlined />}
                                    className="pa-row-action-btn"
                                    aria-label="Signature actions"
                                />
                            </div>
                            <div className="pa-signature-canvas">
                                <span className="pa-signature-text">
                                    Kingstons
                                </span>
                            </div>
                        </section>
                    </div>

                    <section className="pa-card">
                        <h3 className="pa-section-title">
                            Licensing and Compliance
                        </h3>
                        <div className="pa-empty-block">
                            Licensing details will appear here.
                        </div>
                    </section>
                </div>
            ) : activeTab === "notification" ? (
                <div className="pa-body">
                    <NotificationPreferences
                        stateOverride={notifState}
                        onChange={setNotifState}
                    />
                </div>
            ) : activeTab === "patientFlag" ? (
                <div className="pa-body">
                    {patientFlagsQuery.isError ? (
                        <Alert
                            type="error"
                            message="Failed to load patient flags"
                            description={patientFlagsQuery.error?.message}
                            action={
                                <button
                                    onClick={() => patientFlagsQuery.refetch()}
                                    className="pa-retry-btn"
                                >
                                    Retry
                                </button>
                            }
                        />
                    ) : (
                        <PatientFlagsTable
                            data={patientFlagsQuery.data}
                            loading={patientFlagsQuery.isLoading}
                        />
                    )}
                </div>
            ) : (
                <div className="pa-empty-tab">
                    This tab is not implemented yet.
                </div>
            )}

            <AddPatientFlagModal
                open={addFlagOpen}
                onClose={() => setAddFlagOpen(false)}
                onCreate={handleCreateFlag}
            />
        </div>
    );
};

export default ProviderAccountSettings;
