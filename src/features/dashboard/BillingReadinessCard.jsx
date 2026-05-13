import { Card } from 'antd'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'
import '../../styles/dashboard/billingReadiness.css'

const BillingReadinessCard = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card
      className='billing-card'
      title={
        <div className='billing-title'>
          <HiOutlineCurrencyDollar className='billing-title-icon' />
          <span>Billing Readiness</span>
        </div>
      }
    >
      <div className='billing-bar'>
        {data.map((item) => (
          <div
            key={item.id}
            className='billing-bar-segment'
            style={{
              width: `${(item.value / total) * 100}%`,
              background: item.color,
            }}
          />
        ))}
      </div>

      <div className='billing-legend'>
        {data.map((item) => (
          <div key={item.id} className='billing-legend-row'>
            <span className='billing-legend-left'>
              <span
                className='billing-legend-dot'
                style={{ background: item.color }}
              />
              <span className='billing-legend-label'>{item.label}</span>
            </span>
            <span className='billing-legend-value'>{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default BillingReadinessCard
