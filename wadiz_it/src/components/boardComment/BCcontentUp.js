import axios from "axios";
import React, { useCallback, useState } from "react";
import BCcontent from "./BCcontent";
import "./BCcontentUp.scss";

const BCcontentUb = ({ bcNum, writer, content }) => {
  const [viewUpdate, setViewUpdate] = useState(true);

  // 변경할 내용을 담는 배열
  const [form, setForm] = useState({
    ubContent: content,
  });
  const { ubContent } = form;

  // 변경된 내용 반영
  const inputChange = useCallback(
    (e) => {
      const formObj = {
        ...form,
        [e.target.name]: e.target.value,
      };
      setForm(formObj);
    },
    [form]
  );

  // 수정 버튼 처리
  const bcUpdate = (bcNum) => {
    axios
      .put("/board/comment", form, { params: { boardComNum: bcNum } })
      .then((res) => {
        alert(res.data);
      });
    setViewUpdate(false);
  };

  return (
    <div>
      {viewUpdate ? (
        <div className="up-ta-div">
          <textarea
            className="up-ta"
            name="content"
            defaultValue={ubContent}
            onChange={inputChange}
          />
          <div className="up-btn-div">
            <button className="cancle-btn" onClick={() => setViewUpdate(false)}>
              취소
            </button>
            <button className="ok-btn" onClick={() => bcUpdate(bcNum)}>
              확인
            </button>
          </div>
        </div>
      ) : (
        <BCcontent bcNum={bcNum} writer={writer} content={content} />
      )}
    </div>
  );
};

export default BCcontentUb;
