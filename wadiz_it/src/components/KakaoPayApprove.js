import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import checkimg from "./check-img.png";
import "./KakaoPayApprove.scss";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const KakaoPayApprove = () => {
  // 현재 링크에서 pg_token 값을 찾아줌
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("pg_token"));

  // 승인 결과를 담는 변수
  const [resApprove, setResApprove] = useState([]);

  const info = {
    paid: localStorage.getItem("paid"),

    params: {
      cid: "TC0ONETIME",
      tid: localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: searchParams.get("pg_token"),
    },
  };

  useEffect(() => {
    // 카카오 서버에 접근해 결제가 완료된 info를 받아 승인
    axios
      .post("https://kapi.kakao.com/v1/payment/approve", info.params, {
        headers: {
          Authorization: "KakaoAK 11f3dec5d0d5631d7d220eb80c7db83c",
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        console.log(res.data);
        setResApprove(res.data);
      });

    axios
      .put("/member/point?point=" + info.paid)
      .then((res) => {})
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <div className="approve-div">
        <div>
          <img className="check-img" src="/asset/check-img.png" alt="사진없음" />
          <img className="check-img" src={checkimg} />
          <h2>구매가 완료되었습니다.</h2>
        </div>
        <div className="approve-info">
          <h4 className="approve-item">결제 상품</h4>
          <h4 className="approve-item-res">{resApprove.item_name}</h4>
          <h4 className="approve-date">결제 시간</h4>
          <h4 className="approve-date-res">{df(resApprove.approved_at)}</h4>
        </div>
        <div>
          <Link to="/main">
            <Button>홈으로 돌아가기</Button>
          </Link>

          <Button>홈으로 돌아가기</Button>
        </div>
      </div>
    </Container>
  );
};

export default KakaoPayApprove;
