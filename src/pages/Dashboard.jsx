import React from 'react'
import DashCard from '../features/dashboard/DashCard'
import { Row, Col } from "antd";
import { timelineData } from '../data/dashboard/timelineData';
import TimelineCard from '../features/dashboard/TimelineCard';
import ToDoCard from '../features/dashboard/ToDoCard';
import { todoData } from '../data/dashboard/todoData';
import GroupSummaryCard from '../features/dashboard/GroupSummaryCard';
import { groupSummaryData } from '../data/dashboard/groupSummaryData';
import BillingReadinessCard from '../features/dashboard/BillingReadinessCard';
import { billingData } from '../data/dashboard/billingData';



const Dashboard = () => {
  return (
    <div>
      <DashCard />

      <div style={{ padding: '15px 0'}}>
        <Row gutter={[16, 16]}>
            <Col xs={24} lg={6}>
              <TimelineCard data={timelineData} />
            </Col>

            <Col xs={24} lg={12}>
              <ToDoCard data={todoData} />
            </Col>

            <Col xs={24} lg={6}>
              <GroupSummaryCard data={groupSummaryData} />
              <BillingReadinessCard data={billingData} />
            </Col>
        </Row>
      </div>

    </div>
  )
}

export default Dashboard
