import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Tab, Header, Table, Divider} from "semantic-ui-react";




const MyPage = () => {

  const [pwdModReadOnly, setPwdModReadOnly] = useState(true);
  const pwdModBtnFunc = () => {
    console.log("pwdModBtn");

    setPwdModReadOnly(!pwdModReadOnly);
  };

  const nav = useNavigate();

  const [memberItem, setMemberItem] = useState([]);
  const [myFundingItem, setMyFundingItem] = useState([]);
  const [myDonateItem, setMyDonateItem] = useState([]);

  const memberNum = sessionStorage.getItem("memberNum");

  useEffect(() => {
    // 서버로부터 내 정보 가져오기
    axios
    .get(`/member/get?MemberNum=${memberNum}`)
    .then((res) => {
      setMemberItem(res.data);
    })
    .catch((err) => console.log(err));

    // 서버로부터 내 펀딩 생성 내역 가져오기
    axios
    .get(`/funding/plist?MemberNum=${memberNum}`)
    .then((res) => {
      console.log(res.data);
      setMyFundingItem(res.data);
    })
    .catch((err) => console.log(err));

    // 서버로부터 내 펀딩 참가 내역 가져오기
    axios
    .get(`/donate/dlist?MemberNum=${memberNum}`)
    .then((res) => {
      setMyDonateItem(res.data);
    })
    .catch((err) => console.log(err));    
  }, []);


  const manageMember = () => {
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
            <Form.Input label="ID" defaultValue={memberItem.id} readOnly={true} />
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
              defaultValue={memberItem.pwd}
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
              defaultValue={memberItem.name}
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
              defaultValue={memberItem.nickname}
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
              defaultValue={memberItem.phone}
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
              defaultValue={memberItem.email}
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
              <Table.HeaderCell>시작일</Table.HeaderCell>
              <Table.HeaderCell>종료일</Table.HeaderCell>
              <Table.HeaderCell>목표금액</Table.HeaderCell>
              <Table.HeaderCell>현재금액</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <FundingTable/>
          </Table.Body>
        </Table>
      </Container>
      )
  };

  const FundingTable = () => {
    return (
      Object.values(myFundingItem).map((item) => {
        return (
          <Table.Row  key={item.fundingNum} >
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>{item.startDate}</Table.Cell>
          <Table.Cell>{item.endDate}</Table.Cell>
          <Table.Cell>{item.targetAmount}</Table.Cell>
          <Table.Cell>{item.currentAmount}</Table.Cell>
        </Table.Row>
        )
        })  
  )}


  const manageDonate = () => {
    return (
      Object.values(myFundingItem).map((item) => {
        return (
      <Container>
        <Table celled compact definition collapsing={false}>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>시작일</Table.HeaderCell>
              <Table.HeaderCell>종료일</Table.HeaderCell>
              <Table.HeaderCell>목표금액</Table.HeaderCell>
              <Table.HeaderCell>현재금액</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {/* <Table.Body>
            <Table.Row>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.startDate}</Table.Cell>
              <Table.Cell>{item.endDate}</Table.Cell>
              <Table.Cell>{item.targetAmount}</Table.Cell>
              <Table.Cell>{item.currentAmount}</Table.Cell>
            </Table.Row>
          </Table.Body> */}

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
      )
  })
    );
  };

  const panes = [
    {
      menuItem: "펀딩 생성 내역",
      render: () => <Tab.Pane attached={false}>{manageFunding()}</Tab.Pane>,
    },
    {
      menuItem: "보유 코인 내역",
      render: () => <Tab.Pane attached={false}>{manageDonate()}</Tab.Pane>,
    },
    // {
    //   menuItem: "내가 쓴 글",
    //   render: () => <Tab.Pane attached={false}>{manageBoard()}</Tab.Pane>,
    // },
    {
      menuItem: "회원 정보",
      render: () => <Tab.Pane attached={false}>{manageMember()}</Tab.Pane>
    }
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
