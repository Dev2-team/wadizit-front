import React from "react";
import {
  Container,
  Grid,
  Header,
  Card,
  Button,
  Progress,
  Icon,
  Input,
  Divider,
  Segment,
} from "semantic-ui-react";

const TokenTransaction = () => {
  return (
    <Container textAlign="left">
      <Header as={"h2"}>후원 토큰 거래소</Header>

      <Container fluid style={{ display: "flex", alignItems: "center" }}>
        {/* 호가창 */}

        <Segment basic style={{ flex: 1, margin: 0, padding: 0 }}>
          <Grid style={{ margin: 0, padding: 0 }}>
            <Grid.Row style={{ margin: 0, padding: 0 }} textAlign="center">
              <Grid.Column
                verticalAlign={"middle"}
                stretched
                style={{ margin: 0, padding: 0 }}
                width={5}
              >
                <Progress
                  basic
                  style={{ margin: 0, padding: 0 }}
                  percent={10}
                ></Progress>
              </Grid.Column>
              <Grid.Column
                verticalAlign={"middle"}
                stretched
                style={{ margin: 0, padding: 0 }}
                width={6}
              >
                <Container
                  fluid
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Header
                    textAlign={"left"}
                    style={{ flex: 1, margin: 0, padding: 0 }}
                  >
                    1
                  </Header>
                  <Header style={{ flex: 1, margin: 0, padding: 0 }}>1</Header>
                  <Header
                    textAlign={"right"}
                    style={{ flex: 1, margin: 0, padding: 0 }}
                  >
                    1
                  </Header>
                </Container>
              </Grid.Column>
              {/* <Grid.Column verticalAlign={'middle'} stretched style={{'margin':0, 'padding':0}} width={2}>
                    <Segment basic style={{'margin':0, 'padding':0}}>2</Segment>
                </Grid.Column>
                <Grid.Column verticalAlign={'middle'} stretched style={{'margin':0, 'padding':0}} width={2}>
                    <Segment basic style={{'margin':0, 'padding':0}}>3</Segment>
                </Grid.Column>
                <Grid.Column verticalAlign={'middle'} stretched style={{'margin':0, 'padding':0}} width={2}>
                    <Segment basic style={{'margin':0, 'padding':0}}>4</Segment>
                </Grid.Column> */}
              <Grid.Column
                verticalAlign={"middle"}
                stretched
                style={{ margin: 0, padding: 0 }}
                width={5}
              >
                <Progress
                  progress="value"
                  value="a"
                  percent={10}
                  style={{ margin: 0, padding: 0, transform: "scaleX(-1)" }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        {/* <Container style={{'margin':0, 'padding':0}}>
                    <Segment.Group horizontal style={{'margin':0, 'padding':0}}>
                            <Segment style={{'margin':0, 'padding':0}}><Progress percent={33} style={{'margin':0, 'padding':0}}/></Segment>
                            <Segment style={{'margin':0, 'padding':0,}}>10</Segment>
                            <Segment style={{'margin':0, 'padding':0, 'transform': 'scaleX(-1)'}}><Progress percent={10} style={{'margin':0, 'padding':0}}/></Segment>
                    </Segment.Group>

                    <Segment.Group horizontal style={{'margin':0, 'padding':0}}>
                            <Segment style={{'margin':0, 'padding':0}}>
                                <Progress style={{'margin':0, 'padding':0}} percent={33} />
                            </Segment>
                            <Segment style={{'margin':0, 'padding':0}}>1</Segment>
                            <Segment style={{'margin':0, 'padding':0, 'transform': 'scaleX(-1)'}}><Progress style={{'margin':0, 'padding':0}} percent={100} /></Segment>
                    </Segment.Group>
                </Container> */}

        {/* <Segment>
                    <Segment.Group piled>
                        <Segment>Left</Segment>
                        <Segment>Middle</Segment>
                        <Segment>Right</Segment>
                    </Segment.Group>
                </Segment> 
            </Segment.Group>*/}

        {/* 주문창 */}
        <Segment.Group basic={true}>
          <Card>
            <Card.Content>
              <Card.Header>토큰 매수 주문</Card.Header>
              <Card.Description>
                <Container
                  style={{
                    display: "flex",
                    verticalAlign: "middle",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Header style={{ margin: 0 }} size="small">
                    매수 가능 금액
                  </Header>
                  <Header style={{ margin: 0 }} size="small">
                    100000원
                  </Header>
                </Container>
                <br></br>
                <Input
                  icon={<Icon name="inr" inverted circular link />}
                  size="mini"
                  fluid
                ></Input>
                <Divider></Divider>
                <Button fluid color="green">
                  매수
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Card.Header>토큰 매도 주문</Card.Header>
              <Card.Description>
                <Container
                  style={{
                    display: "flex",
                    verticalAlign: "middle",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Header style={{ margin: 0 }} size="small">
                    매도 가능 토큰
                  </Header>
                  <Header style={{ margin: 0 }} size="small">
                    10개
                  </Header>
                </Container>
                <br></br>
                <Input
                  icon={<Icon name="inr" inverted circular link />}
                  size="mini"
                  fluid
                ></Input>
                <Divider></Divider>
                <Button fluid color="red">
                  매도
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>
        </Segment.Group>
      </Container>
    </Container>
  );
};

export default TokenTransaction;
