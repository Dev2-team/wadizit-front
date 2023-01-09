import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header, Comment, Form } from "semantic-ui-react";
import Button from "./Button";
import FundingCommentList from "./FundingCommentList";

const FundingComment = () => {

  const nav = useNavigate();

  const [fundCom, setFundCom] = useState({
    content: "",
    fundingNum: {}
  });

  const [, updateState] = useState();

  const forceUpdate = useCallback((e) =>
      updateState({}), []);

  const { content } = fundCom;

  const loginPerson = sessionStorage.getItem("memberNum");
  console.log("로그인한 사람 : " + loginPerson);

  //댓글 입력 기능
  const fundComWrite = useCallback(
    () => {
      
      if (loginPerson === null) {
        alert("로그인 이후 이용가능합니다.");
        nav("/fundingDetail");

      } else {
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
}},
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
            <Form.TextArea id="fundingComTextArea" style={{
              resize: "none", height: "100px", width: "600px", display: "inline", fontSize:"15px"}}
              name="content" value={content} onChange={onChange} placeholder="응원의 한마디 부탁드립니다!" required/>
          <Button
            // labelPosition="left"
            icon="edit"
            primary style={{float:"right", marginRight:"95px", width:"100px", fontSize:"15px"}}
            >등록하기</Button>
            </div>
        </Form>
        <FundingCommentList/>  
      </Comment.Group>
    </Container>
  );
};

export default FundingComment;
