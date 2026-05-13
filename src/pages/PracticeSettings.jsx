import { useCallback, useState } from "react";
import { Alert, Button, Dropdown, Tag } from "antd";
import {
    ArrowLeftOutlined,
    EditOutlined,
    BankOutlined,
    PlusOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import {
    PRACTICE_TABS,
    PRACTICE_PROFILE,
} from "../features/practice/practiceData";
import EditPracticeProfileModal from "../features/practice/EditPracticeProfileModal";
import AddNewLocationModal from "../features/practice/AddNewLocationModal";
import LocationsTable from "../features/practice/LocationsTable";
import UserCard from "../features/practice/UserCard";
import RolesTable from "../features/practice/RolesTable";
import AddNewRoleModal from "../features/practice/AddNewRoleModal";
import PrintConfiguration from "../features/practice/PrintConfiguration";
import { useLocations } from "../hooks/useLocations";
import { usePracticeUsers } from "../hooks/usePracticeUsers";
import { useRoles } from "../hooks/useRoles";
import "../styles/practice/practice.css";

const SidebarField = ({ label, value }) => (
    <div className="prac-side-field">
        <span className="prac-side-label">{label}</span>
        <span className="prac-side-value">{value || "--"}</span>
    </div>
);

const InfoField = ({ label, value }) => (
    <div className="prac-info-field">
        <span className="prac-info-label">{label}</span>
        <span className="prac-info-value">{value || "--"}</span>
    </div>
);

const PracticeSettings = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialTab = location.state?.initialTab ?? "profile";

    const [activeTab, setActiveTab] = useState(initialTab);
    const [editOpen, setEditOpen] = useState(false);
    const [addLocationOpen, setAddLocationOpen] = useState(false);
    const [addRoleOpen, setAddRoleOpen] = useState(false);

    const isProfile = activeTab === "profile";
    const isLocation = activeTab === "location";
    const isUsers = activeTab === "users";
    const isRoles = activeTab === "rolesResponsibility";
    const isPrintConfig = activeTab === "printConfiguration";

    const locationsQuery = useLocations(isLocation);
    const usersQuery = usePracticeUsers(isUsers);
    const rolesQuery = useRoles(isRoles);

    const handleBack = useCallback(() => navigate("/settings"), [navigate]);
    const handleEdit = useCallback(() => {
        setEditOpen(true);
    }, []);
    const handleAddLocation = useCallback(() => {
        setAddLocationOpen(true);
    }, []);
    const handleAddUser = useCallback(() => {
        console.log("Add user");
    }, []);
    const handleAddUserVariant = useCallback((variant) => {
        console.log("Add user variant", variant);
    }, []);
    const handleAddRole = useCallback(() => {
        setAddRoleOpen(true);
    }, []);

    return (
        <div className="prac-page">
            <div className="prac-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    className="prac-back-btn"
                    onClick={handleBack}
                    aria-label="Back"
                />
                <span className="prac-title">Practice Settings</span>
            </div>

            <div className="prac-toolbar">
                <div className="prac-tabs" role="tablist">
                    {PRACTICE_TABS.map(({ key, label }) => {
                        const isActive = activeTab === key;
                        return (
                            <button
                                key={key}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`prac-tab ${isActive ? "is-active" : ""}`}
                                onClick={() => setActiveTab(key)}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                {isProfile && (
                    <Button
                        icon={<EditOutlined />}
                        className="prac-edit-btn"
                        onClick={handleEdit}
                    >
                        Edit details
                    </Button>
                )}

                {isLocation && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="prac-add-location-btn"
                        onClick={handleAddLocation}
                    >
                        Add New Location
                    </Button>
                )}

                {isUsers && (
                    <Dropdown.Button
                        type="primary"
                        onClick={handleAddUser}
                        menu={{
                            items: [
                                { key: "single", label: "Add Single User" },
                                { key: "bulk", label: "Bulk Import" },
                            ],
                            onClick: ({ key }) => handleAddUserVariant(key),
                        }}
                        icon={<DownOutlined />}
                        className="prac-add-user-btn"
                    >
                        <PlusOutlined /> Add User
                    </Dropdown.Button>
                )}

                {isRoles && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="prac-add-location-btn"
                        onClick={handleAddRole}
                    >
                        Add New Role
                    </Button>
                )}
            </div>

            {isProfile ? (
                <div className="prac-body">
                    <aside className="prac-sidebar">
                        <div className="prac-sidebar-head">
                            <span className="prac-hospital-name">
                                {PRACTICE_PROFILE.name}
                            </span>
                            {PRACTICE_PROFILE.badge && (
                                <Tag className="prac-badge">
                                    {PRACTICE_PROFILE.badge}
                                </Tag>
                            )}
                        </div>
                        <div className="prac-photo">
                            <BankOutlined />
                        </div>
                        <div className="prac-sidebar-fields">
                            {PRACTICE_PROFILE.sidebarFields.map((field) => (
                                <SidebarField
                                    key={field.label}
                                    label={field.label}
                                    value={field.value}
                                />
                            ))}
                        </div>
                    </aside>

                    <section className="prac-info-card">
                        <h3 className="prac-info-title">Basic Information</h3>

                        <div className="prac-info-grid">
                            <InfoField
                                label="Practice Fax Number"
                                value={PRACTICE_PROFILE.basicInfo.practiceFaxNumber}
                            />
                            <InfoField
                                label="Practice Office Hours"
                                value={
                                    <div className="prac-office-hours">
                                        {PRACTICE_PROFILE.basicInfo.officeHours.map(
                                            (entry) => (
                                                <div
                                                    key={entry.day}
                                                    className="prac-office-row"
                                                >
                                                    <span className="prac-office-day">
                                                        {entry.day}
                                                    </span>
                                                    <span className="prac-office-hour">
                                                        {entry.hours}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                }
                            />

                            <InfoField
                                label="EHR System"
                                value={PRACTICE_PROFILE.basicInfo.ehrSystem}
                            />
                            <div />

                            <InfoField
                                label="Billing Address"
                                value={PRACTICE_PROFILE.basicInfo.billingAddress}
                            />
                            <div />

                            <div className="prac-info-field prac-info-wide">
                                <span className="prac-info-label">
                                    Practice Information
                                </span>
                                <span className="prac-info-value">
                                    {PRACTICE_PROFILE.basicInfo.practiceInformation}
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            ) : isUsers ? (
                <div className="prac-users-body">
                    {usersQuery.isError ? (
                        <Alert
                            type="error"
                            message="Failed to load users"
                            description={usersQuery.error?.message}
                            action={
                                <button
                                    onClick={() => usersQuery.refetch()}
                                    className="prac-retry-btn"
                                >
                                    Retry
                                </button>
                            }
                        />
                    ) : (
                        <div className="prac-users-grid">
                            {(usersQuery.data ?? []).map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                    )}
                </div>
            ) : isPrintConfig ? (
                <PrintConfiguration />
            ) : isRoles ? (
                <div className="prac-users-body">
                    {rolesQuery.isError ? (
                        <Alert
                            type="error"
                            message="Failed to load roles"
                            description={rolesQuery.error?.message}
                            action={
                                <button
                                    onClick={() => rolesQuery.refetch()}
                                    className="prac-retry-btn"
                                >
                                    Retry
                                </button>
                            }
                        />
                    ) : (
                        <RolesTable
                            data={rolesQuery.data}
                            loading={rolesQuery.isLoading}
                        />
                    )}
                </div>
            ) : isLocation ? (
                <div className="prac-loc-body">
                    <section className="prac-loc-summary">
                        <div className="prac-loc-summary-photo">
                            <BankOutlined />
                        </div>
                        <div className="prac-loc-summary-content">
                            <div className="prac-loc-fields-grid">
                                {PRACTICE_PROFILE.sidebarFields.map((field) => (
                                    <div
                                        key={field.label}
                                        className="prac-loc-field"
                                    >
                                        <span className="prac-loc-label">
                                            {field.label}
                                        </span>
                                        <span className="prac-loc-value">
                                            {field.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="prac-loc-name-row">
                                <span className="prac-hospital-name">
                                    {PRACTICE_PROFILE.name}
                                </span>
                                {PRACTICE_PROFILE.badge && (
                                    <Tag className="prac-badge">
                                        {PRACTICE_PROFILE.badge}
                                    </Tag>
                                )}
                            </div>
                        </div>
                    </section>

                    {locationsQuery.isError ? (
                        <Alert
                            type="error"
                            message="Failed to load locations"
                            description={locationsQuery.error?.message}
                            action={
                                <button
                                    onClick={() => locationsQuery.refetch()}
                                    className="prac-retry-btn"
                                >
                                    Retry
                                </button>
                            }
                        />
                    ) : (
                        <LocationsTable
                            data={locationsQuery.data}
                            loading={locationsQuery.isLoading}
                        />
                    )}
                </div>
            ) : (
                <div className="prac-empty-tab">
                    This tab is not implemented yet.
                </div>
            )}

            <EditPracticeProfileModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
            />

            <AddNewLocationModal
                open={addLocationOpen}
                onClose={() => setAddLocationOpen(false)}
            />

            <AddNewRoleModal
                open={addRoleOpen}
                onClose={() => setAddRoleOpen(false)}
            />
        </div>
    );
};

export default PracticeSettings;
