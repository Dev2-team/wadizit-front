import moment from "moment";
import React, { useState } from "react";
import BCcontent from "./BCcontent";
import BCcontentUb from "./BCcontentUp";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const BCdetail = ({ bcNum, bcDate, writer, content }) => {
  // 수정 버튼을 눌렀을 때 상태 처리
  const [viewUpdate, setViewUpdate] = useState(false);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h4
          style={{
            margin: "20px 10px 15px 0",
            textAlign: "left",
            color: "#00b2b2",
          }}
        >
          {writer}
        </h4>
        <h6 style={{ color: "rgba(111, 111, 111, 0.69)" }}>{df(bcDate)}</h6>
      </div>

      <div>
        {viewUpdate ? (
          <BCcontentUb
            bcNum={bcNum}
            writer={writer}
            content={content}
            viewUpdate={viewUpdate}
          />
        ) : (
          <BCcontent bcNum={bcNum} writer={writer} content={content} />
        )}
      </div>
    </div>
  );
};

export default BCdetail;
