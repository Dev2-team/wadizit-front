import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";


const Header = ({ logState, onLogout }) => {
  const { logNick, flink } = logState;
  //로고 클릭(로그인 후 main, 로그인 전 home)
  const homeLink = logNick === "" ? "/" : "/main";

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click) ;
  const closeMobileMenu = () => setClick(false);

  // 화면 크기에 따라서 버튼이 보이고 안보이도록....
  const showButton = () => {
      if(window.innerWidth <= 960){
          setButton(false)
      }
      else {
          setButton(true);
      }
  };

  // 로그인 관련 버튼이 사이즈가 줄어들면 안 보이게...
  useEffect(() => {
      showButton();
  }, []);

  return (
      <div className="Header">
        <div className="Content">
          <Link to={homeLink} onClick={closeMobileMenu}>
            <img src={logo} className='navbar-logo' alt="logo" />
            {/* <i className='fab fa-typo3' /> */}
            {/* 로고 */}
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faTimes : faBars} />
          </div>

          <div className={click ? 'nav-menu active' : 'nav-menu'}>
            <div className="nav-item">
              <div className='nav-div'>
                <Link to='/test' className='nav-links' onClick = {closeMobileMenu}>test1</Link>
              </div>
              <div className='nav-div'>
                <Link to='/test' className='nav-links' onClick = {closeMobileMenu}>test2</Link>
              </div>
              <div className='nav-div'>
                <Link to='/test' className='nav-links' onClick = {closeMobileMenu}>test3</Link>
              </div>
              <div className='nav-div'>
                <Link to='/test' className='nav-links' onClick = {closeMobileMenu}>test4</Link>
              </div>
              {/* <div className='nav-div'>
                <Link to='/login' className='nav-links-mobile' onClick = {closeMobileMenu}>Login</Link>
              </div>
              <div className='nav-div'>
                <Link to='/join' className='nav-links-mobile' onClick = {closeMobileMenu}>Join</Link>
              </div> */}

            </div> {/* nav-item end  */}
          
            <div className="log-item">
              <div className="log-div">
                <Link to={flink}>{button && logNick !== "" ? `${logNick}님` : "Login"}</Link>
              </div>
              <div className="log-div">
                {button && logNick !== "" ? (<span onClick={onLogout}>Logout</span>) : (<Link to="/join">Join</Link>)}
              </div>
            </div> {/* log-item end  */}
          </div> {/* nav-menu end  */}

        </div> {/* Content end  */}
      </div> 
  );
};

export default Header;
