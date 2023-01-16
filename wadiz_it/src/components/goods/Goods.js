import React from "react";
import GoodsList from "./GoodsList";
import { Container, Header } from "semantic-ui-react";

const Goods = () => {
  return (
    <Container textAlign="left">
      <Container textAlign="center">
        <Header as={"h5"} textAlign="right">
          보유 토큰: {sessionStorage.getItem("currentTokenAmount")}
        </Header>
        <GoodsList></GoodsList>
      </Container>
    </Container>
  );
};

export default Goods;
