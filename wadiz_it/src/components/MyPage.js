import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Tab, Header, Table, Divider, Button, Message} from "semantic-ui-react";
import styled from "styled-components";




const MyPage = () => {
  const [memberItem, setMemberItem] = useState([]);
  const [myFundingItem, setMyFundingItem] = useState([]);
  const [myDonateItem, setMyDonateItem] = useState([]);
  // const [editPwd, setEditPwd] = useState([]);
  // const [editName, setEditName] = useState([]);
  // const [editNickname, setEditNickname] = useState([]);
  // const [editPhone, setEditPhone] = useState([]);
  // const [editEmail, setEditEmail] = useState([]);
  // const [editData, setEditData] = useState({
  //   pwd: "",
  //   name: "",
  //   nickname: "",

  // })
  const [nameError, setNameError] = useState(false)
  const [editName, setEditName] = useState([])

  const nameChange = (e) => {
    console.log(e.target.value.length);
    if(e.target.value.length < 2 || e.target.value.length > 5)
    {
      setNameError(true);
    }else{
      setNameError(false);
      setEditName(e.target.value)
    }
  }

  const handleSubmit = () => {
    // 유효성 검사
    if(nameError){
      console.log('안돼 돌아가');
      return
    }


    // 내 정보 깊은 복사로 객체 생성
    const editData = JSON.parse(JSON.stringify(memberItem)) // 깊은 복사

    // 각 속성 editValue 할당
    editData.name = editName



    // editData axios 로 put 또는 patch 사용하여 서버 전달


    // 서버에서 JPA 로 Update method 실행


    // .then 으로 성공 or 실패 띄워주기
    
    

    // 객체의 깊은 복사, 얕은 복사 확인하는 방법
    console.log('editData :>> ', editData);
    console.log('memberItem :>> ', memberItem);
  }


  const memberNum = sessionStorage.getItem("memberNum");

  useEffect(() => {
    // 서버로부터 내 정보 가져오기
    axios
    .get(`/member/get?MemberNum=${memberNum}`)
    .then((res) => {
      setMemberItem(res.data);
    })
    .catch((err) => console.log(err));

    // 서버로부터 내 펀딩 생성 내역 가져오기
    axios
    .get(`/funding/plist?MemberNum=${memberNum}`)
    .then((res) => {
      console.log(res.data);
      setMyFundingItem(res.data);
    })
    .catch((err) => console.log(err));

    // 서버로부터 내 펀딩 참가 내역 가져오기
    axios
    .get(`/donate/dlist?MemberNum=${memberNum}`)
    .then((res) => {
      setMyDonateItem(res.data);
    })
    .catch((err) => console.log(err));    
  }, []);


  const onUpdateName = () => {
    document.getElementById("updateName").style.display = "block";
    document.getElementById("updateNameButton").style.display = "none";
    document.getElementById("cancelNameButton").style.display = "block";
  }

  const onCalcelName = () => {
    document.getElementById("cancelNameButton").style.display = "none";
    document.getElementById("updateNameButton").style.display = "block";
    document.getElementById("updateName").style.display = "none";
  }

  // const handleChange = (e, { name, value }) => this.setState({ [name]: value })

  // const handleSubmit = () => {
  //   const { pwd, name, nickname, phone, email } = this.state
    
  //   this.setState({
  //   setEditPwd: pwd,
  //   setEditName: name,
  //   setEditNickname: nickname,
  //   setEditPhone: phone,
  //   setEditEmail: email
  //   })
  // }

  const manageMember = () => {
    return (
      <Container>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input label="ID" defaultValue={memberItem.id} readOnly={true} />
            {/* <Form.Button size='tiny'>수정</Form.Button> */}
          </Container>
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="비밀번호"
              type="password"
              defaultValue={memberItem.pwd}
              readOnly={true}
            />
            <Form.Button size="tiny"
            // onClick={onUpdatePwd}
            >
              수정
            </Form.Button>
          </Container>
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="이름"
              defaultValue={memberItem.name}
              // onChange={func}
              readOnly={true}
            />
            <Button id="updateNameButton" size="tiny" onClick={onUpdateName}>수정</Button>
            <Button id="cancelNameButton" size="tiny" style={{display: "none"}} onClick={onCalcelName}>취소</Button>
          </Container>     
        </Form>

        {/* -------------------------이름 수정 form ---------------------------- */}
        <Form error={nameError} id="updateName" style={{display: "none"}}>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="이름"
              name='name'
              defaultValue={editName}
              onChange={nameChange}
            />
            
            <Form.Button size="tiny" >확인</Form.Button>
            
          </Container>
          <Message
              error
              header='형식 제한'
              content='2글자 이상 5글자 미만으로 입력해주세요.'
            />
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="닉네임"
              defaultValue={memberItem.nickname}
              // onChange={func}
              readOnly={true}
            />
            <Form.Button size="tiny">수정</Form.Button>
          </Container>
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="연락처"
              defaultValue={memberItem.phone}
              // onChange={func}
              readOnly={true}
            />
            <Form.Button size="tiny">수정</Form.Button>
          </Container>
        </Form>
        <Divider></Divider>
        <Form>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Input
              label="이메일"
              defaultValue={memberItem.email}
              // onChange={func}
              readOnly={true}
            />
            <Form.Button size="tiny">수정</Form.Button>
          </Container>
        </Form>
        <Form.Button size="tiny" onClick={handleSubmit} >완료</Form.Button>
      </Container>
      
    );
  };

  const manageFunding = () => {
      return (
      <Container>
        <Table celled compact definition collapsing={false}>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>시작일</Table.HeaderCell>
              <Table.HeaderCell>종료일</Table.HeaderCell>
              <Table.HeaderCell>목표금액</Table.HeaderCell>
              <Table.HeaderCell>현재금액</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <FundingTable/>
          </Table.Body>
        </Table>
      </Container>
      )
  };

  const FundingTable = () => {
    return (
      Object.values(myFundingItem).map((item) => {
        return (
          <Table.Row  key={item.fundingNum} >
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>{item.startDate}</Table.Cell>
          <Table.Cell>{item.endDate}</Table.Cell>
          <Table.Cell>{item.targetAmount}</Table.Cell>
          <Table.Cell>{item.currentAmount}</Table.Cell>
        </Table.Row>
        )
        })  
  )}


  const manageDonate = () => {
    return (
      Object.values(myFundingItem).map((item) => {
        return (
      <Container>
        <Table celled compact definition collapsing={false}>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>시작일</Table.HeaderCell>
              <Table.HeaderCell>종료일</Table.HeaderCell>
              <Table.HeaderCell>목표금액</Table.HeaderCell>
              <Table.HeaderCell>현재금액</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {/* <Table.Body>
            <Table.Row>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.startDate}</Table.Cell>
              <Table.Cell>{item.endDate}</Table.Cell>
              <Table.Cell>{item.targetAmount}</Table.Cell>
              <Table.Cell>{item.currentAmount}</Table.Cell>
            </Table.Row>
          </Table.Body> */}

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
      )
  })
    );
  };

  const panes = [
    {
      menuItem: "펀딩 생성 내역",
      render: () => <Tab.Pane attached={false}>{manageFunding()}</Tab.Pane>,
    },
    {
      menuItem: "보유 코인 내역",
      render: () => <Tab.Pane attached={false}>{manageDonate()}</Tab.Pane>,
    },
    // {
    //   menuItem: "내가 쓴 글",
    //   render: () => <Tab.Pane attached={false}>{manageBoard()}</Tab.Pane>,
    // },
    {
      menuItem: "회원 정보",
      render: () => <Tab.Pane attached={false}>{manageMember()}</Tab.Pane>
    }
  ];

  const TabMenu = () => (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  );

  return (
    <Container textAlign="left">
      <Header as="h2">마이페이지</Header>
      {TabMenu()}
    </Container>
  );
};

export default MyPage;
