import styled from "styled-components";

export const Form = styled.form`
 width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 18px;
  }
`
