import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    TimePicker,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../../styles/group/addGroup.css";

const { Option } = Select;
const { TextArea } = Input;

const PROGRAM_OPTIONS = ["Program 1", "Program 2 ( Phase 1)", "Program 3"];
const PHASE_OPTIONS = ["Phase 1", "Phase 2", "Phase 3"];
const TYPE_OPTIONS = ["Psychoeducation", "Process", "Skills"];
const DURATION_OPTIONS = ["30 minutes", "45 minutes", "60 minutes", "90 minutes"];
const RECURRING_OPTIONS = ["Daily", "Weekly", "Bi-weekly", "Monthly"];
const LOCATION_OPTIONS = ["Onsite", "Virtual", "Hybrid"];
const COUNSELOR_OPTIONS = [
    "Ronald Richards",
    "Cameron Williamson",
    "Jerome Bell",
    "Cody Fisher",
    "Brooklyn Simmons",
    "Dianne Russell",
];
const LPHA_OPTIONS = ["Dr. Smith", "Dr. Jones", "Dr. Wilson"];
const CASE_MANAGER_OPTIONS = ["Esther Howard", "Floyd Miles", "Albert Flores"];
const PEER_SPECIALIST_OPTIONS = [
    "Annette Black",
    "Devon Lane",
    "Bessie Cooper",
];

const renderOptions = (list) =>
    list.map((value) => (
        <Option key={value} value={value}>
            {value}
        </Option>
    ));

const INITIAL_VALUES = {
    name: "",
    program: undefined,
    phase: undefined,
    groupType: undefined,
    description: "",
    startDate: null,
    startTime: null,
    duration: undefined,
    recurringPattern: undefined,
    location: undefined,
    groupCounselors: [],
    lpha: undefined,
    caseManager: undefined,
    peerSpecialist: undefined,
};

const AddGroupForm = ({ onCancel, onSave, saving }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave({
            ...values,
            startDate: values.startDate
                ? values.startDate.format("DD/MM/YYYY")
                : null,
            startTime: values.startTime
                ? values.startTime.format("hh:mm A")
                : null,
        });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={INITIAL_VALUES}
            onFinish={handleFinish}
            className="add-group-form"
        >
            <div className="add-group-header">
                <button
                    type="button"
                    className="add-group-back"
                    onClick={onCancel}
                >
                    <ArrowLeftOutlined /> Add Group
                </button>

                <div className="add-group-actions">
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

            <section className="add-group-section">
                <h3 className="add-group-section-title">Group Details</h3>

                <div className="add-group-grid add-group-grid-4">
                    <Form.Item
                        label="Group Name"
                        name="name"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input placeholder="Stress Relief" />
                    </Form.Item>

                    <Form.Item label="Program" name="program">
                        <Select placeholder="Select Program" allowClear>
                            {renderOptions(PROGRAM_OPTIONS)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Phase" name="phase">
                        <Select placeholder="Select Phase" allowClear>
                            {renderOptions(PHASE_OPTIONS)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Type of Group" name="groupType">
                        <Select placeholder="Select Type" allowClear>
                            {renderOptions(TYPE_OPTIONS)}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item label="Description" name="description">
                    <TextArea
                        placeholder="Enter Description..."
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>
            </section>

            <section className="add-group-section">
                <h3 className="add-group-section-title">Schedule Details</h3>

                <div className="add-group-grid add-group-grid-3">
                    <Form.Item label="Start Date" name="startDate">
                        <DatePicker
                            placeholder="Select Date"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item label="Start Time" name="startTime">
                        <TimePicker
                            placeholder="10:00 Pm"
                            format="hh:mm A"
                            use12Hours
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item label="Duration" name="duration">
                        <Select placeholder="Select Duration" allowClear>
                            {renderOptions(DURATION_OPTIONS)}
                        </Select>
                    </Form.Item>
                </div>

                <div className="add-group-grid add-group-grid-2">
                    <Form.Item label="Recurring Pattern" name="recurringPattern">
                        <Select placeholder="Select Days" allowClear>
                            {renderOptions(RECURRING_OPTIONS)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Location" name="location">
                        <Select placeholder="Select Location" allowClear>
                            {renderOptions(LOCATION_OPTIONS)}
                        </Select>
                    </Form.Item>
                </div>
            </section>

            <section className="add-group-section">
                <h3 className="add-group-section-title">Staff Details</h3>

                <div className="add-group-grid add-group-grid-4">
                    <Form.Item label="Group Counsellors" name="groupCounselors">
                        <Select
                            placeholder="Select Group Counsellors"
                            mode="multiple"
                            allowClear
                        >
                            {renderOptions(COUNSELOR_OPTIONS)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="LPHA" name="lpha">
                        <Select placeholder="Select LPHA" allowClear>
                            {renderOptions(LPHA_OPTIONS)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Case Manager" name="caseManager">
                        <Select placeholder="Select Staff" allowClear>
                            {renderOptions(CASE_MANAGER_OPTIONS)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Peer Specialist" name="peerSpecialist">
                        <Select placeholder="Select Peer Specialist" allowClear>
                            {renderOptions(PEER_SPECIALIST_OPTIONS)}
                        </Select>
                    </Form.Item>
                </div>
            </section>

            <section className="add-group-section">
                <div className="add-group-section-row">
                    <h3 className="add-group-section-title">Client Details</h3>
                    <Button type="primary">Add Client</Button>
                </div>
            </section>
        </Form>
    );
};

export default AddGroupForm;
