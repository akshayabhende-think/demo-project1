import React from 'react'
import { Card, Typography } from 'antd'
import "../../styles/statCard.css"



const { Text, Title } = Typography

const StatCard = ({
    title,
    value,
    icon,
    bgColor,
    loading,
    onClick,
    extra,
    className = "",
}) => {
  return (
    <Card
        loading={loading}
        onClick={onClick}
        hoverable={!!onClick}
        className={`stat-card ${className}`}
        styles={{
            body: {
                padding: "16px",
            },
        }}
    >
        <div className='stat-card-content'>

            {/* Icon */}
            {icon && (
                <div 
                    className='stat-card-icon'
                    style={{ backgroundColor: bgColor}}
                >
                    {icon}
                </div>
            )}

            {/* Content */}
            <div className='stat-card-text'>
                <Text type='secondary' className='stat-title'>
                    {title}
                </Text>

                <Title level={3} className='stat-value'
                    style={{ margin:'0'}}
                >
                    {value}
                </Title>

            </div>


        </div>
      
    </Card>
  )
}

export default React.memo(StatCard);
