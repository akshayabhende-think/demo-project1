import React from 'react'
import '../../styles/dashboard/timeline.css'

const TimelineCard = ({ data }) => {
  return (
    <div className='timeline-card'>
        <h3>3-Day Timeline</h3>

        <div className='timeline-body'>
            {data.map((group, index) => (
                <div key={index}>

                    {/* Date Header */}
                    <div className='timeline-date'>
                        {group.date}
                    </div>

                    {/* Events */}
                    {group.events.map((event, i) => (
                        <div
                            key={i}
                            className={`timeline-item ${event.type}`}
                        >
                            <div>
                                <div className='event-title'>{event.title}</div>
                                <div className='event-sub'>{event.status}</div>
                            </div>

                            <div className='event-time'>{event.time}</div>


                        </div>
                    ))}
                </div>
            ))}

        </div>
      
    </div>
  )
}

export default TimelineCard
