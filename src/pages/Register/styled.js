import * as colors from '../../config/colors';
import { Container } from '../../styles/GlobalStyles';
import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  input{
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;

    &:focus{
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
export const DeleteButton = styled.button`
  margin-top: 10px;
  padding: 10px 78px;
`
export const FormContainer = styled(Container)`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ConfirmDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  p{
    margin: 10px 0;
    font-weight: bold;
  }
  div button:last-child{
    margin-left: 10px;
  }

  div button{
  padding: 10px 30px;
  }
  `
