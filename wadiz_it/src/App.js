import "semantic-ui-css/semantic.min.css";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Test from "./components/Test";
import Join from "./components/Join";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import FundingList from "./components/FundingList";
import AdminPage from "./components/AdminPage";
import BoardDetail from "./components/BoardDetail";
import BoardList from "./components/BoardList";
import FundingForm from "./components/FundingForm";
import FundingDetail from "./components/FundingDetail";
import MyPage from "./components/MyPage";
import FundingTerms from "./components/FundingTerms";
import TokenTransaction from "./components/TokenTransaction";

import BoardWrite from "./components/BoardWrite";
import BoardUpdate from "./components/BoardUpdate";
import KakaoButton from "./components/KakaoButton";
import KakaoRedirectHandler from "./components/KakaoRedirectHandler";
import axios from "axios";
import SimpleSlider from "./components/SimpleSlider";
import KakaoPayApprove from "./components/KakaoPayApprove";
import FundingComment from "./components/FundingComment";

function App() {
  const nav = useNavigate();

  //로그인 상태 저장
  const [logState, setLogState] = useState({
    logNick: "",
    flink: "/login",
  });

  useEffect(() => {
    //세션에 저장된 로그인 아이디를 가져옴(로그인 상태 유지)

    const nickName = sessionStorage.getItem("nickName");

    //console.log(mid);
    if (nickName !== null) {
      const newState = {
        logNick: nickName,
        flink: "/main",
      };
      setLogState(newState);
    }
  }, []);

  //로그인 성공 시 로그인 상태 변경 함수
  const sucLogin = useCallback((data) => {
    //로그인 상태 유지(세션)
    sessionStorage.setItem("nickName", data.nickName);
    sessionStorage.setItem("memberNum", data.memberNum);
    sessionStorage.setItem("grade", data.grade);

    const newState = {
      logNick: data.nickName,
      flink: "/main",
    };
    setLogState(newState);
  }, []);

  //로그아웃함수 (일반, 카카오)
  const onLogout = () => {
    if (window.confirm("로그아웃 하실?")) {
      alert("로그아웃");
      const CLIENT_ID = "3325b1fa29c94621b861b2793200c360";
      const LOGOUT_REDIRECT_URI = "http://localhost:3000";
      const newState = {
        logNick: "",
        flink: "/login",
      };
      setLogState(newState);

      //카카오계정과 함께 로그아웃하여 다시 로그인할 때 아이디 비밀번호 입력 필요
      axios
        .get(
          `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`
        )
        .then((res) => {
          sessionStorage.removeItem("nickName");
          sessionStorage.removeItem("access_token");
        });
      // 토큰만 만료시켜 로그아웃하여 다시 로그인할 때 아이디 비밀번호 자동입력
      // axios.post(`https://kapi.kakao.com/v1/user/logout`,null, {
      //   headers : {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Authorization' : `Bearer ${sessionStorage.getItem("access_token")}`
      //   }
      // }).then((res) => {
      //   console.log(res);
      // })
      //로그아웃 시 로그인 상태 및 페이지번호 삭제

      sessionStorage.removeItem("nickName");
      sessionStorage.removeItem("memberNum");

      // alert("로그아웃");

      // sessionStorage.removeItem("pageNum");
      nav("/"); //첫페이지로 돌아감.
    } else {
      alert("취소");
    }
  };

  const setKakaoData = useCallback(
    (data) => {
      sessionStorage.setItem("nickName", data.nickname);
      sessionStorage.setItem("access_token", data.access_token);
      const newState = {
        logNick: data.nickname,
        flink: "/main",
      };
      setLogState(newState);
      nav("/main");
    },
    [nav]
  );

  const onMypage = () => {
    const nickName = sessionStorage.getItem("nickName");
    const grade = sessionStorage.getItem("grade");

    if (grade === "1") {
      const newState = {
        logNick: nickName,
        flink: "/adminPage",
      };
      setLogState(newState);
      nav("/adminPage");
    } else {
      const newState = {
        logNick: nickName,
        flink: "/myPage",
      };
      setLogState(newState);
      nav("/myPage");
    }
  };

  return (
    <div className="App">
      <Header logState={logState} onLogout={onLogout} onMypage={onMypage} />
      <Routes>
        <Route path="/KakaoButton" element={<KakaoButton />} />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler setKakaoData={setKakaoData} />}
        />
        {/* <Route path="/" element={<Join />} /> */}
        <Route path="/" element={<Login sucLogin={sucLogin} />} />
        <Route path="/login" element={<Login sucLogin={sucLogin} />} />
        <Route path="/join" element={<Join />} />
        <Route path="/main" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/fundingList" element={<FundingList />} />
        <Route path="/fundingDetail" element={<FundingDetail />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/simpleSlider" element={<SimpleSlider />} />
        <Route path="/KakaoPayApprove" element={<KakaoPayApprove />} />

        <Route path="/myPage" element={<MyPage />} />
        <Route path="/boardWrite" element={<BoardWrite />} />
        <Route path="/boardDetail" element={<BoardDetail />} />
        <Route path="/boardUpdate" element={<BoardUpdate />} />
        <Route path="/boardList" element={<BoardList />} />
        <Route path="/fundingForm" element={<FundingForm />} />
        <Route path="/fundingTerms" element={<FundingTerms />} />
        <Route path="/tokenTransaction" element={<TokenTransaction />} />
      </Routes>
    </div>
  );
}

export default App;
