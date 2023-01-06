import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Container, Header } from "semantic-ui-react";
import FundingDetail from "./FundingDetail";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const AdminFundingDetail = () => {
  const [fundingDetail, setFundingDetail] = useState([]);

  useEffect(() => {
    const fundingNum = localStorage.getItem("fundingNum");

    // 서버로부터 해당 펀딩 내용 가져오기
    axios
      .get("/funding", { params: { fundingNum: fundingNum } })
      .then((res) => {
        setFundingDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 승인 버튼 처리
  const approveBtn = (fundingNum) => {
    let newfd = { ...fundingDetail };
    newfd.status = "승인";
    console.log(newfd);

    // fundingNum은 수정할 현재 funding / funding은 수정된 내용
    // fundingNum을 이용해 기존의 내용을 수정된 내용인 funding으로 덮는다

    axios
      .put("/funding", newfd, { params: { fundingNum: fundingNum } })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => console.log(err));
  };

  // 반려 버튼 처리
  const rejectBtn = (fundingNum) => {
    let newfd = { ...fundingDetail };
    newfd.status = "반려";
    console.log(newfd);

    axios
      .put("/funding", newfd, { params: { fundingNum: fundingNum } })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Container
        style={{
          display: "flex",
          verticalAlign: "middle",
          justifyContent: "space-between",
        }}
      >
        <Header as="h2">자유게시판</Header>
        <Container>
          <Button
            size="tiny"
            onClick={() => approveBtn(fundingDetail.fundingNum)}
          >
            승인
          </Button>
          <Button
            size="tiny"
            onClick={() => rejectBtn(fundingDetail.fundingNum)}
          >
            반려
          </Button>
        </Container>
      </Container>
      <Container>{/* 사업자 증빙 자료 다운로드 받는 부분 */}</Container>
      <Container>
        <FundingDetail></FundingDetail>
      </Container>
    </Container>
  );
};

export default AdminFundingDetail;
