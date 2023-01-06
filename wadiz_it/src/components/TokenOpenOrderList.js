import React from "react";
import { Segment, Header } from "semantic-ui-react";
import TokenOpenOrderElement from "./TokenOpenOrderElement";

const makeTokenOpenOrderList = (orderList, cancel) => {
  console.log("makeTokenOpenOrderList", orderList);
  if (orderList === undefined) return;
  const result = [];
  // result.push(<Header style={{ margin: 0, padding: 0 }}>주문 내역</Header>);
  for (let i = 0; i < orderList.length; i++) {
    const order = orderList[i];
    let color = "red";
    if (order.type === 1) {
      color = "green";
    }
    result.push(
      <TokenOpenOrderElement
        key={i}
        color={color}
        orderNum={order.orderNum}
        orderType={order.type === 1 ? "BUY" : "SELL"}
        orderPrice={order.price}
        cancelOrder={cancel}
      ></TokenOpenOrderElement>
    );
  }
  return <Segment basic={true}>{result}</Segment>;
};

const TokenOpenOrderList = (props) => {
  return makeTokenOpenOrderList(props.myOrderList, props.cancel);
};

export default TokenOpenOrderList;
