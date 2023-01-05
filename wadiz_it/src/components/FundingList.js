import React, { useCallback, useRef, useEffect, useState} from 'react';
// import React from 'react';
import { Card, Container, Grid, Image, Segment } from 'semantic-ui-react';
import img1 from "./img1.jpg";
// import muzi from "./muzi.jpg";
import slider from "./slider.jpg";
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

const FundingList = () => {
  const nav = useNavigate();
  const nickName = sessionStorage.getItem("nickName");
  const [fundingItem, setFundingItem] = useState([]);
  const [page, setPage] = useState(1);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const endRef = useRef(false);

  useEffect(()=> {
    if (nickName === null) {
      nav("/", { replace: true });
      return;
    }
    getList();
    const observer = new IntersectionObserver(obsHandler, { threshold : 0.5 });
    if(obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    }
}, [])

useEffect(()=> {
  if(page !== 1) getList();
}, [page])

const obsHandler = ((entries) => {
    const target = entries[0];
    if(!endRef.current && target.isIntersecting && preventRef.current){ 
        preventRef.current = false;
      setPage(prev => prev + 1);
    }
  })

  //게시글 목록을 서버로부터 가져오는 함수
  const getList = useCallback(() => {
    axios
      .get("funding/page", { params: { pageNum: page } })
      .then((res) => {
        const { fffList, pageNum, end } = res.data;
        if(end){ //마지막 페이지일 경우
          endRef.current = true;
        }
        console.log(res.data);
        let arr = [];
        if (fundingItem.length !== 0) {
          fundingItem.map((x) => {
            arr.push(x);
          })
        }
        fffList.map((x) => {
          delete x.funding.memberNum;
          if(x.fundingFileList.length !== 0){
            x.funding.fileName = x.fundingFileList[0].originName;
          }
          arr.push(x.funding);
        })
        setFundingItem(arr);
        sessionStorage.setItem("pageNum", pageNum);
        preventRef.current = true;
      })
      .catch((err) => console.log(err));
  }, [page]);
  
// const getImage = (data) =>{
//   return "/public/asset/"+data;
// }

  const FundingCard = () => {
    return (
      Object.values(fundingItem).map((item) => {
        return (
            <Grid.Column key={item.fundingNum}>
            <Card fluid>
              {
                item.fileName ?
                // <Image style={{'height':300, 'objectFit': 'cover'}} src={getImage(item.fileName)} />
                <Image style={{'height':300, 'objectFit': 'cover'}} src={require(`../../public/asset/${item.fileName}`)} />

                  :
                  <Image style={{'height':300, 'objectFit': 'cover'}} src={img1} />
              }

              
            <Card.Content>
              <Card.Header>{item.title}</Card.Header>
              {/* <Card.Meta>{item.category}</Card.Meta> */}
              <Card.Header style={{'color':'#00b2b2'}}>
                {item.targetAmount}
              </Card.Header>
              <Card.Header style={{'color':'#00b2b2'}}>
                {item.currentAmount}
              </Card.Header>
            </Card.Content>
            </Card>
            </Grid.Column>
        )
      })
    )
  };

  return (
    <Container>
    <Segment placeholder style={{'margin':0, 'padding':0, }}> 
        <Image style={{'width':'100%', 'height':300, 'objectFit': 'cover'}} src={slider}></Image>
      </Segment>
      {
        fundingItem.length === 0 &&<div style={{height : "100vh"} }>로딩 중입니다....</div>
      }
      
    <Container style={{height:10}}/>
    <Grid doubling columns={4} >
    <FundingCard />
    </Grid>
    <div ref={obsRef} />
    </Container>
    );
};

export default FundingList;
