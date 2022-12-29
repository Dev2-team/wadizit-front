import React, { useState } from "react";
import {
  Container,
  Form,
  Tab,
  Header,
  Table,
  Divider,
} from "semantic-ui-react";
import BoardListTable from "./BoardListTable";

const MyPage = () => {
  const [pwdModReadOnly, setPwdModReadOnly] = useState(true);
  const pwdModBtnFunc = () => {
    console.log("pwdModBtn");
    setPwdModReadOnly(!pwdModReadOnly);
  };

  const manageMember = (id, name) => {
    return (
      <Container>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input label="ID" defaultValue={id} readOnly={true} />
            {/* <Form.Button size='tiny'>수정</Form.Button> */}
          </Container>
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="비밀번호"
              type="password"
              defaultValue={"****"}
              readOnly={pwdModReadOnly}
            />
            <Form.Button size="tiny" onClick={pwdModBtnFunc}>
              수정
            </Form.Button>
          </Container>
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="이름"
              defaultValue={name}
              // onChange={func}
              readOnly={true}
            />
            <Form.Button size="tiny">수정</Form.Button>
          </Container>
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="닉네임"
              defaultValue={"닉네임123"}
              // onChange={func}
              readOnly={true}
            />
            <Form.Button size="tiny">수정</Form.Button>
          </Container>
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="연락처"
              defaultValue={"010-1234-1234"}
              // onChange={func}
              readOnly={true}
            />
            <Form.Button size="tiny">수정</Form.Button>
          </Container>
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="이메일"
              defaultValue={"asdsadsa@gmail.com"}
              // onChange={func}
              readOnly={true}
            />
            <Form.Button size="tiny">수정</Form.Button>
          </Container>
        </Form>
      </Container>
    );
  };

  const manageFunding = () => {
    return (
      <Container>
        <Table celled compact definition collapsing={false}>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>기간</Table.HeaderCell>
              <Table.HeaderCell>목표 금액</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John Lilki</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
              <Table.Cell>No</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie Harington</Table.Cell>
              <Table.Cell>January 11, 2014</Table.Cell>
              <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
            </Table.Row>
          </Table.Body>

          {/* <Table.Footer fullWidth>
      <Table.Row textAlign='right'>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='5'>
          <Button
            floated='right'
            icon
            labelPosition='left'
            primary
            size='small'
          >
            <Icon name='user' /> Add User
          </Button>
          <Button size='small'>삭제</Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer> */}
        </Table>
      </Container>
    );
  };

  const manageBoard = () => {
    return <BoardListTable></BoardListTable>;
  };

  const panes = [
    {
      menuItem: "회원 정보",
      render: () => (
        <Tab.Pane attached={false}>{manageMember("aaa", "홍길동")}</Tab.Pane>
      ),
    },
    {
      menuItem: "펀딩 생성 내역",
      render: () => <Tab.Pane attached={false}>{manageFunding()}</Tab.Pane>,
    },
    {
      menuItem: "펀딩 참가 내역",
      render: () => <Tab.Pane attached={false}>{manageBoard()}</Tab.Pane>,
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
