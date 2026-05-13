import { useEffect } from "react";
import { Button, Select, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { TbRefresh } from "react-icons/tb";
import { PROSPECT_STATUS_OPTIONS } from "./constants";

const EMPTY_FILTERS = { status: "" };

const ProspectFilterContent = ({
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
        form.setFieldsValue({ status: undefined });
        onApply(EMPTY_FILTERS);
    };

    const handleSubmit = (values) => {
        onApply({ status: values.status || "" });
        onClose();
    };

    return (
        <div className="prospect-filter-content">
            <div className="prospect-filter-header">
                <span className="prospect-filter-title">Apply Filter</span>
                <CloseOutlined
                    className="prospect-filter-close"
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
                        options={PROSPECT_STATUS_OPTIONS}
                    />
                </Form.Item>

                <div className="prospect-filter-footer">
                    <Button onClick={onClose}>Cancel</Button>
                    <div className="prospect-filter-footer-right">
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

export default ProspectFilterContent;
