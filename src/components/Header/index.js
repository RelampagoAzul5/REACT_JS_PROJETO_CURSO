import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt, FaPowerOff } from 'react-icons/fa'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Nav } from './styled';
import * as actions from '../../store/modules/auth/actions'
import history from "../../services/history";

export default function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const userName = useSelector(state => state.auth.user.nome);
  const dispatch = useDispatch();

  const handleLogout = e => {
    e.preventDefault()
    dispatch(actions.loginFailure());
    history.push('/');
  }

  return <Nav>
    <Link className="user" to="/register">
      <FaUserAlt />
      {isLoggedIn ? <p color="#fff">{userName}</p> : <p>Crie sua conta</p>}
    </Link>
    <div>
      <Link className="home" to="/">
        <FaHome />
      </Link>
      {!isLoggedIn ? (
        <Link className="login" to="/login">
          <FaSignInAlt />
          <p>Login</p>
        </Link>
      ) : (
        <Link onClick={handleLogout} className="logout" to="/logout">
          <FaPowerOff />
          <p>Logout</p>
        </Link>

      )
      }
    </div>

  </Nav>
};
