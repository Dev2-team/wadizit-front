import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FundingCommentDetail from './FundingCommentDetail';
import { Comment } from 'semantic-ui-react';




const FundingCommentList = () => {

    // const nav = useNavigate();

    const [fundComData, setFundComData] = useState([{
        memberNum : {},
        content: ""
    }]);


    useEffect(() => {
        axios
            .get("/funding/comment/list", { params: { fundingNum: 2 } })
            .then((res) => {
                setFundComData(res.data);
                localStorage.setItem("fundAmount", res.data.length);
            })
            .catch((error) => console.log(error));
    }, []);


    let fundAmount = localStorage.getItem("fundAmount");
    let fundComList = null;

    if (fundComData.size !== 0) {
    
        fundComList = Object.values(fundComData).map((fundComItem) => (
            
            <div className='commentArea' key={fundComItem.fundingComNum}>
                <FundingCommentDetail fundingComNum={fundComItem.fundingComNum}
                    writer={fundComItem.memberNum.nickname} content={fundComItem.content} date={fundComItem.date} />
            </div>
        ))
        
    } else {
        <div>아직 응원글이 없습니다.</div>
    }
    
    return (
        <div className='fundingCommentList'>
            <div className='fundComNum'>
                <p className="fundCom">등록된 응원이 {fundAmount}개 있습니다.</p>
            </div>
            <hr className='line' />
            <div className='fundingComList'>{fundComList}</div>
            
        </div>
    );
};

export default FundingCommentList;