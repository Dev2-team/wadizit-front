import React, { useCallback, useRef, useEffect, useState } from "react";
// import React from 'react';
import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Segment,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate } from "react-router";
import axios from "axios";
import SimpleSlider from "./SimpleSlider";
import Loading from "./Loading";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";

const FundingList = () => {
  const nav = useNavigate();
  const nickName = sessionStorage.getItem("nickName");
  const [fundingItem, setFundingItem] = useState([]);
  const [page, setPage] = useState(1);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const endRef = useRef(false);
  const [loading, setLoading] = useState(null);

  //게시글 목록을 서버로부터 가져오는 함수
  const getList = useCallback(() => {
    setLoading(true);
    axios
      .get("funding/page", { params: { pageNum: page } })
      .then((res) => {
        const { fffList, pageNum, end } = res.data;
        if (end) {
          //마지막 페이지일 경우
          endRef.current = true;
        }
        console.log(res.data);
        let arr = [];
        if (fundingItem.length !== 0) {
          fundingItem.map((x) => {
            arr.push(x);
            return x;
          });
        }
        fffList.map((x) => {
          delete x.funding.memberNum;
          if (x.fundingFileList.length !== 0) {
            x.funding.fileName = "upload/" + x.fundingFileList[1].sysName;
          }
          arr.push(x.funding);
          return x;
        });
        console.log(arr);
        setFundingItem(arr);
        sessionStorage.setItem("pageNum", pageNum);
        preventRef.current = true;
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, fundingItem]);

  useEffect(() => {
    if (nickName === null) {
      nav("/", { replace: true });
      return;
    }
    getList();
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (page !== 1) getList();
  }, [page]);

  const obsHandler = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  //펀딩 카드 클릭하면 해당 펀딩 상세로 이동함
  const getFundingDetail = useCallback(
    (fundingNum) => {
      // 보여질 펀딩 글의 번호를 localStorage에 저장
      localStorage.setItem("fundingNum", fundingNum);
      nav("/FundingDetail");
    },
    [nav]
  );

  // progress
  const getCompleteRate = (item) => {
    console.log("currentAmount :>> ", item.currentAmount);
    console.log("targetAmount :>> ", item.targetAmount);
    console.log(
      "percent:>> ",
      (parseFloat(item.currentAmount) / parseFloat(item.targetAmount)) * 100
    );
    return (
      (parseFloat(item.currentAmount) / parseFloat(item.targetAmount)) * 100
    );
  };

  // d-day
  const getDiffDate = (item) => {
    var today = new Date();
    var endDateFormat = new Date(item.endDate);
    var diff = endDateFormat - today;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const FundingCard = () => {
    return Object.values(fundingItem).map((item) => {
      return (
        <Grid.Column key={item.fundingNum}>
          <Card fluid onClick={() => getFundingDetail(item.fundingNum)}>
            {item.fileName ? (
              <Image
                style={{ height: 300, objectFit: "cover" }}
                src={item.fileName}
              />
            ) : (
              <Image
                style={{ height: 300, objectFit: "cover" }}
                src="asset/img1.jpg"
              />
            )}

            <Card.Content>
              <Card.Header style={{ height: "80px" }}>{item.title}</Card.Header>
              <ProgressBar completed={getCompleteRate(item)} />
              <Card.Header style={{ color: "#00b2b2" }}>
                {item.targetAmount}원
              </Card.Header>
              <Card.Meta>{item.currentAmount}원</Card.Meta>
              <Card.Meta>{getDiffDate(item)}일 남음</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  };

  return (
    <Container>
      <Segment placeholder style={{ margin: 0, padding: 0 }}>
        <SimpleSlider />
      </Segment>
      {fundingItem.length === 0 && <div style={{ height: "100vh" }}></div>}
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0 10px 0",
        }}
      >
        <div
          style={{ width: "50px", height: "50px", border: "1px solid black" }}
        >
          정렬
        </div>
        <Link to="/fundingForm">
          <Button
            style={{
              alignItems: "center",
              margin: "0px",
              border: "1px solid #00b2b2",
              backgroundColor: "#ffffff",
              color: "#00b2b2",
            }}
          >
            프로젝트 만들기
          </Button>
        </Link>
      </Container>
      <Grid doubling columns={3}>
        <FundingCard />
      </Grid>
      {loading && <Loading />}
      <div ref={obsRef} />
    </Container>
  );
};

export default FundingList;
