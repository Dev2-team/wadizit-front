import React from "react";
import { Container, Table } from "semantic-ui-react";

const BoardListTable = () => {
  return (
    <Container>
      <Table celled compact definition collapsing={false}>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>제목</Table.HeaderCell>
            <Table.HeaderCell>작성자</Table.HeaderCell>
            <Table.HeaderCell>기간</Table.HeaderCell>
            <Table.HeaderCell>목표 금액</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>January 11, 2014</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <br></br>
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <br></br>
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <br></br>
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

export default BoardListTable;
