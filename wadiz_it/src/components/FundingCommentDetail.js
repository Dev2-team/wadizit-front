import axios from 'axios';
import moment from 'moment/moment';
import React, { useCallback, useState } from 'react';
//import userIcon from "../images/userIcon.png";
import FundingCommentUpd from './FundingCommentUpd';
import { Comment } from 'semantic-ui-react';
import "./FundingCommentDetail.scss";


const FundingCommentDetail = (props) => {

    const dateFormat = () => moment(props.date).format("YYYY.MM.DD");

    //본인이 작성한 댓글에만 수정, 삭제 버튼 추가
    const nickname = sessionStorage.getItem("nickName");

    //댓글 삭제 기능 
    const fundComDel = useCallback((fundingComNum) => {

        let result = window.confirm("댓글을 삭제하시겠습니까?");
    
        if (result === true) {

            axios
                .delete("/funding/comment", { params: { fundingComNum: fundingComNum } })
                .then((res) => {
                    // console.log(res.data);
                    if (res.data === "댓글 삭제 성공") {
                        alert("댓글 삭제를 성공하였습니다.");
                    } else {
                        alert("댓글 삭제 실패");
                    }
                })
            
        } else {
            alert("댓글 삭제를 취소하였습니다.");
        }

    })

    //수정 버튼 클릭 시 div 변경
    const [view, setView] = useState(false);

    const changeView = () => {
        setView(true);
    }


    return (
        <div className='fundComDetail'>
            <Comment style={{marginBottom : "10px"}}>
                <Comment.Content>
                <div className='userImage'>
                    <img className='userIcon' src="asset/userIcon.png" alt='userIcon'></img>
                </div>
                    <Comment.Author as="b" style={{fontSize:"1.1em", marginRight:"5px"}}>{props.writer}</Comment.Author>
                    <Comment.Metadata><div>{dateFormat(props.date)}</div></Comment.Metadata>
                    {view ? <FundingCommentUpd content={props.content} fundingComNum={props.fundingComNum} /> :
                <div className="viewChange">
                            <Comment.Text style={{marginTop:"10px", marginBottom:"10px"}}>{props.content}</Comment.Text>
                            {!(nickname === props.writer) ? <div style={{marginBottom:"20px"}}></div> :
                                <div className='fundComBtnArea' style={{marginBottom:"20px"}}>
                                    <button type='button' className='fundComUpd' onClick={changeView}>수정</button>
                                    <button type='button' className='fundComDel' onClick={() => fundComDel(props.fundingComNum)}>삭제</button>
                                </div>}
                </div> }
                </Comment.Content>
            </Comment>
                
        </div>
        
    );
};

export default FundingCommentDetail;