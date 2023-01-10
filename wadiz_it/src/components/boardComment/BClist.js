import axios from "axios";
import React, { useEffect, useState } from "react";
import BCdetail from "./BCdetail";

const BClist = () => {
  const boardNum = localStorage.getItem("boardNum");
  const [bcItem, setBcItem] = useState([]);

  useEffect(() => {
    // 댓글 리스트 가져오기
    axios
      .get("board/comment/list", { params: { boardNum: boardNum } })
      .then((res) => {
        console.log(res.data);
        setBcItem(res.data);
        console.log(bcItem.length);
      });
  }, []);

  // 댓글 리스트 출력
  let boardCommentList = null;
  if (bcItem.length === 0) {
    boardCommentList = (
      <div style={{ paddingTop: "60px" }} key={0}>
        <h4 style={{ textAlign: "center", color: "#00b2b2" }}>
          댓글이 없습니다.
        </h4>
      </div>
    );
  } else {
    boardCommentList = Object.values(bcItem).map((item, index) => (
      <div key={index}>
        <BCdetail
          bcNum={item.boardComNum}
          bcDate={item.date}
          writer={item.memberNum.nickname}
          content={item.content}
        />
      </div>
    ));
  }

  return (
    <div>
      <div style={{ paddingBottom: "90px" }}>{boardCommentList}</div>
    </div>
  );
};

export default BClist;
