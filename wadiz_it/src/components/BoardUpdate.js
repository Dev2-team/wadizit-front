import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import "./BoardUpdate.scss";

const BoardUpdate = () => {
    const nav = useNavigate();

    const boardList = () => {
        nav("/boardList");
    }

    const [fileDeleteList, SetFileDeleteList] = useState([]);

     //localStorag에 저장한 내용 불러오기
    let getTitle = localStorage.getItem("title");
    let getContent = localStorage.getItem("content");
    const bNum = localStorage.getItem("boardNum");

    const [bfList, setBfList] = useState([{
        boardFileNum: 0,
        originName: "파일없음",
        sysName: ""
    }]);

    
    //파일 리스트 불러오기
    useEffect(() => {
        axios
            .get("/board/file/list", { params: { boardNum: bNum } })
            .then((res) => {
                console.log("파일 : " + res.data.length);
                if (res.data.length > 0) {
                    let newFileList = [];
                    for (let i = 0; i < res.data.length; i++) {
                        const newFile = {
                            ...res.data[i]

                        };
                        newFileList.push(newFile);
                    }
                    setBfList(newFileList);
                    // console.log("bfList.originName: " + bfList.originName);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const viewFlist = bfList.map((v, i) => {

        return (
            <div className="boardUpdFilesDown" id={v.boardFileNum} key={i}>{v.originName} &nbsp;
                {
                    v.originName === "파일없음" ? null :
                        <button className='boardUpdFilesBtn' type='button' onClick={() => fileDelete(v)}>x</button>
                }
                </div>
        )
    });

    //자유게시판 개별 파일 삭제 기능
    const fileDelete = ((v) => {

        SetFileDeleteList([...fileDeleteList, v.boardFileNum])

        axios
            .delete("/board/file", { params: { boardFileNum: v.boardFileNum } })
            .then((res) => {
                console.log(res.data);
                if (res.data === "파일 삭제 완료") {
                    alert("삭제 성공");
                    const div = document.getElementById(v.boardFileNum);
                    div.remove();
                } else {
                    alert("삭제 실패");
                }
            })
            .catch((err) => console.log(err));
    });


    //자유게시판 수정 기능

    const [data, setData] = useState({
        title: getTitle,
        content: getContent
    });

    const { title, content } = data;

    const onUpdate = useCallback(
        (e) => {
            e.preventDefault();

            axios
                .put("/board", data, {params : {boardNum : bNum}})
                .then((res) => {
                    console.log(res.data);
                    if (res.data === "수정 성공") {
                        alert("글이 수정되었습니다.");
                        nav("/boardDetail");
                    } else {
                        alert("글 수정 실패");
                    }
                    
                })
                .catch((error) => console.log(error));
        }, [data]
    );

    const onChange = useCallback(
        (e) => {
            const dataObj = {
                ...data,
                [e.target.name]: e.target.value,
            };
            setData(dataObj);
        }, [data]
    );

    

    return (
        <Container>
            <Header as="h2">게시글 수정</Header>
            <div className='boardForm'>
                <form onSubmit={onUpdate}>
                    <input className="buTitle" type="text" name="title" value={title} onChange={onChange}></input><br />
                    <textarea className="buContent" type="text" name="content" value={content} onChange={onChange} required>
                    </textarea><br />
                    <div className='buFile'>
                        <div className="buFileTitle">첨부파일<button type="button">+</button></div>
                        <div className="buFileList">{viewFlist}</div>
                    </div>
                    <div className="btn">
                        <div className='upBtnArea'>
                        <button type='button' className='backBtn' onClick={boardList}>돌아가기</button>
                        <button type='submit' className='writeBtn'>수정하기</button>
                        </div>
                    </div>
                </form>
            </div>
            
        </Container>
    );
};

export default BoardUpdate;