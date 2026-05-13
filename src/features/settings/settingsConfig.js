export const SETTINGS_CARDS = [
    {
        key: "appointment",
        title: "Appointment",
        icon: "calendar",
        items: [
            { key: "availability", label: "Availability" },
            { key: "holidays", label: "Holidays" },
            { key: "appointmentType", label: "Appointment Type" },
        ],
    },
    {
        key: "providerAccount",
        title: "Provider Account",
        icon: "user",
        items: [
            { key: "providerProfile", label: "Provider Profile" },
            { key: "notification", label: "Notification" },
            { key: "patientFlag", label: "Patient Flag" },
        ],
    },
    {
        key: "practice",
        title: "Practice",
        icon: "building",
        items: [
            { key: "profile", label: "Profile" },
            { key: "user", label: "User" },
            { key: "location", label: "Location" },
            { key: "rolesResponsibility", label: "Roles & Responsibility" },
            { key: "printConfiguration", label: "Print Configuration" },
        ],
    },
    {
        key: "patientCommunications",
        title: "Patient Communications",
        icon: "mail",
        items: [{ key: "reminders", label: "Reminders" }],
    },
    {
        key: "master",
        title: "Master",
        icon: "database",
        items: [
            { key: "icdCodes", label: "ICD Codes" },
            { key: "cptCodes", label: "CPT Codes" },
            { key: "zCodes", label: "Z Codes" },
            { key: "dsmCodes", label: "DSM Codes" },
            { key: "problemList", label: "Problem List" },
        ],
    },
    {
        key: "templates",
        title: "Templates",
        icon: "document",
        items: [
            { key: "caseNotes", label: "Case Notes" },
            { key: "macros", label: "Macros" },
        ],
    },
    {
        key: "billing",
        title: "Billing",
        icon: "dollar",
        items: [{ key: "feeSchedule", label: "Fee Schedule" }],
    },
];
