import axios from "axios";
import React, { useCallback, useState } from "react";
import { Container, Header, Button, Comment, Form, Placeholder } from "semantic-ui-react";
import FundingCommentList from "./FundingCommentList";


const FundingComment = () => {

  const [fundCom, setFundCom] = useState({
    content: "",
    fundingNum: {}
  });

  const [, updateState] = useState();
  const forceUpdate = useCallback((e) =>
      updateState({}), []);

  const { content } = fundCom;

  //댓글 입력 기능
  const fundComWrite = useCallback(
      () => {
                  
          axios
              .post("/funding/comment", fundCom , {params: {fundingNum : 2}})
              .then((res) => {
                  if (res.data === "댓글 입력 성공") {
                      alert("댓글 작성에 성공하셨습니다.");

                  } else {
                      alert("댓글 작성에 실패하셨습니다.");

                  }

              })
              .catch((error) => console.log(error));
      },
      [fundCom]

  );

  const onChange = useCallback(
      (e) => {
          const dataObj = {
              ...fundCom,
              [e.target.name]: e.target.value,
          };

          setFundCom(dataObj);
      },
      [fundCom]
  );


  return (
    <Container textAlign="left">
      <Comment.Group style={{ maxWidth: "100%" }}>
        <Header as="h3" dividing >
          커뮤니티
        </Header>

        <Form reply onSubmit={fundComWrite}>
          <div className="fundComWrArea" style={{display:"inline-block", width:"700px"}}>
          <Form.TextArea style={{ resize: "none", height: "100px", width: "600px", display:"inline"}}
            name="content" value={content} onChange={onChange} placeholder="응원의 한마디 부탁드립니다!"/>
          <Button
            content="등록하기"
            labelPosition="left"
            icon="edit"
            primary style={{display:"inline"}}
            />
            </div>
        </Form>
        <FundingCommentList/>  
      </Comment.Group>
    </Container>
  );
};

export default FundingComment;
