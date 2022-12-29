// import React, { useEffect, useState } from 'react';
import React from 'react';
import { Card, Container, Grid, Image, Segment } from 'semantic-ui-react';
import img1 from "./img1.jpg";
// import muzi from "./muzi.jpg";
import slider from "./slider.jpg";
import 'semantic-ui-css/semantic.min.css';
// import { useNavigate } from 'react-router';
// import axios from 'axios';


const FundingCard = () => (
  <Card fluid>
    <Image style={{'height':300, 'objectFit': 'cover'}} src={img1} />
    <Card.Content>
      <Card.Header >내 폰의 레이싱 게임을 핸들로 즐긴다! 스마트폰 레이싱 휠</Card.Header>
      <Card.Meta>테크/가전</Card.Meta>
      <Card.Header style={{'color':'#00b2b2'}}>
        127,000원
      </Card.Header>
    </Card.Content>
  </Card>
);

const FundingList = () => {
  // const nav = useNavigate();
  // const nickName = sessionStorage.getItem("nickName");
  // let pnum = sessionStorage.getItem("pageNum");
  // const [fitem, setfitem] = useState({});
  // const [page, setPage] = useState({
  //   totalPage: 0,
  //   pageNum: 1,
  // });

  //게시글 목록을 서버로부터 가져오는 함수
  // const getList = (pnum) => {
  //   axios
  //     .get("/page", { params: { pageNum: pnum } })
  //     .then((res) => {
  //       //console.log(res.data);
  //       // const { fffList, totalPage, pageNum } = res.data;
  //       // setPage({ totalPage: totalPage, pageNum: pageNum });
  //       //console.log(totalPage);
  //       const {fffList, pageNum} = res.data;
  //       setfitem(fffList);
  //       sessionStorage.setItem("pageNum", pageNum);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const getBoard = useCallback((fnum) => {
  //   //보여질 게시글 번호를 localStorage에 저장(글번호 유지를 위해)
  //   localStorage.setItem("fundingNum", fnum);
  //   // nav("/board");
  // }, []);

  //main 페이지가 화면에 보일 때 서버로부터 게시글 목록을 가져온다.
  // useEffect(() => {
  //   if (nickName === null) {
  //     nav("/", { replace: true });
  //     return;
  //   }
  //   pnum !== null ? getList(pnum) : getList(1);
  // }, []);

  //출력할 게시글 목록 작성
  // let list = null;
  // if (fitem.length === 0) {
  //   list = (
  //       <span>진행 중인 펀딩이 없습니다.</span>
  //   );
  // } else {
  //   list = Object.values(fitem).map((item) => (
  //     <TableRow key={item.fnum}>
  //       <TableColumn wd="w-10">{item.fnum}</TableColumn>
  //       <TableColumn wd="w-40">
  //         <div onClick={() => getBoard(item.fnum)}>{item.title}</div>
  //       </TableColumn>
  //       <TableColumn wd="w-20">{item.bmid}</TableColumn>
  //     </TableRow>
  //   ));
  // }

  // const FundingCard = Object.values(fitem).map((item) => (
  //   <Card fluid>
  //     <Image style={{'height':300, 'objectFit': 'cover'}} src={img1} />
  //     <Card.Content>
  //       <Card.Header>{item.title}</Card.Header>
  //       <Card.Meta>{item.category}</Card.Meta>
  //       <Card.Header style={{'color':'#00b2b2'}}>
  //         {item.targetAmount}
  //       </Card.Header>
  //       <Card.Header style={{'color':'#00b2b2'}}>
  //         {item.currentAmount}
  //       </Card.Header>
  //     </Card.Content>
  //   </Card>
  // ));

  return (
    <Container>
    <Segment placeholder style={{'margin':0, 'padding':0, }}>
        <Image style={{'width':'100%', 'height':300, 'objectFit': 'cover'}} src={slider}></Image>
    </Segment>
    <Container style={{'height':10}}></Container>
    <Grid doubling columns={4}>
      <Grid.Column>
        <FundingCard></FundingCard>
      </Grid.Column>
      <Grid.Column>
        <FundingCard></FundingCard>
      </Grid.Column>
      <Grid.Column>
        <FundingCard></FundingCard>
      </Grid.Column>
      <Grid.Column>
        {/* <Image src='logo512.png' /> */}
        <FundingCard></FundingCard>
      </Grid.Column>
      <Grid.Column>
        {/* <Image src='logo512.png' /> */}
        <FundingCard></FundingCard>
      </Grid.Column>
    </Grid>
        </Container>

    );
};

export default FundingList;
