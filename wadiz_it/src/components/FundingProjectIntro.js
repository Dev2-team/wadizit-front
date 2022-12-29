import React from "react";
import { Image, Segment } from "semantic-ui-react";
import FundingReward from "./FundingReward";

const FundingProjectIntro = () => {
  return (
    <>
      <Segment style={{ height: 1000 }}>
        <Image src={"logo512.png"}></Image>
      </Segment>
      <Segment>
        <FundingReward />
      </Segment>
    </>
  );
};

export default FundingProjectIntro;
