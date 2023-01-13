import React from "react";
import GoodsList from "./GoodsList";
import { Container, Header } from "semantic-ui-react";

const Goods = () => {
  return (
    <Container textAlign="left">
      <Container textAlign="center">
        <GoodsList></GoodsList>
      </Container>
    </Container>
  );
};

export default Goods;
