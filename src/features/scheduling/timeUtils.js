export const HOUR_HEIGHT = 80;
export const START_HOUR = 8;
export const END_HOUR = 22;
export const HOURS = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i
);

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export const formatHour = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const display = hour % 12 || 12;
    return `${display} ${period}`;
};

export const formatTime = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    const display = hour % 12 || 12;
    const mm = String(minute).padStart(2, "0");
    return `${display}:${mm} ${period}`;
};

export const parseTime = (value) => {
    if (!value) return null;
    const [h, m] = String(value).split(":").map(Number);
    return { hour: h, minute: m || 0 };
};

export const minutesFromStart = ({ hour, minute }) =>
    (hour - START_HOUR) * 60 + minute;

export const formatYmd = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

export const weekdayLabel = (date) => WEEKDAY_LABELS[date.getDay()];

export const isWeekend = (date) =>
    date.getDay() === 0 || date.getDay() === 6;

// Group overlapping events into clusters; within each cluster, assign a
// column index greedily and remember the cluster's total column count so
// the renderer can compute width/left.
export const layoutEvents = (events) => {
    if (!events.length) return [];

    const sorted = [...events].sort(
        (a, b) => a._top - b._top || a._duration - b._duration
    );

    const result = [];
    let cluster = [];
    let clusterEnd = -Infinity;

    const flushCluster = () => {
        if (!cluster.length) return;
        const cols = [];
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

export const buildDayEvents = (appointments, ymd) => {
    return layoutEvents(
        (appointments ?? [])
            .filter((appt) => appt.date === ymd)
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
            .filter(Boolean)
    );
};
