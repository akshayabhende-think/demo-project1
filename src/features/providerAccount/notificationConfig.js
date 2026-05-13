export const NOTIFICATION_CHANNELS = ["push", "text", "email"];

export const NOTIFICATION_SECTIONS = [
    {
        key: "appointments",
        title: "Appointments",
        items: [
            {
                key: "patientBooks",
                label: "Patient books appointment online",
                defaults: { push: true, text: true, email: false },
            },
            {
                key: "patientCancels",
                label: "Patient cancels appointment",
                defaults: { push: true, text: false, email: false },
            },
            {
                key: "patientReschedule",
                label: "Patient reschedule appointment online",
                defaults: { push: false, text: true, email: false },
            },
            {
                key: "patientAttemptsCancel",
                label: "Patient attempts to cancel an appointment",
                defaults: { push: false, text: false, email: false },
            },
            {
                key: "patientCheckIn",
                label: "Patient check-in",
                defaults: { push: true, text: true, email: false },
            },
            {
                key: "staffCheckPatient",
                label: "Staff member check a patient",
                defaults: { push: true, text: false, email: false },
            },
            {
                key: "staffSchedules",
                label: "Staff member schedules/cancel appointment for me",
                defaults: { push: true, text: true, email: false },
            },
        ],
    },
    {
        key: "form",
        title: "Form",
        items: [
            {
                key: "patientSubmitsForm",
                label: "Patient submits a form",
                defaults: { push: true, text: false, email: true },
            },
        ],
    },
    {
        key: "note",
        title: "Note",
        items: [
            {
                key: "noteAssigned",
                label: "Patient note assigned to me",
                defaults: { push: false, text: true, email: true },
            },
            {
                key: "appointmentMissingNote",
                label: "Appointment has missing note",
                defaults: { push: false, text: false, email: false },
            },
        ],
    },
];

export const buildDefaultNotificationState = () => {
    const state = {};
    for (const section of NOTIFICATION_SECTIONS) {
        for (const item of section.items) {
            const key = `${section.key}.${item.key}`;
            state[key] = { ...item.defaults };
        }
    }
    return state;
};
