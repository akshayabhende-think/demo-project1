import { memo } from "react";
import { Input, Select, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { APPOINTMENT_SETTINGS_TABS } from "./constants";

const noop = () => {};

const AppointmentSettingsToolbar = ({
    activeTab = "availability",
    onTabChange = noop,
    searchText = "",
    onSearchChange = noop,
    providerOptions = [],
    providerFilter,
    onProviderChange = noop,
    onAddHoliday = noop,
    onAddAppointmentType = noop,
}) => {
    const isHolidays = activeTab === "holidays";
    const isAppointmentType = activeTab === "appointmentType";

    return (
        <div className="appt-toolbar">
            <div className="appt-tabs" role="tablist">
                {APPOINTMENT_SETTINGS_TABS.map(({ key, label }) => {
                    const isActive = activeTab === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`appt-tab ${isActive ? "is-active" : ""}`}
                            onClick={() => onTabChange(key)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {isHolidays ? (
                <div className="appt-toolbar-actions">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="appt-add-holiday-btn"
                        onClick={onAddHoliday}
                    >
                        Add Holiday
                    </Button>
                </div>
            ) : isAppointmentType ? (
                <div className="appt-toolbar-actions">
                    <Button
                        type="primary"
                        className="appt-add-holiday-btn"
                        onClick={onAddAppointmentType}
                    >
                        Appointment Type
                    </Button>
                </div>
            ) : (
                <div className="appt-toolbar-actions">
                    <Input
                        className="appt-search"
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => onSearchChange(e.target.value)}
                        allowClear
                    />
                    <Select
                        className="appt-provider-filter"
                        placeholder="All Providers"
                        value={providerFilter}
                        onChange={onProviderChange}
                        options={providerOptions}
                        allowClear
                    />
                </div>
            )}
        </div>
    );
};

export default memo(AppointmentSettingsToolbar);
