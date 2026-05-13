import { memo, useEffect, useMemo, useRef } from "react";
import { DesktopOutlined } from "@ant-design/icons";
import {
    HOURS,
    HOUR_HEIGHT,
    START_HOUR,
    END_HOUR,
    formatHour,
    formatTime,
    formatYmd,
    weekdayLabel,
    isWeekend,
    buildDayEvents,
} from "./timeUtils";

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

const SchedulingWeekView = ({
    appointments = [],
    currentDate = new Date(),
    workWeek = false,
    onAppointmentClick,
}) => {
    const containerRef = useRef(null);

    const days = useMemo(() => {
        const start = startOfWeek(currentDate);
        const count = workWeek ? 5 : 7;
        return Array.from({ length: count }, (_, i) => addDays(start, i));
    }, [currentDate, workWeek]);

    const todayYmd = useMemo(() => formatYmd(new Date()), []);

    const eventsByDay = useMemo(
        () => days.map((day) => buildDayEvents(appointments, formatYmd(day))),
        [appointments, days]
    );

    const [now] = [new Date()];
    const showNow = days.some((d) => formatYmd(d) === todayYmd);
    const nowMinutes = (now.getHours() - START_HOUR) * 60 + now.getMinutes();
    const nowOffset =
        showNow &&
        nowMinutes >= 0 &&
        nowMinutes <= (END_HOUR - START_HOUR) * 60
            ? nowMinutes
            : null;

    useEffect(() => {
        if (!containerRef.current) return;
        const target =
            nowOffset ??
            eventsByDay.flat().reduce(
                (min, e) => (min === null || e._top < min ? e._top : min),
                null
            );
        if (target !== null) {
            containerRef.current.scrollTop = Math.max(
                (target / 60) * HOUR_HEIGHT - 40,
                0
            );
        }
    }, [eventsByDay, nowOffset]);

    const totalHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT;
    const colsCount = days.length;
    const gridTemplateColumns = `64px repeat(${colsCount}, minmax(0, 1fr))`;

    return (
        <div className="scheduling-week-wrap">
            <div
                className="scheduling-week-header"
                style={{ gridTemplateColumns }}
            >
                <div className="scheduling-week-header-spacer" />
                {days.map((day) => {
                    const ymd = formatYmd(day);
                    const isToday = ymd === todayYmd;
                    return (
                        <div
                            key={ymd}
                            className={`scheduling-week-header-cell ${
                                isWeekend(day) ? "is-weekend" : ""
                            }`}
                        >
                            <span className="scheduling-week-header-weekday">
                                {weekdayLabel(day)}
                            </span>
                            <span
                                className={`scheduling-week-header-number ${
                                    isToday ? "is-today" : ""
                                }`}
                            >
                                {day.getDate()}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="scheduling-week-body" ref={containerRef}>
                <div
                    className="scheduling-week-grid"
                    style={{
                        gridTemplateColumns,
                        height: totalHeight,
                    }}
                >
                    <div
                        className="scheduling-week-hour-col"
                        style={{ height: totalHeight }}
                    >
                        {HOURS.map((h, idx) => (
                            <div
                                key={h}
                                className="scheduling-week-hour-label"
                                style={{ top: idx * HOUR_HEIGHT }}
                            >
                                {formatHour(h)}
                            </div>
                        ))}
                    </div>

                    {days.map((day, dIdx) => {
                        const ymd = formatYmd(day);
                        const isToday = ymd === todayYmd;
                        const dayEvents = eventsByDay[dIdx];

                        return (
                            <div
                                key={ymd}
                                className={`scheduling-week-day-col ${
                                    isWeekend(day) ? "is-weekend" : ""
                                } ${isToday ? "is-today" : ""}`}
                            >
                                {HOURS.map((h, idx) => (
                                    <div
                                        key={h}
                                        className="scheduling-week-hour-line"
                                        style={{ top: idx * HOUR_HEIGHT }}
                                    />
                                ))}

                                {isToday && nowOffset !== null && (
                                    <div
                                        className="scheduling-week-now-line"
                                        style={{
                                            top: (nowOffset / 60) * HOUR_HEIGHT,
                                        }}
                                    />
                                )}

                                {dayEvents.map((appt) => {
                                    const top =
                                        (appt._top / 60) * HOUR_HEIGHT;
                                    const height =
                                        (appt._duration / 60) * HOUR_HEIGHT - 4;
                                    const widthPct = 100 / appt._totalCols;
                                    const leftPct = widthPct * appt._col;
                                    const statusClass =
                                        STATUS_CLASS[appt.status] || "";

                                    return (
                                        <div
                                            key={appt.id}
                                            className={`scheduling-event ${statusClass}`}
                                            style={{
                                                top,
                                                height,
                                                left: `calc(${leftPct}% + 2px)`,
                                                width: `calc(${widthPct}% - 4px)`,
                                                cursor: onAppointmentClick
                                                    ? "pointer"
                                                    : undefined,
                                            }}
                                            role={
                                                onAppointmentClick
                                                    ? "button"
                                                    : undefined
                                            }
                                            tabIndex={
                                                onAppointmentClick ? 0 : undefined
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
                                            <div className="scheduling-event-row">
                                                <div className="scheduling-event-title">
                                                    <DesktopOutlined />{" "}
                                                    {appt.procedure ||
                                                        appt.patientName ||
                                                        appt.title ||
                                                        "Appt"}
                                                </div>
                                                <div className="scheduling-event-time">
                                                    {formatTime(
                                                        appt._startTime.hour,
                                                        appt._startTime.minute
                                                    )}
                                                </div>
                                            </div>
                                            <div className="scheduling-event-status">
                                                {appt.status}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default memo(SchedulingWeekView);
