import { Button, Select, Form, Modal } from "antd";
import { useEffect } from "react";
import { TbRefresh } from "react-icons/tb";

const { Option } = Select;

const ProspectFilterModal = ({ open, onClose, onApply, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const handleReset = () => {
        form.resetFields();
        form.setFieldsValue({ status: undefined });
        onApply({ status: "" });
    };

    return (
        <Modal
            title="Apply Filter"
            open={open}
            onCancel={onClose}
            footer={null}
            forceRender
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={(values) => {
                    onApply({ status: values.status || "" });
                    onClose();
                }}
            >
                <Form.Item label="Status" name="status">
                    <Select placeholder="Select Status" allowClear>
                        <Option value="Active">Active</Option>
                        <Option value="In Progress">In Progress</Option>
                        <Option value="Qualified Lead">Qualified Lead</Option>
                        <Option value="No Activity">No Activity</Option>
                        <Option value="Admitted">Admitted</Option>
                    </Select>
                </Form.Item>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button onClick={onClose}>Cancel</Button>

                    <div style={{ display: "flex", gap: 10 }}>
                        <Button onClick={handleReset} icon={<TbRefresh />}>
                            Reset
                        </Button>

                        <Button type="primary" onClick={() => form.submit()}>
                            Apply Filter
                        </Button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

export default ProspectFilterModal;
