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
    fundingNum: fundingNum,
  });
  const memberNum = sessionStorage.getItem("memberNum");
  const [fundComData, setFundComData] = useState([]);

  // 펀딩 댓글 리스트 얻기
  useEffect(() => {
    axios
      .get("/funding/comment/list", { params: { fundingNum: fundingNum } })
      .then((res) => {
        setFundComData(res.data);
        localStorage.setItem("fundAmount", res.data.length);
      })
      .catch((error) => console.log(error));
  }, []);

  //댓글 입력 기능
  const fundComWrite = useCallback(() => {
    if (memberNum === null) {
      alert("로그인 이후 이용가능합니다.");
      nav("/login");
    } else {
      axios
        .post(
          "/funding/comment",
          { memberNum: { memberNum: memberNum }, content: fundCom.content },
          { params: { fundingNum: fundingNum } }
        )
        .then((res) => {
          if (res.data !== null) {
            // alert("댓글 작성에 성공하셨습니다.");
            setFundComData([...fundComData, res.data]);
          } else {
            // alert("댓글 작성에 실패하셨습니다.");
          }
        })
        .catch((error) => console.log(error));
      setFundCom({ ...fundCom, content: "" });
    }
  }, [fundCom, fundComData]);

  // 댓글 삭제 함수
  const deleteComment = useCallback(
    (comNum) => {
      console.log("deleteComment");
      console.log(fundComData);
      let result = window.confirm("댓글을 삭제하시겠습니까?");
      if (result === true) {
        axios
          .delete("/funding/comment", { params: { fundingComNum: comNum } })
          .then((res) => {
            if (res.data === "댓글 삭제 성공") {
              const newCommentList = fundComData.filter(
                (comment) => comment.fundingComNum !== comNum
              );
              setFundComData(newCommentList);
            }
          });
      }
    },
    [fundComData]
  );

  // 댓글 수정 함수
  const modifyComment = useCallback(
    (comNum, content) => {
      console.log(comNum);
      axios
        .put(
          "/funding/comment",
          { content: content },
          {
            params: { fundingComNum: comNum },
          }
        )
        .then((res) => {
          if (res.data !== null) {
            console.log("update res", res.data);
            const updatedComment = res.data;
            let newCommentList = [];
            for (let comment of fundComData) {
              if (updatedComment.fundingComNum === comment.fundingComNum) {
                comment.content = updatedComment.content;
                comment.date = updatedComment.date;
                newCommentList.push(comment);
              } else {
                newCommentList.push(comment);
              }
            }
            setFundComData(newCommentList);
          }
        })
        .catch((err) => console.log(err));
    },
    [fundComData]
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
        <Header as="h3" dividing>
          커뮤니티
        </Header>

        <Form reply onSubmit={fundComWrite}>
          {/* <div className="fundComWrArea" style={{display:"inline-block", width:"700px"}}> */}

          <Form.Group>
            <Form.Input
              id="fundingComText"
              width={15}
              // style={{resize: "none", height: "100px", width: "600px", display: "inline", fontSize:"15px"}}
              name="content"
              value={fundCom.content}
              onChange={onChange}
              placeholder="응원의 한마디 부탁드립니다!"
              required
            />
            <Button
              width={1}
              // labelPosition="left"
              icon="edit"
              // primary style={{fontSize:"15px"}}
            >
              등록하기
            </Button>
          </Form.Group>
          {/* </div> */}
        </Form>
        <FundingCommentList
          fundingCommentList={fundComData}
          deleteComment={deleteComment}
          modifyComment={modifyComment}
        />
      </Comment.Group>
    </Container>
  );
};

export default FundingComment;
