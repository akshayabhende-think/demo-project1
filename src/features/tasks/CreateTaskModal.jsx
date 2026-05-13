import { useEffect } from "react";
import {
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    message,
} from "antd";
import { useCreateTask } from "./useTaskMutations";

const { TextArea } = Input;
const { Option } = Select;

const PRIORITY_OPTIONS = ["Urgent", "High", "Medium", "Low"];
const ASSIGNEE_OPTIONS = [
    "Admin A",
    "Jhon Deo",
    "Sam Clerk",
    "System Admin",
    "Floyd Miles",
    "Esther Howard",
    "Cody Fisher",
    "Jacob Jones",
];

const renderOptions = (list) =>
    list.map((value) => (
        <Option key={value} value={value}>
            {value}
        </Option>
    ));

const formatDueDate = (dayjsValue) => {
    if (!dayjsValue) return null;
    return dayjsValue.format("MM/DD/YYYY");
};

const CreateTaskModal = ({ open, onClose, clientOptions = [] }) => {
    const [form] = Form.useForm();
    const createMutation = useCreateTask();

    useEffect(() => {
        if (!open) form.resetFields();
    }, [open, form]);

    const handleSubmit = (values) => {
        const payload = {
            name: values.name,
            description: values.description || "",
            clientName: values.clientName,
            dueDate: formatDueDate(values.dueDate),
            priority: values.priority,
            assignTo: values.assignTo,
            assignee: values.assignTo,
            status: "Pending",
        };

        createMutation.mutate(payload, {
            onSuccess: () => {
                message.success("Task created");
                onClose();
            },
            onError: () => message.error("Failed to create task"),
        });
    };

    const footerNode = (
        <div className="task-create-footer">
            <Button onClick={onClose} disabled={createMutation.isPending}>
                Cancel
            </Button>
            <Button
                type="primary"
                onClick={() => form.submit()}
                loading={createMutation.isPending}
            >
                Create Task
            </Button>
        </div>
    );

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={footerNode}
            width={720}
            destroyOnClose
            centered
            className="task-create-modal"
            title="Create Task"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="task-create-form"
            >
                <Form.Item
                    label="Task Name"
                    name="name"
                    rules={[{ required: true, message: "Required" }]}
                >
                    <Input placeholder="Enter Task Name" />
                </Form.Item>

                <div className="task-create-grid task-create-grid-2">
                    <Form.Item
                        label="Client"
                        name="clientName"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select
                            placeholder="Select Client"
                            allowClear
                            showSearch
                            options={clientOptions.map((c) => ({
                                value: c,
                                label: c,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Due Date"
                        name="dueDate"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <DatePicker
                            placeholder="Select Due Date"
                            style={{ width: "100%" }}
                            allowClear
                        />
                    </Form.Item>
                </div>

                <div className="task-create-grid task-create-grid-2">
                    <Form.Item
                        label="Priority"
                        name="priority"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select placeholder="Select Priority" allowClear>
                            {renderOptions(PRIORITY_OPTIONS)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Assign To"
                        name="assignTo"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select placeholder="Select" allowClear>
                            {renderOptions(ASSIGNEE_OPTIONS)}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item label="Task Description" name="description">
                    <TextArea
                        placeholder="Type here..."
                        autoSize={{ minRows: 4, maxRows: 6 }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateTaskModal;
