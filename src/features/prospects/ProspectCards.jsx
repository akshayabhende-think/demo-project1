import React from "react";
import StatCard from "../../components/common/StatCard";
import { prospectStats } from "../../data/prospect/prospectCard";
import "../../styles/prospect/prospectCards.css";

const ProspectCards = () => {
  return (
    <div className="prospect-stat-grid">
      {prospectStats.map(({ key, ...rest }) => (
        <StatCard
          key={key}
          {...rest}
          onClick={() => console.log(key)}
        />
      ))}
    </div>
  );
};

export default ProspectCards;
