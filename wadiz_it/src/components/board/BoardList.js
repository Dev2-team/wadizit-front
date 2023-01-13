import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import BoardListTable from "./BoardListTable";

const BoardList = () => {
  const nav = useNavigate();
  const loginPerson = sessionStorage.getItem("memberNum");
  console.log("로그인한 사람 : " + loginPerson);

  const boardWrite = () => {
    //로그인한 상태가 아닐 경우, 로그인 페이지로 이동
    if (loginPerson === null) {
      alert("로그인을 하셔야 글 작성이 가능합니다.");
      nav("/login");
    } else {
      nav("/board/write");
    }
  };

  return (
    <Container>
      {/* <Container
        style={{
          display: "flex",
          verticalAlign: "middle",
          justifyContent: "space-between",
        }}
      >
        </Container> */}
      <Header
        as="h1"
        style={{ marginTop: "50px", textAlign: "left", marginBottom: "30px" }}
      >
        자유게시판
      </Header>
      <Button
        size="tiny"
        onClick={boardWrite}
        style={{ float: "right", marginBottom: "25px", backgroundColor:"#00b2b2", color:"#fff" }}
      >
        작성
      </Button>
      <BoardListTable></BoardListTable>
    </Container>
  );
};

export default BoardList;
