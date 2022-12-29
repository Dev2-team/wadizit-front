import React from "react";
import { Container, Divider, Form, Segment, Header } from "semantic-ui-react";

const FundingTerms = () => {
  const terms_1 = `1. 이용 목적

여러분을 환영합니다. JUN 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 JUN 서비스의 이용과 관련하여
JUN 서비스를 제공하는 JUN 주식회사(이하 ‘JUN’)와 이를 이용하는 JUN 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며,
아울러 여러분의 JUN 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. JUN 서비스를 이용하시거나 JUN 서비스
회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.`;

  return (
    <Container textAlign="left">
      <Header as="h2">펀딩 약관</Header>
      <Segment>
        <Form>
          <Form.Group widths="equal">
            <Form.TextArea
              style={{ height: 200 }}
              fluid
              label="개인정보 수집 및 이용 동의"
              required={true}
              value={terms_1}
              readOnly
            />
          </Form.Group>
          <Form.Checkbox label="동의" />

          <Form.Group widths="equal">
            <Form.TextArea
              style={{ height: 200 }}
              fluid
              label="개인정보 수집 및 이용 동의"
              required={true}
              value={terms_1}
              readOnly
            />
          </Form.Group>
          <Form.Checkbox label="동의" />
          <Divider></Divider>

          <Container textAlign="center">
            <Form.Button type="submit">제출</Form.Button>
          </Container>
        </Form>
      </Segment>
    </Container>
  );
};

export default FundingTerms;
