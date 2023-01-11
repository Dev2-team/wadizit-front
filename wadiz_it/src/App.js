import "semantic-ui-css/semantic.min.css";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import Join from "./components/login/Join";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import FundingList from "./components/funding/FundingList";
import AdminPage from "./components/admin/AdminPage";
import BoardDetail from "./components/board/BoardDetail";
import BoardList from "./components/board/BoardList";
import FundingForm from "./components/funding/FundingForm";
import FundingDetail from "./components/funding/FundingDetail";
import MyPage from "./components/login/MyPage";
import FundingTerms from "./components/funding/FundingTerms";
import TokenTransaction from "./components/token/TokenTransaction";

import BoardWrite from "./components/board/BoardWrite";
import BoardUpdate from "./components/board/BoardUpdate";
import KakaoButton from "./components/login/KakaoButton";
import KakaoRedirectHandler from "./components/login/KakaoRedirectHandler";
import axios from "axios";
import SimpleSlider from "./components/common/SimpleSlider";
import KakaoPayApprove from "./components/pay/KakaoPayApprove";
import Footer from "./components/Footer";
import AdminFundingDetail from "./components/admin/AdminFundingDetail";

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
        flink: "/",
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
      flink: "/",
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
        flink: "/",
      };
      setLogState(newState);
      nav("/");
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
        flink: "/login/myPage",
      };
      setLogState(newState);
      nav("/login/myPage");
    }
  };

  return (
    <div className="App">
      <Header logState={logState} onLogout={onLogout} onMypage={onMypage} />
      <Routes>
        <Route path="/login/KakaoButton" element={<KakaoButton />} />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler setKakaoData={setKakaoData} />}
        />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login sucLogin={sucLogin} />} />
        <Route path="/login/join" element={<Join />} />
        <Route path="/funding/list" element={<FundingList />} />
        <Route path="/funding/detail" element={<FundingDetail />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route
          path="/adminPage/fundingDetail"
          element={<AdminFundingDetail />}
        />
        <Route path="/pay/KakaoPayApprove" element={<KakaoPayApprove />} />
        <Route path="/login/myPage" element={<MyPage />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/detail" element={<BoardDetail />} />
        <Route path="/board/update" element={<BoardUpdate />} />
        <Route path="/board/list" element={<BoardList />} />
        <Route path="/funding/form" element={<FundingForm />} />
        <Route path="/funding/terms" element={<FundingTerms />} />
        <Route path="/token/transaction" element={<TokenTransaction />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
