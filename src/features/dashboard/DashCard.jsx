import React from "react";
import { Row, Col } from "antd";
import { statsData } from "../../data/dashboard/dashboardCard";
import StatCard from "../../components/common/StatCard";
import "../../styles/statCard.css"




const DashCard = () => {
  return (
    <div>
      <p style={{padding: '10px'}}>Clinical Overview</p>

      <Row gutter={[16, 16]} style={{ width: "100%"}} className="stat-grid">
        {statsData.map(({ key, ...rest }) => (
          <Col
            key={key}
            xs={24}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <StatCard
              {...rest}
              // onClick={() => console.log(key)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashCard;