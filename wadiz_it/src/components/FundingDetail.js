import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Tab,
  Grid,
  Header,
  Segment,
  Button,
} from "semantic-ui-react";
import FundingComment from "./FundingComment";
import FundingProjectIntro from "./FundingProjectIntro";
import FundingReward from "./FundingReward";

const panes = [
  {
    menuItem: "프로젝트 소개",
    render: () => (
      <Tab.Pane attached={false}>{<FundingProjectIntro />}</Tab.Pane>
    ),
  },
  {
    menuItem: "커뮤니티",
    render: () => <Tab.Pane attached={false}>{<FundingComment />}</Tab.Pane>,
  },
  {
    menuItem: "리워드",
    render: () => <Tab.Pane attached={false}>{<FundingReward />}</Tab.Pane>,
  },
];

const TabMenu = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
);


const dateFormat = (date) => moment(date).format("YYYY.MM.DD");

const FundingDetail = () => {

  
  const [fundData, setFundData] = useState({
    currentAmount: 0,
    targetAmount: 0,
    title: "",
    startDate: "",
    endDate: ""
  });

  //디데이 계산
  var today = new Date();
  var endDateFormat = new Date(fundData.endDate);
  // console.log(endDateFormat - today);
  var diff = endDateFormat - today;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  console.log(diffDay);

  //달성률 %
  var achieveRate = (parseFloat(fundData.currentAmount) / parseFloat(fundData.targetAmount)) * 100 
  console.log("달성률 : " + achieveRate);

  //금액 쉼표 표시
  let currentAmtFormat = fundData.currentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let targetAmtFormat = fundData.targetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    axios
      .get("funding", { params: { fundingNum: 2 } })
      .then((res) => {
        console.log(res.data);
        setFundData(res.data);

      })
      .catch((err) => console.log(err));

  }, []);
  
  return (
    <Container>
      <Header as="h2" style={{marginTop:"40px"}}>{fundData.title}</Header>
      <Grid centered doubling columns={2}>
        <Grid.Column>
          <Image
            style={{ width: "100%", height: 420, "object-fit": "cover", marginTop:"30px" }}
            src="asset/dog.jpg"
          />
        </Grid.Column>

        <Grid.Column
          style={{
            display: "flex",
            "flex-direction": "column",
            justifyContent: "space-between",
          }}
        >
          <Container style={{ height: 10 }}></Container>

          <Segment vertical style={{ border: "none" }}>
            <div className="subTitle" style={{fontSize:"13px"}}>모인 금액</div>
            <Header
              style={{
                "white-space": "nowrap",
                overflow: "hidden",
                "text-overflow": "ellipsis",
                marginTop:"12px"
              }}
            >
              <div className="aimAmount" style={{display: "inline-block"}}>
                <div className="currentAmt" style={{display: "inline", marginRight:"15px"}}>{currentAmtFormat}원 모금</div>
                <div className="achieveRate" style={{display:"inline", fontSize:"13px"}}>{achieveRate}%</div>
              </div>
            </Header>
          </Segment>

          <Segment vertical style={{ border: "none" }}>
          <div className="subTitle" style={{fontSize:"13px"}}>남은 시간</div>
            <Header
              style={{
                "white-space": "nowrap",
                overflow: "hidden",
                "text-overflow": "ellipsis",
                marginTop:"12px"
              }}
            >
              {diffDay}일 남음
              
            </Header>
          </Segment>
          <Segment vertical style={{ border: "none" }}>
          <div className="subTitle" style={{fontSize:"13px"}}>후원자</div>
            <Header
              style={{
                "white-space": "nowrap",
                overflow: "hidden",
                "text-overflow": "ellipsis",
                marginTop:"12px"
              }}
            >
              1,200명
            </Header>
          </Segment>

          <Segment vertical style={{ border: "none" }}>
            <div className="fundInfo" style={{border: "1px solid",fontSize:"10px", padding:"10px"}}>
              <div className="targetAmt">목표 금액 &nbsp;&nbsp;&nbsp;&nbsp; {targetAmtFormat}원</div>
              <div className="fundPeriod">펀딩 기간 &nbsp;&nbsp;&nbsp;&nbsp; {dateFormat(fundData.startDate)} ~ {dateFormat(fundData.endDate)}</div>
              <div className="payAcount">결제 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 목표금액 달성시 결제가 진행됩니다.</div>
            </div>
          </Segment>
          {/* <label for="rewardOptions">리워드</label>
          <select value="">
              <option value="">리워드 선택</option>
              <option value="a">리워드 A</option>
              <option value="b">리워드 B</option>
              <option value="c">리워드 C</option>
            </select> */}
            
          
          <Segment vertical>
            <Button fluid>후원하기</Button>
          </Segment>
        </Grid.Column>
      </Grid>
      <Container style={{ height: 10 }}></Container>

      <TabMenu></TabMenu>
    </Container>
  );
};

export default FundingDetail;
