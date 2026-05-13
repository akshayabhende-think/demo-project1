export const PROVIDER_ACCOUNT_TABS = Object.freeze([
    { key: "providerGroupProfile", label: "Provider Group Profile" },
    { key: "notification", label: "Notification" },
    { key: "patientFlag", label: "Patient Flag" },
]);

export const PROVIDER_PROFILE = {
    photo: null,
    basicDetails: [
        { label: "Role", value: "Rendering Provider" },
        { label: "Credential", value: "Dr." },
        { label: "First Name", value: "Kevin" },
        { label: "Middle Name", value: "Rodger" },
        { label: "Last Name", value: "John" },
        { label: "Date Of Birth", value: "05/17/1965" },
        { label: "Gender", value: "Male" },
        { label: "NPI", value: "375748291" },
        { label: "Taxonomy Number", value: "103T000X" },
        { label: "Language", value: "English, French" },
        { label: "SSN", value: "***-**-9844" },
        { label: "Group NPI", value: "***-**-9844" },
        { label: "Address Line 2", value: "-" },
        { label: "City", value: "Williston" },
        { label: "State", value: "Alaska" },
        { label: "Country", value: "USA" },
    ],
    contactDetails: [
        { label: "Work Number", value: "(343) 643-553790" },
        { label: "Mobile Number", value: "(569) 822-4144" },
        { label: "Email Address", value: "kevinrodger@gmail.com" },
        { label: "Fax Number", value: "463-7782-872" },
        { label: "Timezone", value: "(UTC) Coordinated Universal Time" },
        { label: "Zip Code", value: "80007" },
        { label: "Address Line 1", value: "8642 Yule Street" },
        { label: "Address Line 2", value: "-" },
        { label: "City", value: "Williston" },
        { label: "State", value: "Alaska" },
        { label: "Country", value: "USA" },
    ],
    otherDetails: [
        { label: "Federal Tax ID Number", value: "625366595" },
        { label: "Tax ID Type", value: "EIN" },
        { label: "DEA Number", value: "3235642312" },
        { label: "Registration Date", value: "10/12/2025" },
        { label: "Specialty", value: "Primary Care, Family Medicine" },
        {
            label: "Primary Service Location",
            value:
                "Riverbend Primary Care, Evergreen Family Medicine, Unity Family Practice",
            wide: true,
        },
        {
            label: "Supervising Providers",
            value: "Elvis Williams, Trenton Knox, George Maxwell",
            wide: true,
        },
    ],
    education:
        "Completed residency in Psychiatry with 8+ years of experience in outpatient and telehealth behavioral health services.",
};
