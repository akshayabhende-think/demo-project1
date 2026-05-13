import { Alert, Select } from "antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import StaffSessionsTable from "./StaffSessionsTable";
import { useStaffSessions } from "../../hooks/useStaffSessions";

const STAFF_PROFILES = {
    "Bessie Cooper": { role: "LPHA", phone: "(305) 555-0133" },
    "Ralph Edwards": { role: "Counselor", phone: "(212) 555-0188" },
    "Albert Flores": { role: "LPHA", phone: "(415) 555-0142" },
    "Jacob Jones": { role: "Counselor", phone: "(404) 555-0167" },
    "Arlene McCoy": { role: "LPHA", phone: "(617) 555-0155" },
    "Eleanor Pena": { role: "Counselor", phone: "(312) 555-0144" },
    "Guy Hawkins": { role: "LPHA", phone: "(503) 555-0122" },
    "Marvin McKinney": { role: "Counselor", phone: "(206) 555-0119" },
    "Robert Fox": { role: "LPHA", phone: "(602) 555-0136" },
    "Jerome Bell": { role: "Counselor", phone: "(305) 555-0173" },
    "Cameron Williamson": { role: "LPHA", phone: "(808) 555-0111" },
    "Theresa Webb": { role: "Counselor", phone: "(303) 555-0105" },
    "Kathryn Murphy": { role: "LPHA", phone: "(208) 555-0112" },
    "Esther Howard": { role: "Counselor", phone: "(217) 555-0113" },
};

const STAFF_OPTIONS = Object.keys(STAFF_PROFILES).map((name) => ({
    value: name,
    label: name,
}));

const STATS = [
    { label: "Active Clients", value: "42" },
    { label: "Groups", value: "8" },
    { label: "Total Working Hours", value: "128 hrs" },
    { label: "Total Sessions", value: "64" },
    { label: "Group Sessions", value: "3" },
    { label: "Individual Sessions", value: "93%" },
];

const initials = (name) =>
    name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

const StaffProductivityView = ({ selectedStaff, onSelectStaff }) => {
    const sessionsQuery = useStaffSessions(!!selectedStaff);

    const profile = selectedStaff ? STAFF_PROFILES[selectedStaff] : null;

    return (
        <div className="rpt-subview">
            {!selectedStaff ? (
                <>
                    <div className="rpt-staff-bar">
                        <label className="rpt-staff-label">Select Staff</label>
                        <Select
                            placeholder="Select Staff"
                            className="rpt-staff-select"
                            options={STAFF_OPTIONS}
                            value={selectedStaff || undefined}
                            onChange={(val) => onSelectStaff(val ?? null)}
                            allowClear
                            showSearch
                            optionFilterProp="label"
                        />
                    </div>
                    <div className="rpt-staff-body">
                        <div className="rpt-staff-empty">
                            To Review the Staff Productivity Report Select Staff First.
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="rpt-staff-header">
                        <div className="rpt-staff-profile">
                            <div className="rpt-staff-avatar">
                                <UserOutlined />
                                <span className="rpt-staff-initials">
                                    {initials(selectedStaff)}
                                </span>
                            </div>
                            <div className="rpt-staff-info">
                                <div className="rpt-staff-name-row">
                                    <span className="rpt-staff-name">
                                        {selectedStaff}
                                    </span>
                                    {profile?.role && (
                                        <span className="rpt-staff-role">
                                            {profile.role}
                                        </span>
                                    )}
                                </div>
                                <div className="rpt-staff-phone">
                                    <PhoneOutlined />
                                    <span>{profile?.phone || "--"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="rpt-staff-stats">
                            {STATS.map((stat) => (
                                <div key={stat.label} className="rpt-stat">
                                    <div className="rpt-stat-value">{stat.value}</div>
                                    <div className="rpt-stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {sessionsQuery.isError ? (
                        <Alert
                            type="error"
                            message="Failed to load sessions"
                            description={sessionsQuery.error?.message}
                            action={
                                <button
                                    onClick={() => sessionsQuery.refetch()}
                                    className="rpt-retry-btn"
                                >
                                    Retry
                                </button>
                            }
                        />
                    ) : (
                        <StaffSessionsTable
                            data={
                                Array.isArray(sessionsQuery.data)
                                    ? sessionsQuery.data
                                    : []
                            }
                            loading={sessionsQuery.isLoading}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default StaffProductivityView;
