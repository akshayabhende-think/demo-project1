import { Card, Tag } from 'antd'
import '../../styles/dashboard/groupSummary.css'

const GroupSummaryCard = ({ data }) => {
  const count = String(data.length).padStart(2, '0')

  return (
    <Card
      className='group-card'
      title={
        <div className='group-card-title'>
          <span>Groups Summary</span>
          <span className='group-count-badge'>{count}</span>
        </div>
      }
    >
      <div className='group-body'>
        {data.map((item) => (
          <div key={item.id} className='group-item'>
            <div className='group-name'>{item.groupName}</div>

            <div className='group-row'>
              <span className='group-label'>Participants</span>
              <span className='group-sep'>:</span>
              <span className='group-value'>{item.participants}</span>
            </div>

            <div className='group-row'>
              <span className='group-label'>Program</span>
              <span className='group-sep'>:</span>
              <span className='group-value'>{item.program}</span>
            </div>

            <div className='group-row'>
              <span className='group-label'>Frequency</span>
              <span className='group-sep'>:</span>
              <span className='group-value group-tags'>
                {item.frequency.map((day, i) => (
                  <Tag key={i} color='blue'>{day}</Tag>
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default GroupSummaryCard
