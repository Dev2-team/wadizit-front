import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import BoardListTable from "./BoardListTable";

const BoardList = () => {

  const nav = useNavigate();
  const loginPerson = sessionStorage.getItem("memberNum");
  console.log("로그인한 사람 : " + loginPerson);

  //자유게시판 게시물 총 갯수
  let boardListNum = sessionStorage.getItem("boardListNum")

  const boardWrite = () => {
    //로그인한 상태가 아닐 경우, 로그인 페이지로 이동
    if (loginPerson === null) {
      alert("로그인을 하셔야 글 작성이 가능합니다.");
      nav("/login");
    } else {
      nav("/board/write");
    }
  };

    //게시글 갯수 출력 함수
    useEffect(() => {
      axios
        .get("/board/list")
        .then((res) => {
          console.log("게시글 갯수" + res.data.length);
          sessionStorage.setItem("boardListNum", res.data.length);
        })
        .catch((err) => console.log(err));
    }, []);

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
        style={{ marginTop: "50px", textAlign: "left", marginBottom: "5px"}}
      >
        <p style={{ color: "#00b2b2", display: "inline", fontSize: "32px", marginRight:"5px" }} >와디즈IT</p>
        <p style={{ display: "inline", fontSize:"22px" }}>의 자유게시판</p>
      </Header>

      <Container style={{ textAlign: "left", marginTop: "50px", display: "inline-block", lineHeight:"43px" }}>
      <Button type="button"
                onClick={boardWrite}
          style={{
          display:"inline",
                  float: "right",
                  alignItems: "center",
          margin: "0px",
                  marginBottom:"10px",
                  fontSize:"0.9rem",
                  border: "1px solid #00b2b2",
                  backgroundColor: "#ffffff",
          color: "#00b2b2",

                }}
              >
                글쓰기
        </Button>
      <div style={{display:"inline", fontSize:"16px", float:"left"}}>
        <div style={{ display:"inline", textAlign:"left"}}>총&nbsp;&nbsp;</div>
        <div style={{display:"inline", color:"#00b2b2", fontWeight:"bold"}}>{boardListNum}개</div>
        <div style={{display:"inline"}}>의 게시물이 있습니다.</div>
      </div>

      
        </Container>

      <BoardListTable></BoardListTable>
    </Container>
  );
};

export default BoardList;
