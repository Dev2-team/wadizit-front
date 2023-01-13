import React, { useEffect, useState } from "react";
import "./FundingModal.scss";
import Button from "../common/Button";
import axios from "axios";
import { Form } from "semantic-ui-react";

const FundingModal = (props) => {

  const { open, close, header, fundingTitle, force } = props;

  //로그인한 사람의 정보
  const [memberData, setMemberData] = useState({
    point: 0,
  });

  //포인트
  const [donatePoint, setDonatePoint] = useState({
    payAmount: 0
  });

  let donateData = { ...donatePoint };

  //로그인한 사람의 포인트 출력
  useEffect(() => {
    axios
      .get("/member/get", { params: { MemberNum: props.loginPerson } })
      .then((res) => {
        setMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //버튼 비활성화 상태
  const [ckPoint, setCkPoint] = useState(true);


  //결제할 포인트 내역 입력(버튼 활성화 기능)
  const setPaymentPoint = () => {
    //결제할 포인트
    let paymentPoint = document.getElementById("inputPoint").value;

    document.getElementById("totalAmountPoint").innerText = paymentPoint +"P";
    if (paymentPoint < memberData.point) {
      setCkPoint(false);
      document.getElementById("pointAlert").innerText = null;

      donateData = {
        ...donatePoint,
        payAmount : paymentPoint
      }
      console.log("흠 : " + donateData.payAmount);
      
      
    
      document.getElementById("afterPoint").innerText = (memberData.point - paymentPoint)+"P";
    
    } else if (paymentPoint > memberData.point) {
      setCkPoint(true);
      document.getElementById("pointAlert").innerText = "보유하신 포인트를 초과하셨습니다.";
    }
    setDonatePoint(donateData);

  };
    

  //전액 사용 버튼
  const useAllPoint = () => {
    
    document.getElementById("inputPoint").value = memberData.point;
    setCkPoint(false);
    let paymentPoint = document.getElementById("inputPoint").value;
    document.getElementById("afterPoint").innerText = (memberData.point - paymentPoint)+"P";
    document.getElementById("totalAmountPoint").innerText = paymentPoint + "P";
    donateData = {
      ...donatePoint,
      payAmount:paymentPoint
    }
    setDonatePoint(donateData);
  }

  //포인트 결제 기능

  const payPoint = () => {

    console.log("포인트내역 : " + donatePoint.point);
    console.log("펀딩정보 : " + props.fundingNum)

    axios
      .post("/donate", donatePoint, {params : {fundingNum : props.fundingNum}})
      .then((res) => {
        console.log(res.data);
        if (res.data === "펀딩 후원 성공") {
          alert("펀딩 성공하였습니다.");
          close(false);
          window.location.replace("http://localhost:3000/funding/detail");
        } else {
          alert("결제가 실패되었습니다.");
        }
      }, )
      .catch((err) => console.log(err));
  }

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div className="modalSection">
          <div className="modalHeader">
            {header}
            <button className="modalClose" onClick={close}>
              x
            </button>
          </div>
          <div className="modalMain">
            <div className="fundingProduct">
              <div className="fundingProdInfo">펀딩 상품 정보</div>
              <div>{fundingTitle}</div>
            </div>
            <div className="fundingPerson">
              <div className="fundingPersonInfo">후원자 정보</div>
              <div className="fundingPersonName">이름 &nbsp;:&nbsp; {memberData.name}</div>
              <div className="fundingPersonPhone">전화번호 &nbsp;:&nbsp; {memberData.phone}</div>
              
            </div>
            <div className="pointUse">
              <div className="fundingPoint">포인트</div>
              <div className="holdPoint" style={{display:"inline-block"}}>보유 포인트&nbsp; :&nbsp;</div>
              <div style={{display:"inline-block", fontWeight:600}}> {memberData.point}P</div>
              <div className="expectedPoint">사용할 포인트
                <div>
                  <div style={{display:"inline-block"}}>
                      <Form.Input type="number" id="inputPoint" onChange={setPaymentPoint}
                      style={{ width: "18vw", marginRight:"12px", marginTop:"5px" }} />
                  </div>
              {/* <button type="button" onClick={useAllPoint}>전액 사용</button> */}
                  <Button type="button" onClick={useAllPoint}
                style={{
                  alignItems: "center",
                  margin: "0px",
                  border: "1px solid #00b2b2",
                  backgroundColor: "#ffffff",
                  color: "#00b2b2",
                  fontSize: "12px",
                  width: "4vw",
                  display: "inline-block",
                  lineHeight: "19.99px",
                  height:"38px"

                }}
              >
            전액사용
                  </Button>
                  </div>
                </div>
              
              <div id="pointAlert"></div>
              <div style={{marginBottom:"25px"}}>
              <div className="afterPointInfo" style={{display:"inline"}}>결제 후 포인트&nbsp; :&nbsp;</div>
                <div id="afterPoint" style={{ display: "inline",fontWeight:600, }}></div>
                </div>
              <div className="fundingPayPointInfo" >
                <div className="fundingPayPoint">최종결제포인트</div>
                <div id="totalAmountPoint"></div>
              </div>
            </div>
  
          </div>
          <div className="modalFooter">
            <Button disabled={ckPoint} onClick={payPoint}>결제하기</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FundingModal;
