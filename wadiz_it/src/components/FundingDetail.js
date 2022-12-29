import React from "react";
import {
  Container,
  Image,
  Tab,
  Grid,
  Header,
  Segment,
  Button,
} from "semantic-ui-react";
import FundingComment from "./FundingComment";
import FundingProjectIntro from "./FundingProjectIntro";
import FundingReward from "./FundingReward";

const panes = [
  {
    menuItem: "프로젝트 소개",
    render: () => (
      <Tab.Pane attached={false}>{<FundingProjectIntro />}</Tab.Pane>
    ),
  },
  {
    menuItem: "커뮤니티",
    render: () => <Tab.Pane attached={false}>{<FundingComment />}</Tab.Pane>,
  },
  {
    menuItem: "리워드",
    render: () => <Tab.Pane attached={false}>{<FundingReward />}</Tab.Pane>,
  },
];

const TabMenu = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
);

const FundingDetail = () => {
  return (
    <Container>
      <Grid centered doubling columns={2}>
        <Grid.Column>
          <Image
            style={{ width: "100%", height: 450, "object-fit": "cover" }}
            src="lesson_black.png"
          />
        </Grid.Column>

        <Grid.Column
          style={{
            display: "flex",
            "flex-direction": "column",
            justifyContent: "space-between",
          }}
        >
          <Container style={{ height: 10 }}></Container>

          <Segment vertical>
            <Header
              style={{
                "white-space": "nowrap",
                overflow: "hidden",
                "text-overflow": "ellipsis",
              }}
            >
              포켓몬스터 골드버전
            </Header>
          </Segment>
          <Segment vertical>
            <Header
              style={{
                "white-space": "nowrap",
                overflow: "hidden",
                "text-overflow": "ellipsis",
              }}
            >
              100,000원 모금
            </Header>
          </Segment>
          <Segment vertical>
            <Header
              style={{
                "white-space": "nowrap",
                overflow: "hidden",
                "text-overflow": "ellipsis",
              }}
            >
              2022-12-31 마감
            </Header>
          </Segment>
          <Segment vertical>
            <Button fluid>후원하기</Button>
          </Segment>
        </Grid.Column>
      </Grid>
      <Container style={{ height: 10 }}></Container>

      <TabMenu></TabMenu>
    </Container>
  );
};

export default FundingDetail;
