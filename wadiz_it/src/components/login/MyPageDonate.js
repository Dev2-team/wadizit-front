import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "semantic-ui-react";

const MyPageDonate = () => {
  // 데이터
  const [myDonateItem, setMyDonateItem] = useState([]);

  const memberNum = sessionStorage.getItem("memberNum");

  useEffect(() => {
    // 내 결제 내역 가져오기
    axios
      .get(`/donate/dlist?MemberNum=${memberNum}`)
      .then((res) => {
        console.log(res.data);
        setMyDonateItem(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 내가 후원한 후원 내역
  const DonateTable = () => {
    return Object.values(myDonateItem).map((item) => {
      return (
        <Table.Row key={item.donateNum}>
          <Table.Cell>{item.fundingTitle}</Table.Cell>
          <Table.Cell>{item.donateAmount} 포인트</Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <Container>
      <Table basic="very" celled compact definition collapsing={false}>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>펀딩 제목</Table.HeaderCell>
            <Table.HeaderCell>후원 금액</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DonateTable />
        </Table.Body>
      </Table>
    </Container>
  );
};

export default MyPageDonate;
