import React, { useEffect, useState } from "react";
import "./FundingModal.scss";
import Button from "../common/Button";
import axios from "axios";

const FundingModal = (props) => {
  const { open, close, header, fundingTitle } = props;

  //로그인한 사람의 정보
  const [memberData, setMemberData] = useState({
    point: 0,
  });

  //로그인한 사람의 포인트 출력
  useEffect(() => {
    axios
      .get("member/get", { params: { MemberNum: props.loginPerson } })
      .then((res) => {
        setMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //버튼 비활성화 상태
  const [ckPoint, setCkPoint] = useState(true);

  //결제할 포인트 내역 출력(버튼 활성화 기능)
  const setPaymentPoint = () => {
    //결제할 포인트
    let paymentPoint = document.getElementById("inputPoint").value;
    console.log("입력?" + paymentPoint);
    document.getElementById("totalAmountPoint").innerText = paymentPoint;
    if (paymentPoint < memberData.point) {
      setCkPoint(false);
      document.getElementById("afterPoint").innerText =
        memberData.point - paymentPoint;
    } else if (paymentPoint > memberData.point) {
      setCkPoint(true);
    }
  };

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
            <div>
              <div>상품 정보</div>
              <div>{fundingTitle}</div>
            </div>
            <div>
              <div>포인트 잔액</div>
              <div>{memberData.point}</div>
              <div>{memberData.nickname}</div>
              <div>결제 포인트</div>
              <input
                type="number"
                id="inputPoint"
                onKeyUp={setPaymentPoint}
              ></input>
              <div>최종결제 포인트</div>
              <div id="totalAmountPoint"></div>
              <div>결제 이후 포인트</div>
              <div id="afterPoint"></div>
            </div>
          </div>
          <div className="modalFooter">
            <Button disabled={ckPoint}>결제하기</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FundingModal;
