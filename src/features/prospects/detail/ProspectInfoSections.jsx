import { useState } from "react";
import { Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const splitName = (fullName = "") => {
    const parts = String(fullName).trim().split(/\s+/);
    if (parts.length === 0) return { first: "", middle: "", last: "" };
    if (parts.length === 1) return { first: parts[0], middle: "", last: "" };
    if (parts.length === 2) return { first: parts[0], middle: "", last: parts[1] };
    return {
        first: parts[0],
        middle: parts.slice(1, -1).join(" "),
        last: parts[parts.length - 1],
    };
};

const computeAge = (dob) => {
    if (!dob) return "--";
    const parts = String(dob).split("/");
    const year = Number(parts[parts.length - 1]);
    if (!Number.isFinite(year)) return "--";
    return new Date().getFullYear() - year;
};

const Field = ({ label, value }) => (
    <div className="prospect-detail-field">
        <span className="prospect-detail-field-label">{label}</span>
        <span className="prospect-detail-field-value">
            {value || value === 0 ? value : "--"}
        </span>
    </div>
);

const MaskField = ({ label, value, masker }) => {
    const [visible, setVisible] = useState(false);
    const display = value
        ? visible
            ? value
            : masker(value)
        : "--";
    const ToggleIcon = visible ? EyeInvisibleOutlined : EyeOutlined;
    return (
        <div className="prospect-detail-field">
            <span className="prospect-detail-field-label">{label}</span>
            <span className="prospect-detail-field-value prospect-detail-mask">
                {display}
                {value && (
                    <ToggleIcon
                        className="prospect-detail-mask-toggle"
                        onClick={() => setVisible((v) => !v)}
                    />
                )}
            </span>
        </div>
    );
};

const maskDob = (dob) => {
    const parts = String(dob).split("/");
    return `**/**/${parts[parts.length - 1]}`;
};

const maskSsn = (ssn) => {
    const last4 = String(ssn).replace(/\D/g, "").slice(-4);
    return `**-**-${last4 || "****"}`;
};

const Section = ({ title, action, children }) => (
    <section className="prospect-detail-section-card">
        <div className="prospect-detail-section-head">
            <h3>{title}</h3>
            {action}
        </div>
        <div className="prospect-detail-grid">{children}</div>
    </section>
);

const ProspectInfoSections = ({ prospect }) => {
    if (!prospect) return null;

    const name = splitName(prospect.name);

    return (
        <div className="prospect-detail-sections">
            <Section title="Prospect Information">
                <Field label="Referral Source" value={prospect.referralSource} />
                <Field label="First Name" value={name.first} />
                <Field label="Middle Name" value={name.middle} />
                <Field label="Last Name" value={name.last} />

                <Field label="Alias Type" value={prospect.aliasType} />
                <Field label="Alias First Name" value={prospect.aliasFirstName} />
                <Field label="Alias Last Name" value={prospect.aliasLastName} />
                <Field
                    label="Sex"
                    value={prospect.sex ? prospect.sex.toUpperCase() : ""}
                />

                <MaskField
                    label="Date of Birth"
                    value={prospect.dob}
                    masker={maskDob}
                />
                <Field label="Age" value={computeAge(prospect.dob)} />
                <MaskField
                    label="SSN Number"
                    value={prospect.ssnNumber}
                    masker={maskSsn}
                />
            </Section>

            <Section title="Prospect Clinical Information">
                <Field
                    label="Presenting Problem"
                    value={prospect.presentingProblem}
                />
                <Field
                    label="Presenting Problem Comments"
                    value={prospect.presentingProblemComments}
                />
                <Field
                    label="Current Client Information ( if any)"
                    value={prospect.currentClientInformation}
                />
            </Section>

            <Section title="Prospect Contact Information">
                <Field label="Home Number" value={prospect.homeNumber} />
                <Field label="Cell Number" value={prospect.cellNumber} />
                <Field label="Email" value={prospect.email} />
                <Field label="Address Line 1" value={prospect.addressLine1} />
                <Field label="Address Line 2" value={prospect.addressLine2} />
                <Field label="City" value={prospect.city} />
                <Field label="State" value={prospect.state} />
                <Field label="Zip code" value={prospect.zipCode} />
            </Section>

            <Section title="Emergency Contact">
                <Field label="Name" value={prospect.emergencyName} />
                <Field label="Relation" value={prospect.emergencyRelation} />
                <Field label="Mobile Number" value={prospect.emergencyMobile} />
                <Field label="Address Line 1" value={prospect.emergencyAddress1} />
                <Field label="Address Line 2" value={prospect.emergencyAddress2} />
                <Field label="City" value={prospect.emergencyCity} />
                <Field label="State" value={prospect.emergencyState} />
                <Field label="Zip code" value={prospect.emergencyZip} />
            </Section>

            <Section
                title="Insurance"
                action={
                    <Button type="link" className="prospect-detail-link-action">
                        Check Eligibility
                    </Button>
                }
            >
                <Field label="Insurance Name" value={prospect.insuranceName} />
                <Field label="Insurance Plan" value={prospect.insurancePlan} />
                <Field label="Member ID" value={prospect.memberId} />
                <Field label="Group Number" value={prospect.groupNumber} />
                <Field
                    label="Insured Group Name"
                    value={prospect.insuredGroupName}
                />
                <Field label="Start Date" value={prospect.insuranceStartDate} />
                <Field label="End Date" value={prospect.insuranceEndDate} />
            </Section>

            <Section title="Inquirer Information">
                <Field
                    label="Relation to Client"
                    value={prospect.inquirerRelation}
                />
                <Field label="First Name" value={prospect.inquirerFirstName} />
                <Field label="Middle Name" value={prospect.inquirerMiddleName} />
                <Field label="Last Name" value={prospect.inquirerLastName} />
            </Section>
        </div>
    );
};

export default ProspectInfoSections;
