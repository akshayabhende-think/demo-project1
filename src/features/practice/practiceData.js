export const PRACTICE_TABS = Object.freeze([
    { key: "profile", label: "Profile" },
    { key: "location", label: "Location" },
    { key: "users", label: "Users" },
    { key: "rolesResponsibility", label: "Roles & Responsibility" },
    { key: "printConfiguration", label: "Print Configuration" },
]);

export const PRACTICE_PROFILE = {
    name: "Jupiter Hospital",
    badge: "Multispeciality",
    sidebarFields: [
        { label: "Group NPI Number", value: "2365987458" },
        { label: "Website", value: "www.Jupiterhospital.com" },
        { label: "Contact Number", value: "(569) 822-4144" },
        { label: "Email", value: "hennawest@gmail.com" },
        {
            label: "Physical Address",
            value: "Jupiter Hospital 25 Federal plaza,\nNew York, NY 10278",
        },
    ],
    basicInfo: {
        practiceFaxNumber: "0897 234567",
        ehrSystem: "NA",
        billingAddress: "2678 East 875th Road ,OGLESBY,\nUSA California, 61348",
        practiceInformation:
            "Jupiter Hospital is a tertiary care multi-specialty hospital located in Pune. The hospital has a team of experienced doctors trained all over the world and has the most advanced medical equipment under its roof. Serene Hospital is a tertiary care multi-specialty hospital located in Pune. The hospital has a team of experienced doctors trained all over the world and has the most advanced medical equipment under its roof.",
        officeHours: [
            { day: "Monday", hours: "10.00 AM - 08.00 PM" },
            { day: "Tuesday", hours: "10.00 AM - 08.00 PM" },
            { day: "Wednesday", hours: "10.00 AM - 08.00 PM" },
            { day: "Thursday", hours: "10.00 AM - 08.00 PM" },
            { day: "Friday", hours: "10.00 AM - 08.00 PM" },
            { day: "Saturday", hours: "10.00 AM - 08.00 PM" },
        ],
    },
};
