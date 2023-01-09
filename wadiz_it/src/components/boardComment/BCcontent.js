import axios from "axios";
import React, { useCallback, useState } from "react";
import BCcontentUb from "./BCcontentUp";
import "./BCcontent.scss";

const BCcontent = ({ bcNum, writer, content }) => {
  const nickname = sessionStorage.getItem("nickName");

  // 수정 버튼을 눌렀을 때 상태 처리
  const [viewUpdate, setViewUpdate] = useState(false);

  // 수정 버튼 처리
  const bcUpdate = useCallback(() => {
    if (!(nickname === writer)) {
      alert("작성자만 수정할 수 있습니다.");
    } else {
      setViewUpdate(true);
    }
  }, [nickname]);

  // 삭제 버튼 처리
  const bcDelete = (bcNum) => {
    axios
      .delete("/board/comment", { params: { boardComNum: bcNum } })
      .then((res) => {
        alert(res.data);
      });
  };

  return (
    <div>
      {viewUpdate ? (
        <BCcontentUb bcNum={bcNum} content={content} />
      ) : (
        <div className="ct-div">
          <div className="content">{content}</div>
          <div className="ct-btn-div">
            <button className="ct-update-btn" onClick={() => bcUpdate()}>
              수정
            </button>
            <button className="ct-delete-btn" onClick={() => bcDelete(bcNum)}>
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BCcontent;
