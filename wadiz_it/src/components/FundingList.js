import React from 'react';
import { Card, Container, Grid, Image, Segment } from 'semantic-ui-react';
import muzi from "./muzi.jpg";
import 'semantic-ui-css/semantic.min.css';


const FundingCard = () => (
  <Card fluid>
    <Image style={{'height':300, 'objectFit': 'cover'}} src={muzi} />
    <Card.Content>
      <Card.Header>Daniel</Card.Header>
      <Card.Meta>Joined in 2016</Card.Meta>
      <Card.Description>
        Daniel is a comedian living in Nashville.
      </Card.Description>
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
        <Image style={{'width':'100%', 'height':300, 'objectFit': 'cover'}} src={muzi}></Image>
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