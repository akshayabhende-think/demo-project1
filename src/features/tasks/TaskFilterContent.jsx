import { useEffect } from "react";
import { Button, Select, DatePicker, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { TbRefresh } from "react-icons/tb";

const PRIORITY_OPTIONS = [
    { value: "Urgent", label: "Urgent" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
];

const STATUS_OPTIONS = [
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
    { value: "Resolved", label: "Resolved" },
];

const EMPTY_FILTERS = {
    clientName: "",
    priority: "",
    status: "",
    dueDate: null,
};

const TaskFilterContent = ({
    onClose,
    onApply,
    initialValues = EMPTY_FILTERS,
    clientOptions = [],
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const handleReset = () => {
        form.resetFields();
        form.setFieldsValue({
            clientName: undefined,
            priority: undefined,
            status: undefined,
            dueDate: null,
        });
        onApply(EMPTY_FILTERS);
    };

    const handleSubmit = (values) => {
        onApply({
            clientName: values.clientName || "",
            priority: values.priority || "",
            status: values.status || "",
            dueDate: values.dueDate || null,
        });
        onClose();
    };

    const clientSelectOptions = clientOptions.map((name) => ({
        value: name,
        label: name,
    }));

    return (
        <div className="task-filter-content">
            <div className="task-filter-header">
                <span className="task-filter-title">Apply Filter</span>
                <CloseOutlined
                    className="task-filter-close"
                    onClick={onClose}
                />
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={handleSubmit}
                className="task-filter-form"
            >
                <Form.Item label="Client Name" name="clientName">
                    <Select
                        placeholder="Select Client"
                        allowClear
                        showSearch
                        options={clientSelectOptions}
                    />
                </Form.Item>

                <Form.Item label="Priority" name="priority">
                    <Select
                        placeholder="Select Priority"
                        allowClear
                        options={PRIORITY_OPTIONS}
                    />
                </Form.Item>

                <Form.Item label="Status" name="status">
                    <Select
                        placeholder="Select Status"
                        allowClear
                        options={STATUS_OPTIONS}
                    />
                </Form.Item>

                <Form.Item label="Due Date" name="dueDate">
                    <DatePicker
                        placeholder="Select Due Date"
                        style={{ width: "100%" }}
                        allowClear
                    />
                </Form.Item>

                <div className="task-filter-footer">
                    <Button onClick={onClose}>Cancel</Button>
                    <div className="task-filter-footer-right">
                        <Button onClick={handleReset} icon={<TbRefresh />}>
                            Reset
                        </Button>
                        <Button type="primary" onClick={() => form.submit()}>
                            Apply Filter
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default TaskFilterContent;
