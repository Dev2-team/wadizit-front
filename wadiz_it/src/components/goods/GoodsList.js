import axios from "axios";
import { React, useCallback, useEffect, useState } from "react";
import { Image, Card, Divider, Container, Header } from "semantic-ui-react";
import GoodsAddModal from "./GoodsAddModal";

const GoodsList = () => {
  const memberNum = sessionStorage.getItem("memberNum");
  const fundingOwner = localStorage.getItem("fundingOwner");
  console.log(memberNum, fundingOwner);
  const fundingNum = localStorage.getItem("fundingNum");
  const [goodsList, setGoodsList] = useState([]);
  const [open, setOpen] = useState(false);
  const toggleAddModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // 굿즈 리스트 얻기
    axios
      .get("/funding/goods/list?fundingNum=" + fundingNum)
      .then((res) => {
        setGoodsList(res.data);
      })
      .catch((err) => console.log(err));

    makeGoodsElem();
  }, []);

  const addGoods = useCallback(
    (data, fileForm, callback) => {
      // 굿즈 생성 요청
      axios
        .post("/funding/goods", data)
        .then((res) => {
          if (res.data === null) {
            return;
          }
          let goods = res.data;

          // 파일 업로드
          axios
            .post("/funding/goods/image", fileForm, {
              params: { goodsNum: goods.goodsNum },
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              if (res.data !== "") {
                goods.imageFileName = res.data;
                setGoodsList((prev) => [...prev, goods]);
              }
              callback();
            })
            .catch((err) => callback());
        })
        .catch((err) => callback());
    },
    [goodsList]
  );

  const purchaseOrDelete = (item) => {
    console.log("pod");
    if (memberNum === fundingOwner) {
      // 삭제
      axios.delete("/funding/goods?goodsNum=" + item.goodsNum).then((res) => {
        const newGoodsList = goodsList.filter(
          (goods) => goods.goodsNum !== item.goodsNum
        );
        setGoodsList(newGoodsList);
      });
    } else {
      // 구매
    }
  };

  const makeGoodsElem = () => {
    return Object.values(goodsList).map((item) => (
      <Card onClick={() => purchaseOrDelete(item)}>
        <Image wrapped src={item.imageFileName} ui={false} />
        <Card.Content>
          <Card.Header as={"h4"}>{item.title}</Card.Header>
          <Divider></Divider>
          <Card.Description as={"b"}>{item.price} 토큰</Card.Description>
          <Card.Description>{item.desc1}</Card.Description>
        </Card.Content>
      </Card>
    ));
    // setGoodsElemList(newGoodsElemList);
  };

  const checkEmpty = () => {
    if (goodsList.length === 0) {
      return (
        <Container
          textAlign="center"
          style={{ marginTop: 30, marginBottom: 30 }}
        >
          <Header>아직 준비중입니다</Header>
        </Container>
      );
    }
  };

  return (
    <Container>
      {open ? (
        <GoodsAddModal
          addGoods={addGoods}
          toggleOpen={toggleAddModal}
        ></GoodsAddModal>
      ) : (
        ""
      )}
      <Card.Group itemsPerRow={4} stackable style={{ marginTop: 0 }}>
        {makeGoodsElem()}
        {fundingOwner === memberNum ? (
          <Card onClick={toggleAddModal}>
            <Image wrapped src="/asset/add_goods.png" />
            <Card.Content>
              <Card.Header as={"h2"}>굿즈 추가</Card.Header>
              <Divider></Divider>
            </Card.Content>
          </Card>
        ) : (
          checkEmpty()
        )}
      </Card.Group>
    </Container>
  );
};

export default GoodsList;
