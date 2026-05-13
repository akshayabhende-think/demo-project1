import { Button, DatePicker, Select, Form, Modal } from 'antd'
import { useEffect } from 'react';
import { TbRefresh } from "react-icons/tb";


const { Option } = Select;

const FilterModal = ({ open, onClose, onApply, initialValues }) => {
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
        onApply({});
        //     status: "",
        //     startDate: null,
        //     endDate: null,
    // });
    }
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
                onApply({
                    status: values.status || "",
                    startDate: values.startDate || null,
                    endDate: values.endDate || null,
                });
                onClose();
            }}
        >
            <Form.Item label="Status" name="status">
                <Select placeholder="Select Status" allowClear>
                    <Option value="New">New</Option>
                    <Option value="Contacted">Contacted</Option>
                    <Option value="Converted">Converted</Option>
                    <Option value="Closed">Closed</Option>
                    <Option value="Scheduled">Scheduled</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Start Date" name="startDate">
                <DatePicker  style={{ width: "100%" }} allowClear/>
            </Form.Item>

            <Form.Item label="End Date" name="endDate">
                <DatePicker style={{ width: "100%" }} allowClear/>
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={onClose}>
                    Cancel
                </Button>

                <div style={{ display:'flex', justifyContent: 'flex-end', gap:'10px'}}>
                    <Button onClick={handleReset} icon={<TbRefresh />}>
                        Reset
                    </Button>

                    <Button type='primary' onClick={() => form.submit()}>
                        Apply Filter
                    </Button>
                </div>

            </div>

        </Form>

      </Modal>
    
  )
}

export default FilterModal
