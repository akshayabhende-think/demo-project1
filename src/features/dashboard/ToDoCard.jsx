import { Button, Card, Popover } from 'antd'
import { useMemo, useState } from 'react'
import '../../styles/dashboard/todo.css'
import { HiOutlineFilter } from 'react-icons/hi'
import FilterPopover from './FilterPopover'

const ToDoCard = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState({})

  const clients = useMemo(
    () => Array.from(new Set(data.map((t) => t.name))),
    [data]
  )

  const filteredData = useMemo(() => {
    return data.filter((task) => {
      if (filters.clientName && task.name !== filters.clientName) return false
      if (filters.priority && task.priority !== filters.priority) return false
      if (filters.dueDate) {
        const selected = filters.dueDate.format('MM/DD/YYYY')
        if (task.dueDate !== selected) return false
      }
      return true
    })
  }, [data, filters])

  return (
    <Card
      className="todo-card"
      title={
        <div className="todo-header">
          <span>To-do Task</span>
          <Popover
            content={
              <FilterPopover
                clients={clients}
                initialValues={filters}
                onClose={() => setOpen(false)}
                onApply={(values) => setFilters(values)}
              />
            }
            trigger="click"
            open={open}
            onOpenChange={setOpen}
            placement="bottomRight"
            arrow={false}
            overlayClassName="todo-filter-overlay"
          >
            <Button>
              <HiOutlineFilter style={{ fontSize: '15px' }} />
            </Button>
          </Popover>
        </div>
      }
    >
      <div className="todo-body">
        {filteredData.map((task) => (
          <div key={task.id} className="todo-item">
            {/* Top */}
            <div className="todo-top">
              <div className="todo-title">{task.title}</div>
              <span className={`priority ${task.priority}`}>
                {task.priority}
              </span>
            </div>

            {/* Middle */}
            <div className="todo-user">
              <div className="avatar">{task.initials}</div>

              <div>
                <div className="name">
                  {task.name} <span className="id">#{task.id}</span>
                </div>
                <div className="meta">
                  DOB: {task.dob} &nbsp; Age: {task.age}Y &nbsp; Gender:{' '}
                  {task.gender}
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="todo-footer">
              <span>Assigned By: {task.assignedBy}</span>
              <span>Due Date: {task.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default ToDoCard
