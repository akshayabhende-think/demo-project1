import { Button, DatePicker, Select, Form } from 'antd'
import { useEffect } from 'react'
import { TbRefresh } from 'react-icons/tb'
import { IoCloseOutline } from 'react-icons/io5'

const { Option } = Select

const FilterPopover = ({ clients = [], onClose, onApply, initialValues }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  const handleReset = () => {
    form.resetFields()
    form.setFieldsValue({
      clientName: undefined,
      dueDate: null,
      priority: undefined,
    })
    onApply({})
  }

  return (
    <div className="todo-filter-popover">
      <div className="todo-filter-header">
        <span className="todo-filter-title">Apply Filter</span>
        <IoCloseOutline
          className="todo-filter-close"
          onClick={onClose}
        />
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={(values) => {
          onApply({
            clientName: values.clientName || '',
            dueDate: values.dueDate || null,
            priority: values.priority || '',
          })
          onClose()
        }}
      >
        <Form.Item label="Client Name" name="clientName">
          <Select placeholder="Select Client" allowClear>
            {clients.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Due Date" name="dueDate">
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Select Date"
            allowClear
          />
        </Form.Item>

        <Form.Item label="Priority" name="priority">
          <Select placeholder="Select Priority" allowClear>
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Form.Item>

        <div className="todo-filter-footer">
          <Button onClick={onClose}>Cancel</Button>

          <div style={{ display: 'flex', gap: '10px' }}>
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
  )
}

export default FilterPopover
