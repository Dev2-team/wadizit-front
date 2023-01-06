import React from "react";
import { Container, Segment, Grid, Header, Button } from "semantic-ui-react";

const TokenOpenOrderElement = (props) => {
  const cancelOrder = () => {
    props.cancelOrder(props.orderNum);
  };

  return (
    <Segment.Group
      basic="true"
      style={{
        flex: 1,
        margin: 0,
        padding: 0,
      }}
    >
      <Grid style={{ margin: 0, padding: 5 }}>
        <Grid.Row style={{ margin: 0, padding: 0 }} textAlign="center">
          <Grid.Column
            verticalAlign={"middle"}
            stretched
            style={{ margin: 0, padding: 0 }}
            width={4}
          >
            <Header
              as={"h4"}
              color={props.color}
              textAlign={"left"}
              style={{ margin: 0, marginLeft: 5, padding: 0 }}
            >
              {/* 주문 타입 */}
              {props.orderType}
            </Header>
          </Grid.Column>
          <Grid.Column
            verticalAlign={"middle"}
            stretched
            style={{ margin: 0, padding: 0 }}
            width={8}
          >
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Header
                as={"h4"}
                textAlign={"right"}
                color={props.color}
                style={{ flex: 1, margin: 0, padding: 0, marginRight: 5 }}
              >
                {/* 주문 가격 */}
                {props.orderPrice}
              </Header>
            </Container>
          </Grid.Column>

          <Grid.Column
            verticalAlign={"middle"}
            stretched
            style={{ margin: 0, padding: 0 }}
            width={4}
          >
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                basic={true}
                style={{ padding: 0, margin: 0 }}
                onClick={cancelOrder}
                icon="cancel"
              ></Button>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment.Group>
  );
};

export default TokenOpenOrderElement;
