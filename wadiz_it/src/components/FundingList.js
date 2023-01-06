import React, { useCallback, useRef, useEffect, useState} from 'react';
import { Card, Container, Grid, Image, Segment } from 'semantic-ui-react';
// import img1 from "img1.jpg";
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import SimpleSlider from './SimpleSlider';
import Loading from './Loading';

const FundingList = () => {
  const nav = useNavigate();
  const nickName = sessionStorage.getItem("nickName");
  const [fundingItem, setFundingItem] = useState([]);
  const [page, setPage] = useState(1);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const endRef = useRef(false);
  const [loading, setLoading] = useState(null);

  useEffect(()=> {
    if (nickName === null) {
      nav("/", { replace: true });
      return;
    }
    getList();
    setLoading(true);

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
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, [page]);

  
    // 펀딩 카드 클릭하면 해당 펀딩 상세로 이동함
    const getFundingDetail = useCallback((fundingNum) => {
      // 보여질 펀딩 글의 번호를 localStorage에 저장
      localStorage.setItem("fundingNum", fundingNum);
      nav("/FundingDetail")
    }, [nav]);

// const getImage = (data) =>{
//   return "/public/asset/"+data;
// }

  const FundingCard = () => {
    return (
      Object.values(fundingItem).map((item) => {
        return (
            <Grid.Column key={item.fundingNum} onClick={() => getFundingDetail(item.fundingNum)} >
            <Card fluid>
              {
                item.fileName ?
                <Image style={{'height':300, 'objectFit': 'cover'}} src={require(`../../public/asset/${item.fileName}`)} />
                  :
                <Image style={{'height':300, 'objectFit': 'cover'}} src="asset/img1.jpg"/>
              }
            <Card.Content>
              <Card.Header>{item.title}</Card.Header>
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
        <SimpleSlider/>
      </Segment>
      {
        fundingItem.length === 0 &&<div style={{height : "100vh"}}></div> 
      }
    <Container style={{height:10}}/>
    <Grid doubling columns={4} >
    <FundingCard/>
    </Grid>
    <div ref={obsRef} />
    {loading && <Loading/>}
    </Container>
    );
};

export default FundingList;
