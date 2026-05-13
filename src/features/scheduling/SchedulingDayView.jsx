import { memo, useEffect, useMemo, useRef, useState } from "react";
import { DesktopOutlined } from "@ant-design/icons";

const HOUR_HEIGHT = 80;
const START_HOUR = 8;
const END_HOUR = 22;
const HOURS = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i
);

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatHour = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const display = hour % 12 || 12;
    return `${display} ${period}`;
};

const formatTime = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    const display = hour % 12 || 12;
    const mm = String(minute).padStart(2, "0");
    return `${display}:${mm} ${period}`;
};

const parseTime = (value) => {
    if (!value) return null;
    const [h, m] = String(value).split(":").map(Number);
    return { hour: h, minute: m || 0 };
};

const minutesFromStart = ({ hour, minute }) =>
    (hour - START_HOUR) * 60 + minute;

const formatYmd = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

// Build column layout for overlapping events: each event gets a column index
// within an overlap cluster, plus the total columns in that cluster.
const layoutEvents = (events) => {
    if (!events.length) return [];

    const sorted = [...events].sort(
        (a, b) => a._top - b._top || a._duration - b._duration
    );

    const result = [];
    let cluster = [];
    let clusterEnd = -Infinity;

    const flushCluster = () => {
        if (!cluster.length) return;
        const cols = []; // cols[i] = end-minute of last event in column i
        const assigned = cluster.map((event) => {
            let col = cols.findIndex((end) => end <= event._top);
            if (col === -1) {
                cols.push(event._top + event._duration);
                col = cols.length - 1;
            } else {
                cols[col] = event._top + event._duration;
            }
            return { ...event, _col: col };
        });
        const totalCols = cols.length;
        for (const a of assigned) result.push({ ...a, _totalCols: totalCols });
        cluster = [];
    };

    for (const event of sorted) {
        if (event._top >= clusterEnd) {
            flushCluster();
            cluster = [event];
            clusterEnd = event._top + event._duration;
        } else {
            cluster.push(event);
            clusterEnd = Math.max(clusterEnd, event._top + event._duration);
        }
    }
    flushCluster();
    return result;
};

const SchedulingDayView = ({
    appointments = [],
    currentDate = new Date(),
    onAppointmentClick,
}) => {
    const targetDate = useMemo(() => formatYmd(currentDate), [currentDate]);
    const isToday = targetDate === formatYmd(new Date());
    const containerRef = useRef(null);

    const dayAppointments = useMemo(() => {
        const sliced = (appointments ?? [])
            .filter((appt) => appt.date === targetDate)
            .map((appt) => {
                const startTime = parseTime(appt.start);
                const endTime = parseTime(appt.end);
                if (!startTime || !endTime) return null;
                const top = minutesFromStart(startTime);
                const duration = Math.max(
                    minutesFromStart(endTime) - top,
                    30
                );
                return {
                    ...appt,
                    _top: top,
                    _duration: duration,
                    _startTime: startTime,
                };
            })
            .filter(Boolean);
        return layoutEvents(sliced);
    }, [appointments, targetDate]);

    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        if (!isToday) return undefined;
        const t = setInterval(() => setNow(new Date()), 60_000);
        return () => clearInterval(t);
    }, [isToday]);

    const nowOffset = useMemo(() => {
        if (!isToday) return null;
        const minutes =
            (now.getHours() - START_HOUR) * 60 + now.getMinutes();
        if (minutes < 0 || minutes > (END_HOUR - START_HOUR) * 60) return null;
        return minutes;
    }, [isToday, now]);

    useEffect(() => {
        const target = nowOffset ?? dayAppointments[0]?._top ?? null;
        if (target !== null && containerRef.current) {
            containerRef.current.scrollTop = Math.max(
                (target / 60) * HOUR_HEIGHT - 40,
                0
            );
        }
    }, [nowOffset, dayAppointments, targetDate]);

    const totalHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT;
    const dayLabel = WEEKDAY_LABELS[currentDate.getDay()];
    const dayNumber = currentDate.getDate();

    return (
        <div className="scheduling-day-wrap">
            <div className="scheduling-day-header">
                <div className="scheduling-day-header-spacer" />
                <div className="scheduling-day-header-cell">
                    <span className="scheduling-day-header-weekday">
                        {dayLabel}
                    </span>
                    <span
                        className={`scheduling-day-header-number ${
                            isToday ? "is-today" : ""
                        }`}
                    >
                        {dayNumber}
                    </span>
                </div>
            </div>

            <div className="scheduling-day" ref={containerRef}>
                <div
                    className="scheduling-day-grid"
                    style={{ height: totalHeight }}
                >
                    {HOURS.map((h, idx) => (
                        <div
                            key={h}
                            className="scheduling-day-hour-row"
                            style={{
                                top: idx * HOUR_HEIGHT,
                                height: HOUR_HEIGHT,
                            }}
                        >
                            <span className="scheduling-day-hour-label">
                                {formatHour(h)}
                            </span>
                            <div className="scheduling-day-hour-line" />
                        </div>
                    ))}

                    {nowOffset !== null && (
                        <div
                            className="scheduling-day-now"
                            style={{ top: (nowOffset / 60) * HOUR_HEIGHT }}
                        >
                            <span className="scheduling-day-now-dot" />
                            <span className="scheduling-day-now-line" />
                        </div>
                    )}

                    <div className="scheduling-day-events">
                        {dayAppointments.map((appt) => {
                            const top = (appt._top / 60) * HOUR_HEIGHT;
                            const height =
                                (appt._duration / 60) * HOUR_HEIGHT - 4;
                            const widthPct = 100 / appt._totalCols;
                            const leftPct = widthPct * appt._col;

                            return (
                                <div
                                    key={appt.id}
                                    className="scheduling-event"
                                    style={{
                                        top,
                                        height,
                                        left: `calc(${leftPct}% + 4px)`,
                                        width: `calc(${widthPct}% - 8px)`,
                                        cursor: onAppointmentClick
                                            ? "pointer"
                                            : undefined,
                                    }}
                                    role={onAppointmentClick ? "button" : undefined}
                                    tabIndex={onAppointmentClick ? 0 : undefined}
                                    onClick={() => onAppointmentClick?.(appt)}
                                    onKeyDown={(e) => {
                                        if (
                                            onAppointmentClick &&
                                            (e.key === "Enter" || e.key === " ")
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
                                                "Appointment"}
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
                </div>
            </div>
        </div>
    );
};

export default memo(SchedulingDayView);
