import React from "react";
import {
  Container,
  Header,
  Image,
  Button,
  Card,
  Divider,
} from "semantic-ui-react";

const GoodsList = () => {
  const makeGoodsCard = () => {
    const testArray = [
      { price: 2000, title: "asdasd", desc: "설명dddddddddddddd" },
      { price: 2000, title: "asdasd", desc: "설명dddddddddddddd" },
      { price: 2000, title: "asdasd", desc: "설명dddddddddddddd" },
      { price: 2000, title: "asdasd", desc: "설명dddddddddddddd" },
    ];
    let fundingFileImage = Object.values(testArray).map((item) => (
      <Card>
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header as={"h2"}>{item.price}</Card.Header>
          {/* <Card.Meta>{item.title}</Card.Meta> */}
          <Divider></Divider>
          <Card.Description as={"b"}>{item.desc}</Card.Description>
          <Card.Description>+ 디아블로 탈것</Card.Description>
          <Card.Description>+ 귀여운 디아블로 펫</Card.Description>
          <Card.Description>+ 티리엘 날개</Card.Description>
          <Divider></Divider>
          <Button fluid basic color="red">
            구매
          </Button>
        </Card.Content>
      </Card>
    ));

    return (
      <Card.Group
        itemsPerRow={4}
        centered
        stackable
        style={{ "margin-top": 0 }}
      >
        {fundingFileImage}
      </Card.Group>
    );
  };

  return (
    <Container textAlign="left">
      <Header as="h3" dividing>
        굿즈
      </Header>
      <Container
        style={{ marginTop: 50, marginBottom: 250 }}
        textAlign="center"
      >
        <Header as={"h1"}>현재 굿즈는 준비중입니다</Header>
        {makeGoodsCard()}
      </Container>
    </Container>
  );
};

export default GoodsList;
