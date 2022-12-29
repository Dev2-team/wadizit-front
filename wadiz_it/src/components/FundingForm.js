import React, { useState } from "react";
import { Container, Form, Header, Divider, Input } from "semantic-ui-react";

const FundingForm = () => {
  const [dateInputs, setDateInputs] = useState({
    startYYYY: 2022,
    startMM: 1,
    startDD: 12,
    endYYYY: 2022,
    endMM: 1,
    endDD: 12,
  });
  const onChangeDate = (e) => {
    const { value, name } = e.target;
    if (value.length !== 0 && /^\d+$/.test(value) === false) return;
    setDateInputs({
      ...dateInputs,
      [name]: value,
    });
  };

  return (
    <Container textAlign="left">
      <Header as="h2">펀딩 생성</Header>
      <Divider></Divider>
      <Form>
        <Form.Input required={true} fluid label="제목" defaultValue={""} />
      </Form>
      <Divider></Divider>
      <Form>
        <Form.Input
          required={true}
          fluid
          type="number"
          label="목표 금액"
          defaultValue={""}
        />
      </Form>
      <Divider></Divider>
      <Form>
        <Form.Group>
          <Form.Field
            required={true}
            label="start year"
            control={Input}
            name="startYYYY"
            value={dateInputs.startYYYY}
            type="text"
            maxLength="4"
            width={2}
            placeholder="yyyy"
            onChange={onChangeDate}
          />
          <Form.Field
            required={true}
            label="month"
            control={Input}
            name="startMM"
            value={dateInputs.startMM}
            type="text"
            maxLength="2"
            width={2}
            placeholder="MM"
            onChange={onChangeDate}
          />
          <Form.Field
            required={true}
            label="day"
            control={Input}
            name="startDD"
            value={dateInputs.startDD}
            type="text"
            maxLength="2"
            width={2}
            placeholder="MM"
            onChange={onChangeDate}
          />
        </Form.Group>
        <Divider></Divider>
        <Form.Group>
          <Form.Field
            required={true}
            label="end year"
            control={Input}
            name="endYYYY"
            value={dateInputs.endYYYY}
            type="text"
            maxLength="4"
            width={2}
            placeholder="yyyy"
            onChange={onChangeDate}
          />
          <Form.Field
            required={true}
            label="month"
            control={Input}
            name="endMM"
            value={dateInputs.endMM}
            type="text"
            maxLength="2"
            width={2}
            placeholder="MM"
            onChange={onChangeDate}
          />
          <Form.Field
            required={true}
            label="day"
            control={Input}
            name="endDD"
            value={dateInputs.endDD}
            type="text"
            maxLength="2"
            width={2}
            placeholder="MM"
            onChange={onChangeDate}
          />
        </Form.Group>
      </Form>
      <Divider></Divider>
      <Form>
        <Form.Input required={true} fluid label="리워드" defaultValue={""} />
      </Form>
    </Container>
  );
};

export default FundingForm;
