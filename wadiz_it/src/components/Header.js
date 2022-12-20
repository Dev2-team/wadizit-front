import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ logState, onLogout }) => {
  const { logNick, flink } = logState;
  //로고 클릭(로그인 후 main, 로그인 전 home)
  const homeLink = logNick === "" ? "/" : "/main";

  return (
    <div className="Header">
      <div className="Content">
        <Link to={homeLink}>
          <FontAwesomeIcon icon={faHouse} size="2x" className="IconStyle" />
        </Link>
        <div className="Title">wadiz_it</div>
        <div className="Menu">
          <div className="Item">
            <Link to={flink}>{logNick !== "" ? `${logNick}님` : "Login"}</Link>
          </div>
          <div className="Item">
            {logNick !== "" ? (<span onClick={onLogout}>Logout</span>) : (<Link to="/join">join</Link>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
