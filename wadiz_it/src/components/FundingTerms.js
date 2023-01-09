/** @format */

import React, { useState } from "react";
import { Container, Divider, Form, Segment, Header } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
const FundingTerms = () => {
  const terms_1 = `1. 이용 목적

여러분을 환영합니다. Wadiz-IT 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 Wadiz-IT 서비스의 이용과 관련하여
Wadiz-IT 서비스를 제공하는 Wadiz-IT 주식회사(이하 ‘Wadiz-IT’)와 이를 이용하는 Wadiz-IT 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며,
아울러 여러분의 Wadiz-IT 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. Wadiz-IT 서비스를 이용하시거나 Wadiz-IT 서비스
회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.`;

  const [checkedButtons, setCheckedButtons] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedButtons([...checkedButtons, id]);
      console.log("체크 반영 완료");
    } else {
      setCheckedButtons(checkedButtons.filter((button) => button !== id));
      console.log("체크 해제 반영 완료");
    }
  };
  const nav = useNavigate();
  const moveFundingForm = () => {
    nav("/FundingForm");
  };

  const isAllChecked = checkedButtons.length === 2;
  const disabled = !isAllChecked;
  return (
    <Container textAlign="left">
      <Header as="h2">펀딩 약관</Header>
      <Segment>
        <Form>
          <Form.Group widths="equal">
            <Form.TextArea
              style={{ height: 200 }}
              fluid="true"
              label="개인정보 수집 및 이용 동의"
              required={true}
              value={terms_1}
              readOnly
            />
          </Form.Group>
          <input
            type="checkbox"
            id="check"
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "check");
            }}
            checked={checkedButtons.includes("check") ? true : false}
          ></input>
          <label id="check" htmlFor="check"></label>
          <span>동의</span>
          {/* <Form.Checkbox
            label="동의"
          /> */}

          <Form.Group widths="equal">
            <Form.TextArea
              style={{ height: 200 }}
              fluid="true"
              label="개인정보 수집 및 이용 동의"
              required={true}
              value={terms_1}
              readOnly
            />
          </Form.Group>
          <input
            type="checkbox"
            id="check2"
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "check2");
            }}
            checked={checkedButtons.includes("check2") ? true : false}
          ></input>
          <label id="check2" htmlFor="check2"></label>
          <span>동의</span>
          {/* <Form.Checkbox
            label="동의"
          /> */}
          <Divider></Divider>

          <Container textAlign="center">
            <Form.Button
              type="submit"
              disabled={disabled}
              onClick={moveFundingForm}
              style={
                disabled
                  ? { backgroundColor: "#859594" }
                  : { backgroundColor: "#00b2b2" }
              }
            >
              제출
            </Form.Button>
          </Container>
        </Form>
      </Segment>
    </Container>
  );
};

export default FundingTerms;
