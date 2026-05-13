import { memo, useMemo } from "react";
import { DesktopOutlined } from "@ant-design/icons";
import {
    formatTime,
    formatYmd,
    isWeekend,
    parseTime,
} from "./timeUtils";

const WEEKDAY_HEADERS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
const MAX_VISIBLE_EVENTS = 2;

const STATUS_CLASS = {
    Scheduled: "scheduling-event-status-scheduled",
    SCHEDULED: "scheduling-event-status-scheduled",
    Cancelled: "scheduling-event-status-cancelled",
    CANCELLED: "scheduling-event-status-cancelled",
    Error: "scheduling-event-status-error",
    "No Show": "scheduling-event-status-no-show",
    "NO SHOW": "scheduling-event-status-no-show",
    Completed: "scheduling-event-status-completed",
    COMPLETED: "scheduling-event-status-completed",
};

const startOfMonth = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(1);
    return d;
};

const startOfWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const dow = d.getDay();
    const diff = (dow + 6) % 7; // Monday-first
    d.setDate(d.getDate() - diff);
    return d;
};

const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
};

const SchedulingMonthView = ({
    appointments = [],
    currentDate = new Date(),
    onAppointmentClick,
}) => {
    const todayYmd = useMemo(() => formatYmd(new Date()), []);
    const monthIndex = currentDate.getMonth();

    const cells = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentDate));
        return Array.from({ length: 42 }, (_, i) => addDays(start, i));
    }, [currentDate]);

    // Group appointments by date, sorted by start time, for quick lookup
    const eventsByDate = useMemo(() => {
        const map = new Map();
        for (const appt of appointments ?? []) {
            const list = map.get(appt.date) ?? [];
            list.push(appt);
            map.set(appt.date, list);
        }
        for (const list of map.values()) {
            list.sort((a, b) => String(a.start).localeCompare(String(b.start)));
        }
        return map;
    }, [appointments]);

    return (
        <div className="scheduling-month-wrap">
            <div className="scheduling-month-header">
                {WEEKDAY_HEADERS.map((label, idx) => (
                    <div
                        key={label}
                        className={`scheduling-month-header-cell ${
                            idx >= 5 ? "is-weekend" : ""
                        }`}
                    >
                        {label}
                    </div>
                ))}
            </div>

            <div className="scheduling-month-body">
                {cells.map((day) => {
                    const ymd = formatYmd(day);
                    const inMonth = day.getMonth() === monthIndex;
                    const isToday = ymd === todayYmd;
                    const dayEvents = eventsByDate.get(ymd) ?? [];
                    const visible = dayEvents.slice(0, MAX_VISIBLE_EVENTS);
                    const overflow = dayEvents.length - visible.length;

                    return (
                        <div
                            key={ymd}
                            className={[
                                "scheduling-month-cell",
                                inMonth ? "" : "is-out-of-month",
                                isWeekend(day) ? "is-weekend" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <div className="scheduling-month-cell-header">
                                <span
                                    className={`scheduling-month-cell-number ${
                                        isToday ? "is-today" : ""
                                    }`}
                                >
                                    {day.getDate()}
                                </span>
                            </div>

                            <div className="scheduling-month-cell-events">
                                {visible.map((appt) => {
                                    const time = parseTime(appt.start);
                                    const statusClass =
                                        STATUS_CLASS[appt.status] || "";
                                    return (
                                        <div
                                            key={appt.id}
                                            className={`scheduling-month-event ${statusClass}`}
                                            role={
                                                onAppointmentClick
                                                    ? "button"
                                                    : undefined
                                            }
                                            tabIndex={
                                                onAppointmentClick ? 0 : undefined
                                            }
                                            style={
                                                onAppointmentClick
                                                    ? { cursor: "pointer" }
                                                    : undefined
                                            }
                                            onClick={() =>
                                                onAppointmentClick?.(appt)
                                            }
                                            onKeyDown={(e) => {
                                                if (
                                                    onAppointmentClick &&
                                                    (e.key === "Enter" ||
                                                        e.key === " ")
                                                ) {
                                                    e.preventDefault();
                                                    onAppointmentClick(appt);
                                                }
                                            }}
                                        >
                                            <span className="scheduling-month-event-title">
                                                <DesktopOutlined />{" "}
                                                {appt.procedure ||
                                                    appt.patientName ||
                                                    appt.title ||
                                                    "Appt"}
                                            </span>
                                            <span className="scheduling-month-event-time">
                                                {time
                                                    ? formatTime(
                                                          time.hour,
                                                          time.minute
                                                      )
                                                    : ""}
                                            </span>
                                        </div>
                                    );
                                })}

                                {overflow > 0 && (
                                    <div className="scheduling-month-more">
                                        +{overflow} more
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(SchedulingMonthView);
