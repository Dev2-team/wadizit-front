import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./Login.scss";

const Login = ({ sucLogin }) => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    id: "",
    pwd: "",
  });
  const {id, pwd} = form;

  const sendLogin = (e) => {
    e.preventDefault();

    axios
      .post("member/login", form)
      .then((result) => {
        if (result.data !== "") {
          const id = result.data;
          sucLogin(id);
          //로그인 상태 유지(세션)
          sessionStorage.setItem("id", id);
          nav("/test");
        } else {
          alert("아이디나 비밀번호가 틀립니다.");
          const formObj = {
            id: "",
            pwd: "",
          };
          setForm(formObj);
        }
      })
      .catch((err) => console.log(err));
  };

  const onChange = useCallback(
    (e) => {
      const formObj = {
        ...form,
        [e.target.name]: e.target.value
      };
      setForm(formObj);
    },
    [form]
  );

  return (
    <div className="Login">
      <form className="Content" onSubmit={sendLogin}>
        <h1>로그인</h1>
        <input className="Input" name="id" value={id} placeholder="아이디" onChange={onChange} autoFocus required/>
        <input type="password" className="Input" name="pwd" value={pwd} placeholder="비밀번호" onChange={onChange} required/>
        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
};

export default Login;