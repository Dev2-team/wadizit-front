import axios from "axios";
import React, { useCallback, useState } from "react";
import BCcontent from "./BCcontent";

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
        <div
          style={{
            height: "80px",
            width: "100%",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          <textarea
            className="up-ta"
            style={{
              width: "95%",
              height: "38px",
              resize: "none",
              position: "relative",
              padding: "9.5px 12px",
              border: "1px solid #e8e8e8",
              backgroundColor: "#fff",
              outline: "none",
            }}
            name="content"
            defaultValue={ubContent}
            onChange={inputChange}
          />
          <div style={{ textAlign: "right", marginRight: "22px" }}>
            <button
              style={{
                padding: "0",
                width: "31px",
                border: "none",
                fontSize: "12px",
                color: "rgba(111, 111, 111, 0.69)",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              onClick={() => setViewUpdate(false)}
            >
              취소
            </button>
            <button
              style={{
                padding: "0",
                width: "31px",
                border: "none",
                fontSize: "12px",
                color: "rgba(111, 111, 111, 0.69)",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              onClick={() => bcUpdate(bcNum)}
            >
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
