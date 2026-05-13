import { useEffect } from "react";
import { Button, Select, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { TbRefresh } from "react-icons/tb";

const COUNSELOR_OPTIONS = [
    { value: "Admin A", label: "Admin A" },
    { value: "Jhon Deo", label: "Jhon Deo" },
    { value: "Sam Clerk", label: "Sam Clerk" },
];

const LOCATION_OPTIONS = [
    { value: "Onsite", label: "Onsite" },
    { value: "Virtual", label: "Virtual" },
    { value: "Hybrid", label: "Hybrid" },
];

const STATUS_OPTIONS = [
    { value: "SCHEDULED", label: "Scheduled" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "COMPLETED", label: "Completed" },
    { value: "NO SHOW", label: "No Show" },
];

const EMPTY_FILTERS = { counselor: "", location: "", status: "" };

const SchedulingFilterContent = ({
    onClose,
    onApply,
    initialValues = EMPTY_FILTERS,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const handleReset = () => {
        form.resetFields();
        form.setFieldsValue({
            counselor: undefined,
            location: undefined,
            status: undefined,
        });
        onApply(EMPTY_FILTERS);
    };

    const handleSubmit = (values) => {
        onApply({
            counselor: values.counselor || "",
            location: values.location || "",
            status: values.status || "",
        });
        onClose();
    };

    return (
        <div className="scheduling-filter-content">
            <div className="scheduling-filter-header">
                <span className="scheduling-filter-title">Apply Filter</span>
                <CloseOutlined
                    className="scheduling-filter-close"
                    onClick={onClose}
                />
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={handleSubmit}
                className="scheduling-filter-form"
            >
                <Form.Item name="counselor" className="scheduling-filter-item">
                    <Select
                        placeholder="Select Counselor"
                        allowClear
                        options={COUNSELOR_OPTIONS}
                    />
                </Form.Item>

                <Form.Item name="location" className="scheduling-filter-item">
                    <Select
                        placeholder="Location"
                        allowClear
                        options={LOCATION_OPTIONS}
                    />
                </Form.Item>

                <Form.Item name="status" className="scheduling-filter-item">
                    <Select
                        placeholder="Status"
                        allowClear
                        options={STATUS_OPTIONS}
                    />
                </Form.Item>

                <div className="scheduling-filter-footer">
                    <Button onClick={onClose}>Cancel</Button>
                    <div className="scheduling-filter-footer-right">
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

export default SchedulingFilterContent;
