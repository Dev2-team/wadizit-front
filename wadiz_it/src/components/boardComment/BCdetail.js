import axios from "axios";
import React, { useState } from "react";
import BCcontent from "./BCcontent";
import BCcontentUb from "./BCcontentUp";

const BCdetail = ({ bcNum, writer, content }) => {
  // 수정 버튼을 눌렀을 때 상태 처리
  const [viewUpdate, setViewUpdate] = useState(false);

  return (
    <div>
      <h4
        style={{
          width: "100%",
          marginTop: "20px",
          marginBottom: "15px",
          float: "right",
        }}
      >
        {writer}
      </h4>
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
