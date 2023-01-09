import moment from 'moment/moment';
import React, { useState } from 'react';
//import userIcon from "../images/userIcon.png";
import FundingCommentUpd from './FundingCommentUpd';
import { Comment } from 'semantic-ui-react';


const FundingCommentDetail = (props) => {
    const dateFormat = () => moment(props.date).format("YYYY.MM.DD");
    //본인이 작성한 댓글에만 수정, 삭제 버튼 추가
    const nickname = sessionStorage.getItem("nickName");

    //수정 버튼 클릭 시 div 변경
    const [view, setView] = useState(false);

    const changeView = () => {
        setView(true);
    }

    return (
        <div className='fundComDetail'>
            <Comment style={{ marginBottom: "10px" }}>
                <Comment.Avatar src='asset/userIcon2.png'></Comment.Avatar>
                <Comment.Content>
                    <Comment.Author as="b" style={{fontSize:"1.1em", marginRight:"5px"}}>{props.writer}</Comment.Author>
                    <Comment.Metadata><div>{dateFormat(props.date)}</div></Comment.Metadata>
                
                    {view ? <FundingCommentUpd content={props.content} fundingComNum={props.fundingComNum} /> :
                    <div className="viewChange">
                                <Comment.Text style={{marginTop:"10px", marginBottom:"10px"}}>{props.content}</Comment.Text>
                                {!(nickname === props.writer) ? <div style={{marginBottom:"20px"}}></div> :
                                    <div className='fundComBtnArea' style={{marginBottom:"20px"}}>
                                        <button type='button' className='fundComUpd' onClick={() => props.modifyComment(props.fundingComNum)}>수정</button>
                                        <button type='button' className='fundComDel' onClick={() => props.deleteComment(props.fundingComNum)}>삭제</button>
                                    </div>}
                    </div> }
                </Comment.Content>
            </Comment>
                
        </div>
        
    );
};

export default FundingCommentDetail;