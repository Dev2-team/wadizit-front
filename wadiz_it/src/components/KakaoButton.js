import "./KaKaoButton.scss";

const CLIENT_ID = "3325b1fa29c94621b861b2793200c360";
const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;


const KakaoButton = () => {
    return (
    <div className="test">
        <a href={KAKAO_AUTH_URL}>
            <div className='kakao_btn'></div>
        </a>
    </div>
    );
};

export default KakaoButton;
