import React from "react";
import { Button, Container, Header } from "semantic-ui-react";

const BoardDetail = () => {
  return (
    <Container>
      <Container>
        <Container
          style={{
            display: "flex",
            verticalAlign: "middle",
            justifyContent: "space-between",
          }}
        >
          <Header style={{ height: 5 }}>게시글</Header>
          <Button size="tiny">작성</Button>
        </Container>
      </Container>
    </Container>
  );
};

export default BoardDetail;
