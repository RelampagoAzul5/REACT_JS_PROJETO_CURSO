import styled from "styled-components";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const AlunoContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }
  div + div {
    border-top: 1px solid #eee;
  }

  .btn{
    margin-left: 15px;
  }
`;

export const ProfilePicture = styled.div`
  .nome{
    margin-left: 30px;
  }
  img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;
