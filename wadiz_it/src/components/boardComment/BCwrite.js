import React, { useCallback, useState } from "react";
import Button from "../common/Button";

const BCwrite = (props) => {
  const boardNum = localStorage.getItem("boardNum");

  // 저장할 댓글 내용
  const [data, setData] = useState({
    content: "",
  });
  const { content } = data;

  // 댓글 내용 담기
  const onChange = useCallback(
    (e) => {
      const dataObj = {
        ...data,
        [e.target.name]: e.target.value,
      };
      setData(dataObj);
    },
    [data]
  );

  return (
    <div className="bcWrite-div">
      <fieldset
        style={{
          height: "180px",
          padding: "20px",
          border: "none",
          borderTop: "1px solid #e8e8e8",
          borderBottom: "1px solid #e8e8e8",
          backgroundColor: "#fafafa",
        }}
      >
        <textarea
          style={{
            width: "100%",
            height: "100px",
            resize: "none",
            position: "relative",
            padding: "12px 12px",
            border: "1px solid #e8e8e8",
            backgroundColor: "#fff",
            outline: "none",
          }}
          name="content"
          value={content}
          onChange={onChange}
          placeholder="댓글을 작성해주세요."
        ></textarea>
        <Button
          style={{
            float: "right",
            marginTop: "4px",
            width: "7vw",
            height: "2.9rem",
          }}
          onClick={() => props.writeComment(data, boardNum)}
        >
          작성
        </Button>
      </fieldset>
    </div>
  );
};

export default BCwrite;
