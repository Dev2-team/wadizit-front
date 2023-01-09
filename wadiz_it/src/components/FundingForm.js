/** @format */

import React, { useCallback, useState } from "react";
import { Container, Form, Header, Divider, Input } from "semantic-ui-react";
import Calendar from "react-calendar";
import Modal from "./Modal";
import "./MyCalendar.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";

const FundingForm = () => {
  // const [dateInputs, setDateInputs] = useState(new Date());

  const [modalOpen1, setModalOpen1] = useState(false);
  const openModal1 = () => {
    setModalOpen1(true);
  };
  const closeModal1 = () => {
    setModalOpen1(false);
  };
  // const onChangeDate = (e) => {
  //   const { value, name } = e.target;
  //   if (value.length !== 0 && /^\d+$/.test(value) === false) return;
  //   setDateInputs({
  //     ...dateInputs,
  //     [name]: value,
  //   });
  // };

  const nav = useNavigate();
  const memberNum = sessionStorage.getItem("memberNum");
  const [data, setData] = useState({
    title: "",
    membernum: { memberNum: memberNum },
    targetAmount: "",
    startDate: "",
    endDate: "",
    category: 0,
    status: 0,
  });

  const [fileList, setFileList] = useState([]);
  const { title, tamount } = data;

  // useEffect(() => {
  //   console.log("useEffect", data);
  // }, [data]);

  const onWrite = useCallback(
    (e) => {
      e.preventDefault();
      // console.log(data);
      // formData.append(
      //   "data",
      //   new Blob([JSON.stringify(data)], { type: "application/json" })
      // );
      // console.log("senddata:", data);
      let form = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        form.append("files", fileList[i]);
      }

      axios
        // .post("funding", JSON.stringify(data), {
        //   headers: { "Content-Type": "application/json" },
        // })
        .post("/funding", data)
        .then((res) => {
          if (res.data !== 0) {
            let keys = fileList.keys();
            let i = 0;
            for (const key of keys) {
              i++;
            }

            console.log(i, keys, fileList);

            if (i !== 0) {
              console.log("post funding file");
              axios
                .post(
                  "/funding/file",
                  form,
                  { params: { fundingNum: res.data } },
                  {
                    headers: { "Content-Type": "multipart/form-data" },
                  }
                )
                .then((res) => {
                  alert("작성 성공");
                  nav("/fundinglist");
                });
            } else {
              alert("작성 성공");
              nav("/fundinglist");
            }
          } else {
            alert("게시글 등록 실패");
          }
        })
        .catch((error) => console.log(error));
    },
    [data, fileList, nav]
  );
  const onChange = useCallback(
    (e) => {
      const dataObj = {
        ...data,
        [e.target.name]: e.target.value,
      };
      // console.log(e);
      // console.log("target name: ", e.target.name);
      // console.log(dataObj);
      setData(dataObj);
    },
    [data]
  );
  //console.log(data);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const onChangeDate = useCallback(
    (e) => {
      const startDateFormat = moment(e[0]).format("YYYY-MM-DD");
      const endDateFormat = moment(e[1]).format("YYYY-MM-DD");

      setStartDate(startDateFormat);
      setEndDate(endDateFormat);

      // console.log(startDateFormat);
      // console.log(endDateFormat);

      const dataObj = {
        ...data,
        startDate: startDateFormat,
        endDate: endDateFormat,
      };
      setData(dataObj);
    },
    [data]
  );
  // const onChangeDate = (e) => {
  //   const startDateFormat = moment(e[0]).format("YYYY-MM-DD");
  //   const endDateFormat = moment(e[1]).format("YYYY-MM-DD");

  //   setStartDate(startDateFormat);
  //   setEndDate(endDateFormat);

  //   const dataObj = {
  //     ...data,
  //     startDate: startDate,
  //     endDate: endDate,
  //   };
  //   setData(dataObj);
  // };

  const onFileChange = useCallback(
    (e) => {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        console.log("append", files[i]);

        setFileList((prev) => {
          return [...prev, files[i]];
        });
        // formData.append("files", files[i]);
      }
      console.log(fileList);
    },
    [fileList]
  );
  // console.log(data);
  // console.log(startDate, endDate);

  return (
    <Container textAlign="left" onSubmit={onWrite}>
      <Header as="h2">펀딩 생성</Header>
      <Divider></Divider>
      <Form>
        <Form.Input
          name="title"
          required={true}
          fluid
          label="제목"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={onChange}
        />
      </Form>
      <Divider></Divider>
      <Form>
        <Form.Input
          name="targetAmount"
          required={true}
          fluid
          type="number"
          label="목표 금액"
          placeholder="목표 금액을 입력하세요 (숫자, 단위=￦)"
          value={tamount}
          onChange={onChange}
        />
      </Form>
      <Divider></Divider>
      <Form>
        <Form.Group>
          <React.Fragment>
            <Modal
              open={modalOpen1}
              close={closeModal1}
              header="펀딩 기간 설정"
            >
              <Container textAlign="center">
                <div className="calendar-container">
                  <Calendar
                    onChange={onChangeDate}
                    selectRange={true}
                    formatDay={(locale, date) => moment(date).format("DD")}
                  />
                </div>
              </Container>

              {/* {startDate.length > 0 ? (
                <p className="text-center">
                  <span className="bold">시작:</span> {startDate.toDateString()}
                  &nbsp;|&nbsp;
                  <span className="bold">종료:</span> {endDate.toDateString()}
                </p>
              ) : (
                <p className="text-center">
                  <span className="bold">
                    시작 날짜와 종료 날짜를 선택하세요
                  </span>
                </p>
              )} */}
            </Modal>
          </React.Fragment>
          <Form.Field
            onClick={openModal1}
            required={true}
            label="펀딩 시작 날짜"
            control={Input}
            name="startDate"
            value={startDate || ""}
            type="text"
            // maxLength="4"
            width={5}
            placeholder="시작 날짜와 종료날짜를 선택하세요"
            onChange={onChangeDate}
          />

          {/* <Form.Field
            required={true}
            label="month"
            control={Input}
            name="startMM"
            value={startMM}
            type="text"
            maxLength="2"
            width={2}
            placeholder="MM"
            onChange={onChange}
          />
          <Form.Field
            required={true}
            label="day"
            control={Input}
            name="startDD"
            value={startDD}
            type="text"
            maxLength="2"
            width={2}
            placeholder="MM"
            onChange={onChange}
          /> */}
        </Form.Group>
        <Divider></Divider>
        <Form.Group>
          <Form.Field
            onClick={openModal1}
            required={true}
            label="펀딩 종료 날짜"
            control={Input}
            name="endDate"
            value={endDate || ""}
            type="text"
            // maxLength="4"
            width={5}
            placeholder="시작 날짜와 종료날짜를 선택하세요"
            onChange={onChangeDate}
          />
          {/* <Form.Field
            required={true}
            label="month"
            control={Input}
            name="endMM"
            value={endMM}
            type="text"
            maxLength="2"
            width={2}
            placeholder="MM"
            onChange={onChange}
          />
          <Form.Field
            required={true}
            label="day"
            control={Input}
            name="endDD"
            value={endDD}
            type="text"
            maxLength="2"
            width={2}
            placeholder="MM"
            onChange={onChange}
          /> */}
        </Form.Group>
      </Form>
      <Divider></Divider>
      <Form>
        <Form.Input
          type="file"
          required={true}
          fluid
          label="사업자 등록증 추가"
          name="files"
          onChange={onFileChange}
          //multiple
        />
        <Form.Input
          type="file"
          required={true}
          fluid
          label="펀딩 대표이미지 추가"
          name="files"
          onChange={onFileChange}
          //multiple
        />
        <Form.Input
          type="file"
          required={true}
          fluid
          label="펀딩 상세정보 이미지 추가"
          name="files"
          onChange={onFileChange}
          multiple
        />
        {/* <Form.Button
          style={{
            backgroundColor: "gray",
            color: "white",
            display: "inline-block",
            float: "right",
          }}
        >
          등록 취소
        </Form.Button> */}
        <Form.Button
          type="submit"
          style={{
            backgroundColor: "#00b2b2",
            color: "white",
            display: "inline-block",
            float: "right",
          }}
        >
          펀딩 등록
        </Form.Button>
      </Form>
    </Container>
  );
};

export default FundingForm;
