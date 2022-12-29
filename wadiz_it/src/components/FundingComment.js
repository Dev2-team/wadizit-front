import React from "react";
import { Container, Header, Button, Comment, Form } from "semantic-ui-react";

const FundingComment = () => {
  return (
    <Container>
      <Comment.Group style={{ maxWidth: "100%" }}>
        <Header as="h3" dividing>
          댓글
        </Header>

        <Comment>
          <Comment.Content>
            <Comment.Author as="b">Matt</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>How artistic!</Comment.Text>
          </Comment.Content>
        </Comment>

        <Comment>
          <Comment.Content>
            <Comment.Author as="b">Elliot Fu</Comment.Author>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>

        <Comment>
          <Comment.Content>
            <Comment.Author as="b">Joe Henderson</Comment.Author>
            <Comment.Metadata>
              <div>5 days ago</div>
            </Comment.Metadata>
            <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
          </Comment.Content>
        </Comment>

        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </Container>
  );
};

export default FundingComment;
