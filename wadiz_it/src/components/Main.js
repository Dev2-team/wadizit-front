import React from 'react';
import FundingList from './FundingList';
import "./Main.scss";

const Main = () => {
  return (
  <div className="Main">
    <div className="Content">
      <FundingList/>
    </div>
  </div>
  );
};

export default Main;
