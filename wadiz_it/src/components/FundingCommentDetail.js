import moment from "moment/moment";
import { useCallback, useState } from "react";
//import userIcon from "../images/userIcon.png";
import { Comment } from "semantic-ui-react";
import FundingCommentUpd from "./FundingCommentUpd";

const FundingCommentDetail = (props) => {
  const dateFormat = () => moment(props.date).format("YYYY.MM.DD");
  const nickname = sessionStorage.getItem("nickName");
  const [modView, setModView] = useState(false);

  const modifyComment = useCallback(
    (content, callback) => {
      props.modifyComment(props.fundingComNum, content);
      setModView(!modView);
    },
    [props, modView]
  );

  const cancelMod = useCallback(() => {
    setModView(!modView);
  }, [modView]);

  return (
    <div className="fundComDetail">
      <Comment style={{ marginBottom: "10px" }}>
        <Comment.Avatar src="asset/userIcon2.png"></Comment.Avatar>
        <Comment.Content>
          <Comment.Author
            as="b"
            style={{ fontSize: "1.1em", marginRight: "5px" }}
          >
            {props.writer}
          </Comment.Author>
          <Comment.Metadata>
            <div>{dateFormat(props.date)}</div>
          </Comment.Metadata>

          <div className="viewChange">
            {modView === false ? (
              <div>
                <Comment.Text
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  {props.content}
                </Comment.Text>
                {!(nickname === props.writer) ? (
                  <div style={{ marginBottom: "20px" }}></div>
                ) : (
                  <div
                    className="fundComBtnArea"
                    style={{ marginBottom: "20px" }}
                  >
                    <button
                      type="button"
                      className="fundComUpd"
                      onClick={() => {
                        setModView(!modView);
                      }}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="fundComDel"
                      onClick={() => props.deleteComment(props.fundingComNum)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <FundingCommentUpd
                fundingNum={props.fundingComNum}
                content={props.content}
                modify={modifyComment}
                cancel={cancelMod}
              ></FundingCommentUpd>
            )}
          </div>
        </Comment.Content>
      </Comment>
    </div>
  );
};

export default FundingCommentDetail;
