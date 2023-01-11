import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Tab, Header, Table, Button } from "semantic-ui-react";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const AdminPage = () => {
  const nav = useNavigate();

  const [memberItem, setMemberItem] = useState([]);
  const [fundingItem, setFundingItem] = useState([]);
  const [boardItem, setBoardItem] = useState([]);

  useEffect(() => {
    // 서버로부터 회원 목록 가져오기
    axios
      .get("/member/findAll")
      .then((res) => {
        setMemberItem(res.data);
      })
      .catch((err) => console.log(err));

    // 서버로부터 펀딩 목록 가져오기
    axios
      .get("/funding/list")
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data[0].status);
        // console.log(res.data.length);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].status === "0") {
            res.data[i].status = "대기";
          }
        }
        setFundingItem(res.data);
      })
      .catch((err) => console.log(err));

    // 서버로부터 게시글 목록 가져오기
    axios
      .get("/board/list")
      .then((res) => {
        setBoardItem(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //////////////////// Member /////////////////////
  // 출력할 회원 목록 작성
  let memberList = Object.values(memberItem).map((item) => (
    <Table.Row key={item.memberNum} textAlign="center">
      <Table.Cell>{item.memberNum}</Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.nickname}</Table.Cell>
      <Table.Cell>{item.email}</Table.Cell>
      <Table.Cell>{item.phone}</Table.Cell>
      <Table.Cell>
        <Button
          style={{
            border: "1px solid #ff6666",
            backgroundColor: "#ffffff",
            color: "#ff6666",
          }}
          size="small"
          onClick={() => delMember(item.memberNum)}
        >
          삭제
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  // 회원 삭제
  const delMember = (memberNum) => {
    axios
      .delete("/member/delete?MemberNum=" + memberNum)
      .then((res) => {
        const result = res.data;
        if (result === true) {
          alert("회원 삭제 완료");
        } else {
          alert("회원 삭제 실패");
        }
      })
      .catch((err) => console.log(err));
  };

  //////////////////// Funding /////////////////////
  // 출력할 펀딩 목록 작성
  let fundingList = Object.values(fundingItem).map((item) => (
    <Table.Row
      style={{ height: "47.43px" }}
      key={item.fundingNum}
      textAlign="center"
    >
      <Table.Cell>{item.fundingNum}</Table.Cell>
      <Table.Cell>{item.memberNum.name}</Table.Cell>
      <Table.Cell>
        <div onClick={() => getFunding(item.fundingNum)}>{item.title}</div>
      </Table.Cell>
      <Table.Cell>{item.targetAmount}</Table.Cell>
      <Table.Cell>{item.status}</Table.Cell>
    </Table.Row>
  ));

  // 해당 펀딩 상세로 이동
  const getFunding = useCallback(
    (fundingNum) => {
      // 보여질 펀딩 글의 번호를 localStorage에 저장
      localStorage.setItem("fundingNum", fundingNum);
      // 해당 링크로 이동
      nav("/adminPage/fundingDetail");
    },
    [nav]
  );

  //////////////////// Board /////////////////////
  // 출력할 게시글 목록 작성
  let boardList = Object.values(boardItem).map((item) => (
    <Table.Row key={item.boardNum} textAlign="center">
      <Table.Cell>{item.boardNum}</Table.Cell>
      <Table.Cell>{item.memberNum.name}</Table.Cell>
      <Table.Cell>{item.title}</Table.Cell>
      <Table.Cell>{df(item.date)}</Table.Cell>
      <Table.Cell>
        <Button
          style={{
            border: "1px solid #ff6666",
            backgroundColor: "#ffffff",
            color: "#ff6666",
          }}
          size="small"
          onClick={() => delBoard(item.boardNum)}
        >
          삭제
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  // 게시글 삭제 처리
  const delBoard = (boardNum) => {
    axios
      .delete("/board?boardNum=" + boardNum)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => console.log(err));
  };

  const manageMember = () => {
    return (
      <Container>
        <Container
          style={{
            display: "flex",
            verticalAlign: "middle",
            justifyContent: "space-between",
          }}
        >
          <Header style={{}}>회원 관리</Header>
        </Container>
        <Table celled compact definition collapsing={false}>
          <Table.Header fullWidth>
            <Table.Row textAlign="center">
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>이름</Table.HeaderCell>
              <Table.HeaderCell>닉네임</Table.HeaderCell>
              <Table.HeaderCell>이메일</Table.HeaderCell>
              <Table.HeaderCell>전화번호</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{memberList}</Table.Body>
        </Table>
      </Container>
    );
  };

  const manageFunding = () => {
    return (
      <Container>
        <Container
          style={{
            display: "flex",
            verticalAlign: "middle",
            justifyContent: "space-between",
          }}
        >
          <Header style={{}}>펀딩 관리</Header>
        </Container>
        <Table celled compact definition collapsing={false}>
          <Table.Header fullWidth>
            <Table.Row textAlign="center">
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>목표 금액</Table.HeaderCell>
              <Table.HeaderCell>상태</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{fundingList}</Table.Body>
        </Table>
      </Container>
    );
  };

  const manageBoard = () => {
    return (
      <Container>
        <Container
          style={{
            display: "flex",
            verticalAlign: "middle",
            justifyContent: "space-between",
          }}
        >
          <Header style={{}}>게시글 관리</Header>
        </Container>
        <Table celled compact definition collapsing={false}>
          <Table.Header fullWidth>
            <Table.Row textAlign="center">
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>날짜</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{boardList}</Table.Body>
        </Table>
      </Container>
    );
  };

  const panes = [
    {
      menuItem: "회원 관리",
      render: () => <Tab.Pane attached={false}>{manageMember()}</Tab.Pane>,
    },
    {
      menuItem: "펀딩 관리",
      render: () => <Tab.Pane attached={false}>{manageFunding()}</Tab.Pane>,
    },
    {
      menuItem: "게시글 관리",
      render: () => <Tab.Pane attached={false}>{manageBoard()}</Tab.Pane>,
    },
  ];

  const TabMenu = () => (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  );

  return (
    <Container textAlign="left">
      <Header as="h3">
        <div
          style={{
            backgroundColor: "#00b2b2",
            color: "#fff",
            marginTop: "7.5px",
            paddingLeft: "20px",
            height: "40px",
            lineHeight: "40px",
            textAlign: "left",
          }}
        >
          관리자 페이지
        </div>
      </Header>
      {TabMenu()}
    </Container>
  );
};

export default AdminPage;
