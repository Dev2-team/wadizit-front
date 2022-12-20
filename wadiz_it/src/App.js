import './App.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Test from './components/Test';
import Join from './components/Join';
import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
//import Home from './components/Home';


function App() {
  const nav = useNavigate();

  //로그인 상태 저장
  const [logState, setLogState] = useState({
    logNick: "",
    flink: "/login",
  });

  useEffect(() => {
    //세션에 저장된 로그인 아이디를 가져옴(로그인 상태 유지)
    const id = sessionStorage.getItem("id");
    //console.log(mid);
    if (id !== null) {
      const newState = {
        logid: id,
        flink: "/main",
      };
      setLogState(newState);
    }
  }, []);

  //로그인 성공 시 로그인 상태 변경 함수
  const sucLogin = useCallback((nickName) => {
    const newState = {
      logNick: nickName,
      flink: "/main",
    };
    setLogState(newState);
  }, []);

    //로그아웃함수
    const onLogout = () => {
      alert("로그아웃");
      const newState = {
        logNick: "",
        flink: "/login",
      };
      setLogState(newState);
      //로그아웃 시 로그인 상태 및 페이지번호 삭제
      sessionStorage.removeItem("id");
      // sessionStorage.removeItem("pageNum");
      nav("/"); //첫페이지로 돌아감.
    };


  return (
    <div className="App"> 
        <Header logState={logState} onLogout={onLogout} />
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/login" element={<Login sucLogin={sucLogin} />} />
          {/* <Route path="/join" element={<Join />} /> */}
          <Route path="/main" element={<Main />} />
          <Route path="/test" element={<Test />} /> 
        </Routes>
    </div>
  );
}

export default App;
