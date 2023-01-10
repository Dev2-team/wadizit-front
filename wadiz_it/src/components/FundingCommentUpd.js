import axios from "axios";
import React, { useCallback, useState } from "react";

const FundingCommentUpd = (props) => {
  const [content, setContent] = useState(props.content);
  const fundingComNum = props.fundingComNum;

  const onChange = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [content]
  );

  //펀딩 댓글 수정 기능
  const getUpdateCom = useCallback(() => {
    console.log(content);

    props.modify(content, () => {
      setContent("");
    });
  }, [content]);

  return (
    <div>
      <div className="bComContentArea">
        <textarea
          type="text"
          className="bComContent"
          name="content"
          value={content}
          onChange={onChange}
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <div className="fundComBtnArea">
        <button onClick={getUpdateCom}>수정</button>
        <button onClick={props.cancel}>취소</button>
      </div>
    </div>
  );
};

export default FundingCommentUpd;
