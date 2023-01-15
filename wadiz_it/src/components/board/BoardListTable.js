import axios from "axios";
import moment from "moment/moment";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "semantic-ui-react";

const dateFormat = (date) => moment(date).format("YYYY.MM.DD");

const BoardListTable = () => {
  const nav = useNavigate();

  const [boardItem, setBoardItem] = useState([]);

  //리스트 페이지가 화면에 보일 때 서버로부터 게시글 목록을 가져온다.
  useEffect(() => {
    axios
      .get("/board/list")
      .then((res) => {
        console.log(res.data);
        setBoardItem(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getBoardDetail = useCallback((boardNum) => {
    localStorage.setItem("boardNum", boardNum);
    nav("/board/detail");
  });

  //출력할 게시글 목록 작성
  let boardList = null;
  if (boardItem.length === 0) {
    boardList = (
      <Table.Row key={0}>
        <Table.Cell
          colspan="5"
          style={{
            height: "200px",
            lineHeight:"200px",
            fontSize: "17px",
            color: "#90949c",
            fontWeight:400
          }}
        >
          게시글이 아직 존재하지 않습니다.
        </Table.Cell>
      </Table.Row>
    );
  } else {
    boardList = Object.values(boardItem).map((bItem) => (
      <Table.Row key={bItem.boardNum} className="tableCell">
        <Table.Cell>
          <div onClick={() => getBoardDetail(bItem.boardNum)}>
            {bItem.boardNum}
          </div>
        </Table.Cell>
        <Table.Cell>
          <div
            onClick={() => getBoardDetail(bItem.boardNum)}
            style={{
              cursor: "pointer",
            }}
          >
            {bItem.title}
          </div>
        </Table.Cell>
        <Table.Cell>{bItem.memberNum.nickname}</Table.Cell>
        <Table.Cell>{dateFormat(bItem.date)}</Table.Cell>
        <Table.Cell>{bItem.view}</Table.Cell>
      </Table.Row>
    ));
  }

  return (
    <Container>
      <Table celled compact definition collapsing={false}>
        <Table.Header fullWidth>
          <Table.Row style={{ textAlign: "center" }}>
            <Table.HeaderCell style={{ width: "10%" }}>번호</Table.HeaderCell>
            <Table.HeaderCell style={{ width: "35%" }}>제목</Table.HeaderCell>
            <Table.HeaderCell style={{ width: "20%" }}>작성자</Table.HeaderCell>
            <Table.HeaderCell style={{ width: "25%" }}>
              작성날짜
            </Table.HeaderCell>
            <Table.HeaderCell style={{ width: "10%" }}>조회수</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body style={{ textAlign: "center" }}>{boardList}</Table.Body>
      </Table>
    </Container>
  );
};

export default BoardListTable;
