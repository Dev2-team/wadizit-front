import axios from 'axios';
import React, { useCallback, useState } from 'react';

const FundingCommentUpd = (props) => {

    const [fundComData, setFundComData] = useState({
        content : props.content
    })

    const { content } = fundComData;

    const onChange = useCallback(
        (e) => {
            const dataObj = {
                ...fundComData,
                [e.target.name]: e.target.value,
            };

            setFundComData(dataObj);
        },
        [fundComData]
    );

    //펀딩 댓글 수정 기능
    const getUpdateCom = () => {
        axios
            .put("/funding/comment", fundComData, { params: { fundingComNum: props.fundingComNum } })
            .then((res) => {
                if (res.data === "댓글 수정 성공") {
                    alert("댓글 수정이 완료되었습니다.");
                } else {
                    alert("댓글 수정 실패");
                }
            })
            .catch((err) => console.log(err));

    }
    

    return (
        <form onSubmit={getUpdateCom} className='viewChange'>
            <div className='bComContentArea'>
                <textarea type="text" className='bComContent' name="content" value={content} onChange={onChange}
                style={{resize :"none"}}></textarea>                     
            </div>
            <div className='fundComBtnArea'>
                <button type='submit' className='fundComUpd'>수정하기</button>
            </div> 
        </form>
    );
};

export default FundingCommentUpd;