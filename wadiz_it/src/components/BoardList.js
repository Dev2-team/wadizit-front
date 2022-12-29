import React from "react";
import { Button, Container, Header } from "semantic-ui-react";
import BoardListTable from "./BoardListTable";

const BoardList = () => {
  return (
    <Container>
      <Container
        style={{
          display: "flex",
          verticalAlign: "middle",
          justifyContent: "space-between",
        }}
      >
        <Header as="h2">자유게시판</Header>
        <Button size="tiny">작성</Button>
      </Container>
      <BoardListTable></BoardListTable>
    </Container>
  );
};

export default BoardList;
