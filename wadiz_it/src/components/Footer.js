import React from "react";
import { Segment, Container } from "semantic-ui-react";
import "./Footer.scss";

const Footer = () => {
  return (
    <Segment style={{ padding: 0, marginTop: 100 }} attached="bottom">
      <div>
        <Container
          style={{
            padding: "20px 0",
            display: "flex",
            flexWrap: "wrap",
            placeContent: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: "75%",
              marginRight: "auto",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div className="ft-info-div">
              <strong>회사</strong>
              <span>WadizIT(주)</span>
            </div>
            <div className="ft-info-div">
              <strong>주소</strong>
              <span>인천 미추홀구 서초대로 398, 4층 (서초동, BNK디지털)</span>
            </div>
            <div className="ft-info-div">
              <strong>대표</strong>
              <span>최아람</span>
            </div>
            <div className="ft-info-div">
              <strong>사업자등록번호</strong>
              <span>105-33-22222</span>
            </div>
            <div className="ft-info-div">
              <strong>통신판매업 신고번호</strong>
              <span>2022-인천미추홀구-0352</span>
            </div>
            <div className="ft-info-div">
              <strong>대표번호</strong>
              <span>032-0000-7777</span>
            </div>
            <div className="ft-info-div">
              <strong>고객 지원</strong>
              <span>
                평일 9:00 ~ 17:00 (12:00 ~14:00 제외) <b>010-3333-2222</b>에
                문의하세요.
              </span>
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div className="ft-link-div">
              <a>
                <img src="/asset/insta.png" />
              </a>
              <a>
                <img src="/asset/youtube.png" />
              </a>
              <a>
                <img src="/asset/twitter.png" />
              </a>
              <a>
                <img src="/asset/facebook.png" />
              </a>
              <a>
                <img src="/asset/naver.png" />
              </a>
              <a>
                <img src="/asset/kakao.png" />
              </a>
            </div>
          </div>
        </Container>
      </div>
      <div className="notice-div">
        <Container>
          <span>
            WadizIT은 플랫폼 제공자로서 프로젝트의 당사자가 아니며, 직접적인
            통신판매를 진행하지 않습니다. 거래와 프로젝트의 완수 및 선물제공의
            책임은 해당 프로젝트의 창작자에게 있으며, 프로젝트와 관련하여
            후원자와 발생하는 법적 분쟁에 대한 책임은 해당 창작자가 부담합니다.
          </span>
        </Container>
      </div>
    </Segment>
  );
};

export default Footer;
