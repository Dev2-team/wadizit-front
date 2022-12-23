import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../logo.png";

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
        <Link to={homeLink} className='navbar-logo' onClick={closeMobileMenu}>
          <img className='App-logo' src={logo} alt="logo" />
          {/* <i className='fab fa-typo3' /> */}
          {/* 로고 */}
        </Link>

        <div className='menu-icon' onClick={handleClick}>
          <i className = {click ? 'fas fa-times' : 'fas fa-bars' } />
        </div>

        <div className={click ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-item'>
          <Link to='/test' className='nav-links' onClick = {closeMobileMenu}>test1</Link>
          </div>
          <div className='nav-item'>
          <Link to='/test' className='nav-links' onClick = {closeMobileMenu}>test2</Link>
          </div>
          <div className='nav-item'>
          <Link to='/test' className='nav-links' onClick = {closeMobileMenu}>test3</Link>
          </div>
          <div className='nav-item'>
          <Link to='/test' className='nav-links' onClick = {closeMobileMenu}>test4</Link>
          </div>
          <div className='nav-item'>
          <Link to='/test' className='nav-links' onClick = {closeMobileMenu}>test5</Link>
          </div>
        </div>  
        
        <div className="log-item">
          <div className="log-div">
            <Link to={flink}>{button && logNick !== "" ? `${logNick}님` : "Login"}</Link>
          </div>
          <div className="log-div">
            {button && logNick !== "" ? (<span onClick={onLogout}>Logout</span>) : (<Link to="/join">join</Link>)}
          </div>
        </div>

      </div>
      </div>

    // <div className="Header">
    //   <div className="Content">
    //     <Link to={homeLink}>
    //       <FontAwesomeIcon icon={faHouse} size="2x" className="IconStyle" />
    //     </Link>
    //     <div className="Title">wadiz_it</div>
    //     <div className="Menu">
    //       <div className="Item">
    //         <Link to={flink}>{logNick !== "" ? `${logNick}님` : "Login"}</Link>
    //       </div>
    //       <div className="Item">
    //         {logNick !== "" ? (<span onClick={onLogout}>Logout</span>) : (<Link to="/join">join</Link>)}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Header;
