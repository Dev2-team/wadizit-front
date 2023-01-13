import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Header } from "semantic-ui-react";
import ButtonScss from "../common/Button.scss";

import "./BoardWrite.scss";

const BoardWrite = () => {
  const nav = useNavigate();
  const boardList = () => {
    nav("/board/list");
  };

  const [data, setData] = useState({
    title: "",
    content: "",
  });
  let formData = new FormData();

  const { title, content } = data;

  const onWrite = useCallback(
    (e) => {
      e.preventDefault();
      //console.log(data);
      //전송 시 파일 이외의 데이터를 폼데이터에 추가

      axios
        .post("/board", data)
        .then((res) => {
          if (res.data !== 0) {
            console.log(res.data);
            let keys = formData.keys();
            let i = 0;
            for (const key of keys) {
              i++;
              console.log(key);
            }

            if (i !== 0) {
              axios
                .post(
                  "/board/file",
                  formData,
                  { params: { boardNum: res.data } },
                  {
                    headers: { "Content-Type": "multipart/form-data" },
                  }
                )
                .then((res) => {
                  alert("게시물 등록 성공");
                  nav("/board/list");
                });
            } else {
              alert("게시물 등록 성공");
              nav("/board/list");
            }
          } else {
            alert("게시물 등록 실패");
          }
        })
        .catch((error) => console.log(error));
    },
    [data]
  );

  const onChange = useCallback(
    (e) => {
      const dataObj = {
        ...data,
        [e.target.name]: e.target.value,
      };
      //console.log(dataObj);
      setData(dataObj);
    },
    [data]
  );

  const onFileChange = useCallback(
    (e) => {
      const files = e.target.files;
      //console.log(files);
      formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    },
    [formData]
  );

  return (
    <Container style={{ marginTop: "30px", width: "60vw" }}>
      <Header as="h2">자유게시판</Header>
      <div className="boardForm">
        <form onSubmit={onWrite}>
          <div className="boardWrArea">
            <input
              className="title"
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="제목을 입력해주세요"
              required
            ></input>
            <br />
            <textarea
              className="boardWrContent"
              name="content"
              value={content}
              onChange={onChange}
              placeholder="내용을 입력해주세요"
              required
            ></textarea>
            <br />
            <div className="fileUpload">
              <input
                className="fileBtn"
                type="file"
                name="files"
                onChange={onFileChange}
                multiple
              />
            </div>
          </div>
          <div className="btn">
            <div className="btnArea">

              <Button type="button" className="backBtn"
                onClick={boardList}
                style={{
                  alignItems: "center",
                  margin: "0px",
                  fontSize:"0.9rem",
                  border: "1px solid #00b2b2",
                  backgroundColor: "#ffffff",
                  color: "#00b2b2",
                }}
              >
                돌아가기
              </Button>

              <Button type="button" className="writeBtn"
                onClick={onWrite}
                style={{
                  alignItems: "center",
                  margin: "0px",
                  fontSize:"0.9rem",
                  border: "1px solid #00b2b2",
                  backgroundColor: "#ffffff",
                  color: "#00b2b2",
                }}
              >
                글쓰기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default BoardWrite;
