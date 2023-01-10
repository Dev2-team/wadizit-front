import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Header, Table } from "semantic-ui-react";
import KakaoPayReady from "./KakaoPayReady";
import "./Pay.scss";

const Pay = () => {
  // 현재 로그인한 사용자 정보 담는 변수
  const [logMem, setLogMem] = useState({
    point: 0,
  });

  const memberNum = sessionStorage.getItem("memberNum");
  console.log("memberNum : " + memberNum);

  useEffect(() => {
    // 서버로부터 해당 펀딩 내용 가져오기
    axios
      .get("/member/get", { params: { MemberNum: memberNum } })
      .then((res) => {
        console.log(res.data);
        setLogMem(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // pay 정보
  const pay1 = {
    next_redirect_pc_url: "",
    tid: "",
    created_at: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "5000 포인트",
      quantity: 1,
      total_amount: 5000,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/pay/approve",
      fail_url: "http://localhost:3000/pay/approve",
      cancel_url: "http://localhost:3000/pay",
    },
  };

  const pay2 = {
    next_redirect_pc_url: "",
    tid: "",
    created_at: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "10000 포인트",
      quantity: 1,
      total_amount: 10000,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/pay/approve",
      fail_url: "http://localhost:3000/pay/approve",
      cancel_url: "http://localhost:3000/pay",
    },
  };

  const pay3 = {
    next_redirect_pc_url: "",
    tid: "",
    created_at: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "20000 포인트",
      quantity: 1,
      total_amount: 20000,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/pay/approve",
      fail_url: "http://localhost:3000/pay/approve",
      cancel_url: "http://localhost:3000/pay",
    },
  };

  // 선택된 결제 금액에 따라 pay값 저장
  const [readyPay, setReadyPay] = useState(pay1);

  // 선택한 결제 금액의 추가 포인트 값
  const [plusPoint, setPlusPoint] = useState(0);

  const handleChange = useCallback((e) => {
    if (e.target.value === "5000원") {
      setReadyPay(pay1);
      setPlusPoint(0);
    } else if (e.target.value === "10000원") {
      setReadyPay(pay2);
      setPlusPoint(1000);
    } else if (e.target.value === "20000원") {
      setReadyPay(pay3);
      setPlusPoint(2000);
    }
  }, []);

  return (
    <Container>
      <Header style={{}}>
        <div
          style={{
            backgroundColor: "#00b2b2",
            color: "#fff",
            paddingLeft: "20px",
            height: "40px",
            lineHeight: "40px",
            textAlign: "left",
          }}
        >
          충전 금액 선택
        </div>
      </Header>

      <Table
        style={{ marginTop: "10%" }}
        celled
        compact
        definition
        collapsing={false}
      >
        <Table.Header style={{ height: "60px" }} fullWidth>
          <Table.Row textAlign="center">
            <Table.HeaderCell>충전 금액</Table.HeaderCell>
            <Table.HeaderCell>추가 지급</Table.HeaderCell>
            <Table.HeaderCell>총 결제 금액</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row style={{ height: "60px" }}>
            <Table.Cell>
              <div
                style={{
                  paddingLeft: "33%",
                }}
              >
                <input
                  type="radio"
                  name="price"
                  defaultChecked
                  value="5000원"
                  onChange={handleChange}
                />
                5,000 포인트
              </div>
            </Table.Cell>
            <Table.Cell textAlign="center">없음</Table.Cell>
            <Table.Cell textAlign="center">5,000원</Table.Cell>
          </Table.Row>
          <Table.Row style={{ height: "60px" }}>
            <Table.Cell>
              <div
                style={{
                  paddingLeft: "33%",
                }}
              >
                <input
                  type="radio"
                  name="price"
                  value="10000원"
                  onChange={handleChange}
                />
                10,000 포인트
              </div>
            </Table.Cell>
            <Table.Cell textAlign="center">+ 1,000</Table.Cell>
            <Table.Cell textAlign="center">10,000원</Table.Cell>
          </Table.Row>
          <Table.Row style={{ height: "60px" }}>
            <Table.Cell>
              <div
                style={{
                  paddingLeft: "33%",
                }}
              >
                <input
                  type="radio"
                  name="price"
                  value="20000원"
                  onChange={handleChange}
                />
                20,000 포인트
              </div>
            </Table.Cell>
            <Table.Cell textAlign="center">+ 2,000</Table.Cell>
            <Table.Cell textAlign="center">20,000원</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table style={{ marginTop: "10%" }}>
        <Table.Header style={{ height: "60px" }} fullWidth>
          <Table.Row textAlign="center">
            <Table.HeaderCell>현재 보유 포인트</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>충전할 포인트 금액</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>추가 지급</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>최종 포인트</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row style={{ height: "60px" }} textAlign="center">
            <Table.Cell>{logMem.point}</Table.Cell>
            <Table.Cell>+</Table.Cell>
            <Table.Cell>{readyPay.params.total_amount}</Table.Cell>
            <Table.Cell>+</Table.Cell>
            <Table.Cell>{plusPoint}</Table.Cell>
            <Table.Cell>=</Table.Cell>
            <Table.Cell>
              {logMem.point + readyPay.params.total_amount + plusPoint}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <KakaoPayReady price={readyPay} />
    </Container>
  );
};

export default Pay;
