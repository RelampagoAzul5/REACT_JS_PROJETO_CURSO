import styled from "styled-components";
import { Container } from "../../styles/GlobalStyles";
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  input{
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
    width: 100%;
    font-size: 20px;
  }

  label{
    font-size: 25px;
    margin-bottom: 10px;
  }
`
export const FormContainer = styled(Container)`
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;
  margin-bottom: 10px;
  img{
    width: 180px;
    height: 170px;
    border-radius: 50%;
  }
  a{
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    padding-left: 5px;
    border-radius: 50%;
    color: #fff;
  }
`;
