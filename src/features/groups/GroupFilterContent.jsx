import { useEffect } from "react";
import { Button, Select, DatePicker, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { TbRefresh } from "react-icons/tb";

const STATUS_OPTIONS = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Completed", label: "Completed" },
];

const EMPTY_FILTERS = { status: "", startDate: null, endDate: null };

const GroupFilterContent = ({
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
            status: undefined,
            startDate: null,
            endDate: null,
        });
        onApply(EMPTY_FILTERS);
    };

    const handleSubmit = (values) => {
        onApply({
            status: values.status || "",
            startDate: values.startDate || null,
            endDate: values.endDate || null,
        });
        onClose();
    };

    return (
        <div className="group-filter-content">
            <div className="group-filter-header">
                <span className="group-filter-title">Apply Filter</span>
                <CloseOutlined
                    className="group-filter-close"
                    onClick={onClose}
                />
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={handleSubmit}
            >
                <Form.Item label="Status" name="status">
                    <Select
                        placeholder="Select Status"
                        allowClear
                        options={STATUS_OPTIONS}
                    />
                </Form.Item>

                <Form.Item label="Start Date" name="startDate">
                    <DatePicker
                        placeholder="Select Start Date"
                        style={{ width: "100%" }}
                        allowClear
                    />
                </Form.Item>

                <Form.Item label="End Date" name="endDate">
                    <DatePicker
                        placeholder="Select End Date"
                        style={{ width: "100%" }}
                        allowClear
                    />
                </Form.Item>

                <div className="group-filter-footer">
                    <Button onClick={onClose}>Cancel</Button>
                    <div className="group-filter-footer-right">
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

export default GroupFilterContent;
