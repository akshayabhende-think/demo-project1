import { useCallback, useMemo, useState } from "react";
import { Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import AppointmentSettingsToolbar from "../features/appointmentSettings/AppointmentSettingsToolbar";
import AvailabilityTable from "../features/appointmentSettings/AvailabilityTable";
import HolidaysTable from "../features/appointmentSettings/HolidaysTable";
import AppointmentTypesTable from "../features/appointmentSettings/AppointmentTypesTable";
import { useAvailability } from "../hooks/useAvailability";
import { useHolidays } from "../hooks/useHolidays";
import { useAppointmentTypes } from "../hooks/useAppointmentTypes";
import "../styles/appointmentSettings/appointmentSettings.css";

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

const AppointmentSettings = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialTab = location.state?.initialTab ?? "availability";

    const [activeTab, setActiveTab] = useState(initialTab);
    const [searchText, setSearchText] = useState("");
    const [providerFilter, setProviderFilter] = useState();

    const isAvailability = activeTab === "availability";
    const isHolidays = activeTab === "holidays";
    const isAppointmentType = activeTab === "appointmentType";

    const availabilityQuery = useAvailability(isAvailability);
    const holidaysQuery = useHolidays(isHolidays);
    const typesQuery = useAppointmentTypes(isAppointmentType);
    const { data, isLoading, isError, error, refetch } = availabilityQuery;

    const providerOptions = useMemo(() => {
        if (!Array.isArray(data)) return [];
        const set = new Set(data.map((row) => row.provider).filter(Boolean));
        return Array.from(set)
            .sort()
            .map((name) => ({ value: name, label: name }));
    }, [data]);

    const filteredData = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.filter((row) => {
            if (providerFilter && row.provider !== providerFilter) return false;
            return matchesText(row, searchText);
        });
    }, [data, searchText, providerFilter]);

    const handleBack = useCallback(() => navigate("/settings"), [navigate]);
    const handleAddHoliday = useCallback(() => {
        console.log("Add holiday");
    }, []);

    const handleAddAppointmentType = useCallback(() => {
        console.log("Add appointment type");
    }, []);

    let body = null;
    if (isAvailability) {
        if (isError) {
            body = (
                <Alert
                    type="error"
                    message="Failed to load availability"
                    description={error?.message}
                    action={
                        <button
                            onClick={() => refetch()}
                            className="appt-retry-btn"
                        >
                            Retry
                        </button>
                    }
                />
            );
        } else {
            body = (
                <AvailabilityTable data={filteredData} loading={isLoading} />
            );
        }
    } else if (isHolidays) {
        if (holidaysQuery.isError) {
            body = (
                <Alert
                    type="error"
                    message="Failed to load holidays"
                    description={holidaysQuery.error?.message}
                    action={
                        <button
                            onClick={() => holidaysQuery.refetch()}
                            className="appt-retry-btn"
                        >
                            Retry
                        </button>
                    }
                />
            );
        } else {
            body = (
                <HolidaysTable
                    data={holidaysQuery.data}
                    loading={holidaysQuery.isLoading}
                />
            );
        }
    } else if (isAppointmentType) {
        if (typesQuery.isError) {
            body = (
                <Alert
                    type="error"
                    message="Failed to load appointment types"
                    description={typesQuery.error?.message}
                    action={
                        <button
                            onClick={() => typesQuery.refetch()}
                            className="appt-retry-btn"
                        >
                            Retry
                        </button>
                    }
                />
            );
        } else {
            body = (
                <AppointmentTypesTable
                    data={typesQuery.data}
                    loading={typesQuery.isLoading}
                />
            );
        }
    } else {
        body = (
            <div className="appt-empty-tab">
                This tab is not implemented yet.
            </div>
        );
    }

    return (
        <div className="appt-page">
            <div className="appt-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    className="appt-back-btn"
                    onClick={handleBack}
                    aria-label="Back"
                />
                <span className="appt-title">Appointment Settings</span>
            </div>

            <AppointmentSettingsToolbar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                searchText={searchText}
                onSearchChange={setSearchText}
                providerOptions={providerOptions}
                providerFilter={providerFilter}
                onProviderChange={setProviderFilter}
                onAddHoliday={handleAddHoliday}
                onAddAppointmentType={handleAddAppointmentType}
            />

            {body}
        </div>
    );
};

export default AppointmentSettings;
