import React from "react";
import { Container, Header, Checkbox, Table, Button } from "semantic-ui-react";

const ManageMember = () => {
  return (
    <Container>
      <Container
        style={{
          display: "flex",
          verticalAlign: "middle",
          justifyContent: "space-between",
        }}
      >
        <Header style={{}}>회원 관리</Header>
        <Button size="small">삭제</Button>
      </Container>
      <Table celled compact definition collapsing={false}>
        <Table.Header fullWidth>
          <Table.Row textAlign="center">
            <Table.HeaderCell>삭제</Table.HeaderCell>
            <Table.HeaderCell>이름</Table.HeaderCell>
            <Table.HeaderCell>닉네임</Table.HeaderCell>
            <Table.HeaderCell>이메일</Table.HeaderCell>
            <Table.HeaderCell>전화번호</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row textAlign="center">
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>January 11, 2014</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>Jill Lewis</Table.Cell>
            <Table.Cell>May 11, 2014</Table.Cell>
            <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
          </Table.Row>
        </Table.Body>

        {/* <Table.Footer fullWidth>
      <Table.Row textAlign='right'>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='5'>
          <Button
            floated='right'
            icon
            labelPosition='left'
            primary
            size='small'
          >
            <Icon name='user' /> Add User
          </Button>
          <Button size='small'>삭제</Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer> */}
      </Table>
    </Container>
  );
};

export default ManageMember;
