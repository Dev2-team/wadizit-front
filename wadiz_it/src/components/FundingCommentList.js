import React, { useEffect, useState } from "react";
import FundingCommentDetail from "./FundingCommentDetail";

const FundingCommentList = (props) => {
  const fundingCommentList = props.fundingCommentList;

  let fundComList = null;
  console.log("갯수:" + fundingCommentList.length);

  if (fundingCommentList.length !== 0) {
    fundComList = Object.values(fundingCommentList).map((fundComItem) => (
      <div className="commentArea" key={fundComItem.fundingComNum}>
        <FundingCommentDetail
          deleteComment={props.deleteComment}
          modifyComment={props.modifyComment}
          fundingComNum={fundComItem.fundingComNum}
          writer={fundComItem.memberNum.nickname}
          content={fundComItem.content}
          date={fundComItem.date}
        />
      </div>
    ));
  } else {
    fundComList = (
      <div
        style={{
          height: "150px",
          lineHeight: "150px",
          textAlign: "center",
          fontSize: "17px",
          color: "#90949c",
        }}
      >
        등록된 응원글이 없습니다.
      </div>
    );
  }

  return (
    <div className="fundingCommentList" style={{ marginTop: "30px" }}>
      <div className="fundComNum" style={{ display: "inline-block" }}>
        <p className="fundCom" style={{ fontSize: "17px", display: "inline" }}>
          등록된 응원이&nbsp;&nbsp;
        </p>
        <p style={{ display: "inline", fontSize: "17px", fontWeight: 700 }}>
          {fundingCommentList.length}개&nbsp;&nbsp;
        </p>
        <p style={{ display: "inline", fontSize: "17px" }}>있습니다.</p>
      </div>
      <div
        style={{
          borderTop: "1.5px solid rgba(34,36,38,.15)",
          marginBottom: "20px",
          marginTop: "18px",
        }}
      ></div>
      <div className="fundingComList">{fundComList}</div>
    </div>
  );
};

export default FundingCommentList;
