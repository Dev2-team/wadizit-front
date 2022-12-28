import React from 'react';
import { Card, Container, Grid, Image, Segment } from 'semantic-ui-react';
import img1 from "./img1.jpg";
// import muzi from "./muzi.jpg";
import slider from "./slider.jpg";
import 'semantic-ui-css/semantic.min.css';


const FundingCard = () => (
  <Card fluid>
    <Image style={{'height':300, 'objectFit': 'cover'}} src={img1} />
    <Card.Content>
      <Card.Header>내 폰의 레이싱 게임을 핸들로 즐긴다! 스마트폰 레이싱 휠</Card.Header>
      <Card.Meta>테크/가전</Card.Meta>
      <Card.Header style={{'color':'#00b2b2'}}>
        127,000원
      </Card.Header>
    </Card.Content>
    {/* <Card.Content extra>
      <a >
        <Icon name='user' />
        10 Friends
      </a>
    </Card.Content> */}
  </Card>
)

const FundingList = () => {
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