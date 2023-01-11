import React, { useState } from "react";
import { Header, Image, Button, Card, Divider, Icon } from "semantic-ui-react";

const GoodsList = () => {
  const [goodsList, setGoodsList] = useState([]);
  const addGoods = () => {};

  const testArray = [
    {
      price: 2000,
      title: "asdasd",
      desc: "설명dddddddddddddd",
      img: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    },
    {
      price: 2000,
      title: "asdasd",
      desc: "설명dddddddddddddd",
      img: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    },
    {
      price: 2000,
      title: "asdasd",
      desc: "설명dddddddddddddd",
      img: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    },
    {
      price: 2000,
      title: "asdasd",
      desc: "설명dddddddddddddd",
      img: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    },
  ];
  let newGoodsList = Object.values(testArray).map((item) => (
    <Card>
      <Image src={item.img} wrapped ui={false} />
      <Card.Content>
        <Card.Header as={"h2"}>{item.price}</Card.Header>
        <Divider></Divider>
        <Card.Description as={"b"}>{item.desc}</Card.Description>
        <Card.Description>+ 디아블로 탈것</Card.Description>
        <Divider></Divider>
        <Button fluid basic color="red">
          구매
        </Button>
      </Card.Content>
    </Card>
  ));
  newGoodsList.push(
    <Card onClick={addGoods}>
      <Image src="/asset/add_goods.png" />
      <Card.Content>
        <Card.Header as={"h2"}>굿즈 추가</Card.Header>
      </Card.Content>
    </Card>
  );

  setGoodsList(newGoodsList);

  return (
    <Card.Group itemsPerRow={4} stackable style={{ "margin-top": 0 }}>
      {goodsList.length > 0 ? (
        goodsList
      ) : (
        <Header as={"h1"}>현재 굿즈는 준비중입니다</Header>
      )}
    </Card.Group>
  );
};

export default GoodsList;
