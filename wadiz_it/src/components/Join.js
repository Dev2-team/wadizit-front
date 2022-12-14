import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "./Button";

const Join = () => {
    const nav = useNavigate();
    const [form, setForm] = useState({
      id: "",
      pwd: "",
      nickname: "",
      name: "",
      phone: "",
      email: ""
    });
    const {id, pwd, nickname, name, phone, email} = form;
    
    const idValid = false;

    const checkId = () => {
      if (id === "") {
        alert("아이디를 입력하세요.");
        return;
      }else if (id === 0){
        idValid = true
      }
    };
    const sendJoin = (e) => {
      e.preventDefault();
  
      axios
        .post("/joinProc", form)
        .then((res) => {
          if (res.data === "Ok") {
            alert("가입 성공");
            nav("/login");
          }
        })
        .catch((error) => console.log(error));
    };

    const onChange = useCallback(
        (e) => {
          const formObj = {
            ...form,
            [e.target.name]: e.target.value,
          };
          setForm(formObj);
        },[form]
      );

    return (
        <div className='Join'>
            <form className='Content' onSubmit={}>
                <h3>회원가입</h3>

                <input className='Input' name='id' value={id}
                    placeholder="아이디(조건?)" onChange={onChange} autoFocus required />
                
                <Button outline onclick={clickId}>중복 확인</Button>

                <input type='password' className='Input' name='pwd' value={pwd}
                    placeholder="비밀번호" onChange={onChange} autoFocus required />
                <input className='Input' name='nickname' value={nickname}
                    placeholder="닉네임" onChange={onChange} autoFocus required />
                <input className='Input' name='name' value={name}
                    placeholder="이름" onChange={onChange} autoFocus required />
                <input className='Input' name='phone' value={phone}
                    placeholder="연락처" onChange={onChange} autoFocus required />
                <input className='Input' name='email' value={email}
                    placeholder="이메일" onChange={onChange} autoFocus required />

                <Button outline onclick={}>가입</Button>      
            </form>
        </div>
    );
};

export default Join;