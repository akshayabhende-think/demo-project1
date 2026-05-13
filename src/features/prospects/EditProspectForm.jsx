import { useEffect, useMemo } from "react";
import {
    Button,
    Form,
    Input,
    Radio,
    Select,
    Checkbox,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../../styles/prospect/editProspect.css";

const { Option } = Select;

const REFERRAL_SOURCE_OPTIONS = [
    "Phone",
    "Email",
    "Website",
    "Walk-in",
    "Fax",
];

const SEX_OPTIONS = ["Male", "Female", "Other"];

const STATE_OPTIONS = [
    "California",
    "New York",
    "Texas",
    "Florida",
    "Illinois",
];

const ALIAS_TYPE_OPTIONS = ["Legal Name", "Maiden Name", "Nickname"];

const PRESENTING_PROBLEMS = [
    "Anxiety",
    "Depression",
    "Substance Use",
    "Trauma",
    "Other",
];

const splitName = (fullName = "") => {
    const parts = String(fullName).trim().split(/\s+/);
    if (parts.length === 0) return { firstName: "", middleName: "", lastName: "" };
    if (parts.length === 1) return { firstName: parts[0], middleName: "", lastName: "" };
    if (parts.length === 2) return { firstName: parts[0], middleName: "", lastName: parts[1] };
    return {
        firstName: parts[0],
        middleName: parts.slice(1, -1).join(" "),
        lastName: parts[parts.length - 1],
    };
};

const joinName = ({ firstName, middleName, lastName }) =>
    [firstName, middleName, lastName].filter(Boolean).join(" ").trim();

const computeAge = (dob) => {
    if (!dob) return "";
    const parts = String(dob).split("/");
    const year = Number(parts[parts.length - 1]);
    if (!Number.isFinite(year)) return "";
    return String(new Date().getFullYear() - year);
};

const EditProspectForm = ({
    record,
    onCancel,
    onSave,
    saving,
    title = "Edit Prospect",
}) => {
    const [form] = Form.useForm();

    const initialValues = useMemo(() => {
        const { firstName, middleName, lastName } = splitName(record?.name);
        return {
            prospectType: record?.prospectType ?? "Adult",
            referralSource: record?.referralSource ?? "",
            firstName,
            middleName,
            lastName,
            aliasType: record?.aliasType ?? "Legal Name",
            aliasFirstName: record?.aliasFirstName ?? "",
            aliasLastName: record?.aliasLastName ?? "",
            sex: record?.sex ?? "",
            dob: record?.dob ?? "",
            age: computeAge(record?.dob),
            ssnNumber: record?.ssnNumber ?? "",
            ssnUnknown: record?.ssnUnknown ?? false,
            presentingProblem: record?.presentingProblem ?? undefined,
            presentingProblemComments: record?.presentingProblemComments ?? "",
            currentClientInformation: record?.currentClientInformation ?? "",
            homeNumber: record?.homeNumber ?? "",
            cellNumber: record?.cellNumber ?? "",
            email: record?.email ?? "",
            addressLine1: record?.addressLine1 ?? "",
            addressLine2: record?.addressLine2 ?? "",
            city: record?.city ?? "",
            state: record?.state ?? undefined,
            zipCode: record?.zipCode ?? "",
        };
    }, [record]);

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const handleDobChange = (e) => {
        form.setFieldValue("age", computeAge(e.target.value));
    };

    const handleFinish = (values) => {
        const { firstName, middleName, lastName, age, ...rest } = values;
        onSave({
            ...rest,
            name: joinName({ firstName, middleName, lastName }),
        });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleFinish}
            className="edit-prospect-form"
        >
            <div className="edit-prospect-header">
                <button
                    type="button"
                    className="edit-prospect-back"
                    onClick={onCancel}
                >
                    <ArrowLeftOutlined /> {title}
                </button>

                <div className="edit-prospect-actions">
                    <Button onClick={onCancel} disabled={saving}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => form.submit()}
                        loading={saving}
                    >
                        Save
                    </Button>
                </div>
            </div>

            <section className="edit-prospect-section">
                <h3 className="edit-prospect-section-title">Prospect Information</h3>

                <Form.Item label="Prospect Type" name="prospectType">
                    <Radio.Group>
                        <Radio value="Adult">Adult</Radio>
                        <Radio value="Minor">Minor</Radio>
                    </Radio.Group>
                </Form.Item>

                <div className="edit-prospect-grid edit-prospect-grid-4">
                    <Form.Item
                        label="Referral Source"
                        name="referralSource"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select placeholder="Select" allowClear>
                            {REFERRAL_SOURCE_OPTIONS.map((opt) => (
                                <Option key={opt} value={opt}>{opt}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input placeholder="First name" />
                    </Form.Item>

                    <Form.Item label="Middle Name" name="middleName">
                        <Input placeholder="Middle name" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input placeholder="Last name" />
                    </Form.Item>
                </div>

                <div className="edit-prospect-grid edit-prospect-grid-4">
                    <Form.Item label="Alias Type" name="aliasType">
                        <Select placeholder="Select">
                            {ALIAS_TYPE_OPTIONS.map((opt) => (
                                <Option key={opt} value={opt}>{opt}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Alias First Name" name="aliasFirstName">
                        <Input placeholder="Alias first name" />
                    </Form.Item>

                    <Form.Item label="Alias Last Name" name="aliasLastName">
                        <Input placeholder="Alias last name" />
                    </Form.Item>

                    <Form.Item
                        label="Sex"
                        name="sex"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select placeholder="Select" allowClear>
                            {SEX_OPTIONS.map((opt) => (
                                <Option key={opt} value={opt}>{opt}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <div className="edit-prospect-grid edit-prospect-grid-4">
                    <Form.Item
                        label="Date of Birth"
                        name="dob"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input placeholder="MM/DD/YYYY" onChange={handleDobChange} />
                    </Form.Item>

                    <Form.Item label="Age" name="age">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="SSN Number" name="ssnNumber">
                        <Input placeholder="XXX-XX-XXXX" />
                    </Form.Item>

                    <Form.Item
                        label=" "
                        name="ssnUnknown"
                        valuePropName="checked"
                        className="edit-prospect-checkbox"
                    >
                        <Checkbox>SSN Unknown / Refused</Checkbox>
                    </Form.Item>
                </div>
            </section>

            <section className="edit-prospect-section">
                <h3 className="edit-prospect-section-title">
                    Prospect Clinical Information
                </h3>

                <div className="edit-prospect-grid edit-prospect-grid-3">
                    <Form.Item label="Presenting Problem" name="presentingProblem">
                        <Select placeholder="Select Presenting Problem" allowClear>
                            {PRESENTING_PROBLEMS.map((opt) => (
                                <Option key={opt} value={opt}>{opt}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Presenting Problem Comments"
                        name="presentingProblemComments"
                    >
                        <Input placeholder="Comment..." />
                    </Form.Item>

                    <Form.Item
                        label="Current Client Information ( if any)"
                        name="currentClientInformation"
                    >
                        <Input placeholder="Info..." />
                    </Form.Item>
                </div>
            </section>

            <section className="edit-prospect-section">
                <h3 className="edit-prospect-section-title">
                    Prospect Contact Information
                </h3>

                <div className="edit-prospect-grid edit-prospect-grid-3">
                    <Form.Item label="Home Number" name="homeNumber">
                        <Input placeholder="+1 123 456 789" />
                    </Form.Item>

                    <Form.Item label="Cell Number" name="cellNumber">
                        <Input placeholder="+1 123 456 789" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Required" },
                            { type: "email", message: "Invalid email" },
                        ]}
                    >
                        <Input placeholder="email@example.com" />
                    </Form.Item>
                </div>

                <div className="edit-prospect-grid edit-prospect-grid-2">
                    <Form.Item label="Address Line 1" name="addressLine1">
                        <Input placeholder="123 Maple Street" />
                    </Form.Item>

                    <Form.Item label="Address Line 2" name="addressLine2">
                        <Input placeholder="Apt 12C" />
                    </Form.Item>
                </div>

                <div className="edit-prospect-grid edit-prospect-grid-3">
                    <Form.Item label="City" name="city">
                        <Input placeholder="City" />
                    </Form.Item>

                    <Form.Item label="State" name="state">
                        <Select placeholder="Select" allowClear>
                            {STATE_OPTIONS.map((opt) => (
                                <Option key={opt} value={opt}>{opt}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Zip code" name="zipCode">
                        <Input placeholder="90401" />
                    </Form.Item>
                </div>
            </section>
        </Form>
    );
};

export default EditProspectForm;
