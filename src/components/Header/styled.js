import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Nav = styled.nav`
    background-color: ${primaryColor};
    padding: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    a{
        color: #fff;
        margin: 0 10px 0 0;
        font-weight: bold;

        height: 50%;

      }
      p{
        color: #fff;
        margin-left: 10px;
        font-size: 20px;
      }
      .user{
        display: flex;
        font-size: 30px;
        align-items: center;
        justify-content: start;
        width: 17%;
      }

      .login{
      font-size: 35px;
      display: flex;
      align-items: center;
    }
    .logout{
      font-size: 30px;
      display: flex;
      align-items: center;
      }
    .home{
      font-size: 35px;
      display: flex;
      align-items: center;
    }
    div{
      width: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
    }

`
