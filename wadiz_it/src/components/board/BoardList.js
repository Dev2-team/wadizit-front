import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import Swal from "sweetalert2";
import BoardListTable from "./BoardListTable";

const BoardList = () => {

  const nav = useNavigate();
  const loginPerson = sessionStorage.getItem("memberNum");
  console.log("로그인한 사람 : " + loginPerson);



  const boardWrite = () => {
    //로그인한 상태가 아닐 경우, 로그인 페이지로 이동
    if (loginPerson === null) {
      // alert("로그인을 하셔야 글 작성이 가능합니다.");
      Swal.fire({
        icon: "error",
        iconColor: "#ff6666",
        title: "로그인이 필요합니다.",
        showConfirmButton: true,
      })
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
        style={{ marginTop: "50px", textAlign: "left", marginBottom: "50px"}}
      >
        <p style={{ color: "#00b2b2", display: "inline", fontSize: "32px", marginRight:"5px" }} >와디즈IT</p>
        <p style={{ display: "inline", fontSize:"22px" }}>의 자유게시판</p>
      </Header>

      <Container>
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
      

      
        {/* </Container> */}

      <BoardListTable style={{display:"inline"}}></BoardListTable>
      </Container>
    </Container>
  );
};

export default BoardList;
