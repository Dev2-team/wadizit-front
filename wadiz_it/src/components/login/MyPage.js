import React from "react";
import { Container, Tab, Header } from "semantic-ui-react";
import MyPageFunding from "./MyPageFunding";
import MyPageMember from "./MyPageMember";

const MyPage = () => {
  const panes = [
    {
      menuItem: "회원 정보",
      render: () => <Tab.Pane attached={false}>{<MyPageMember />}</Tab.Pane>,
    },
    {
      menuItem: "펀딩 생성 내역",
      render: () => <Tab.Pane attached={false}>{<MyPageFunding />}</Tab.Pane>,
    },
    {
      menuItem: "보유 코인 내역",
      render: () => <Tab.Pane attached={false}>{}</Tab.Pane>,
    },
    {
      menuItem: "결제 내역",
      render: () => <Tab.Pane attached={false}>{}</Tab.Pane>,
    },
  ];

  const TabMenu = () => (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  );

  return (
    <Container textAlign="left">
      <Header as="h2">마이페이지</Header>
      {TabMenu()}
    </Container>
  );
};

export default MyPage;
