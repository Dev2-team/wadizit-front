import axios from "axios";
import React, { useCallback, useState } from "react";
import { Button } from "semantic-ui-react";
import "./BCwrite.scss";

const BCwrite = () => {
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

  // 댓글 쓰기 처리
  const writeComment = (data, boardNum) => {
    axios
      .post("board/comment", data, { params: { boardNum: boardNum } })
      .then((res) => {
        alert(res.data);
      });
  };

  return (
    <div className="bcWrite-div">
      <fieldset>
        <textarea
          className="bcWrite-ta"
          name="content"
          value={content}
          onChange={onChange}
          placeholder="댓글을 작성해주세요."
        ></textarea>
        <Button
          style={{ float: "right", marginTop: "10px" }}
          onClick={() => writeComment(data, boardNum)}
        >
          작성
        </Button>
      </fieldset>
    </div>
  );
};

export default BCwrite;
