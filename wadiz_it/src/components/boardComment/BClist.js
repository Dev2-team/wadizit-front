import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import BCdetail from "./BCdetail";
import BCwrite from "./BCwrite";

const BClist = () => {
  const nickname = sessionStorage.getItem("nickName");
  const boardNum = localStorage.getItem("boardNum");
  const [bcList, setBcList] = useState([]);

  useEffect(() => {
    // 댓글 리스트 가져오기
    axios
      .get("/board/comment/list", { params: { boardNum: boardNum } })
      .then((res) => {
        console.log(res.data);
        setBcList(res.data);
        console.log(bcList.length);
      });
  }, []);

  // 댓글 쓰기 처리
  const writeComment = (data, boardNum) => {
    axios
      .post("/board/comment", data, { params: { boardNum: boardNum } })
      .then((res) => {
        console.log("write", data);
        setBcList([...bcList, res.data]);
      });
  };

  // 삭제 버튼 처리
  const bcDelete = (bcNum, writer) => {
    if (!(nickname === writer)) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }
    axios
      .delete("/board/comment", { params: { boardComNum: bcNum } })
      .then((res) => {
        const newCommentList = bcList.filter(
          (comment) => comment.boardComNum !== bcNum
        );
        setBcList(newCommentList);
      })
      .catch((error) => alert("댓글 삭제 실패"));
  };

  // 수정 버튼 처리
  const bcUpdate = (bcNum, writer, content, callbackFunc) => {
    console.log("댓글 수정");
    console.log(bcNum, writer, content);
    if (!(nickname === writer)) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }
    axios
      .put(
        "/board/comment",
        { content: content },
        { params: { boardComNum: bcNum } }
      )
      .then((res) => {
        console.log("update res", res.data);
        const updatedComment = res.data;
        let newCommentList = [];
        for (let comment of bcList) {
          if (updatedComment.boardComNum === comment.boardComNum) {
            comment.content = content;
            newCommentList.push(comment);
          } else {
            newCommentList.push(comment);
          }
        }
        setBcList(newCommentList);
        callbackFunc();
      })
      .catch((error) => alert("댓글 수정 실패"));
  };

  // 댓글 리스트 출력
  let boardCommentList = null;
  if (bcList.length === 0) {
    boardCommentList = (
      <div style={{ paddingTop: "60px" }} key={0}>
        <h4 style={{ textAlign: "center", color: "#00b2b2" }}>
          댓글이 없습니다.
        </h4>
      </div>
    );
  } else {
    boardCommentList = Object.values(bcList).map((item, index) => (
      <div key={index}>
        <BCdetail
          bcNum={item.boardComNum}
          bcDate={item.date}
          writer={item.memberNum.nickname}
          content={item.content}
          bcDelete={bcDelete}
          bcUpdate={bcUpdate}
        />
      </div>
    ));
  }

  return (
    <div>
      <BCwrite writeComment={writeComment}></BCwrite>
      <div>{boardCommentList}</div>
    </div>
  );
};

export default BClist;
