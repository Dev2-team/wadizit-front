import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header, Comment, Form } from "semantic-ui-react";
import Button from "./Button";
import FundingCommentList from "./FundingCommentList";

const FundingComment = () => {

  const fundingNum = localStorage.getItem("fundingNum");

  const nav = useNavigate();

  const [fundCom, setFundCom] = useState({
    content: "",
    fundingNum: fundingNum
  });

  const [, updateState] = useState();

  const forceUpdate = useCallback((e) =>
      updateState({}), []);

  const { content } = fundCom;

  const memberNum = sessionStorage.getItem("memberNum");

  const [fundComData, setFundComData] = useState([]);

  // 펀딩 댓글 리스트 얻기
  useEffect(() => {
    axios
        .get("/funding/comment/list", { params: { fundingNum: fundingNum } })
        .then((res) => {
          console.log("리스트", res.data);
            setFundComData(res.data);
            localStorage.setItem("fundAmount", res.data.length);
        })
        .catch((error) => console.log(error));
  }, []);

  //댓글 입력 기능
  const fundComWrite = useCallback(
    () => {
      
      if (memberNum === null) {
        alert("로그인 이후 이용가능합니다.");
        nav("/login");
      } else {
        axios
        .post("/funding/comment", {memberNum: {memberNum: memberNum}, content: fundCom.content} , {params: {fundingNum : fundingNum}})
        .then((res) => {
            if (res.data !== null) {
                alert("댓글 작성에 성공하셨습니다.");
                setFundComData([...fundComData, res.data])
            } else {
                alert("댓글 작성에 실패하셨습니다.");
            }
        })
        .catch((error) => console.log(error));
}},
      [fundCom, fundComData]
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
              resize: "none", height: "100px", display: "inline", fontSize:"15px"}}
              name="content" value={content} onChange={onChange} placeholder="응원의 한마디 부탁드립니다!" required/>
          <Button
            // labelPosition="left"
            icon="edit"
            primary style={{float:"right",fontSize:"15px"}}
            >등록하기</Button>
            </div>
        </Form>
        <FundingCommentList fundingCommentList={fundComData}/>  
      </Comment.Group>
    </Container>
  );
};

export default FundingComment;
