import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from "react-icons/fa";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AlunoContainer, ProfilePicture, NovoAluno } from "./styled";
import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import axios from '../../services/axios';


export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = e => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map(error => error === 'Login required' ? toast.error('Você precisa fazer login!') : toast.error('Ocorreu um erro ao excluir aluno'));
      setIsLoading(false);

    };
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Cadastrar novo aluno</NovoAluno>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Images[0].url', '') ? (
                <img src={aluno.Images[0].url} alt="Foto do aluno" />
              ) : (
                <FaUserCircle size={36} />
              )}
              <span className="nome">{aluno.nome}</span>
            </ProfilePicture>

            <span>{aluno.email}</span>
            <div className="btn-grid">
              <Link to={`/aluno/${aluno.id}/edit`} className="btn">
                <FaEdit />
              </Link>

              <Link onClick={handleDeleteAsk} className="btn" to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose />
              </Link>

              <FaExclamation size={16} display="none" cursor="pointer" className="btn" onClick={e => handleDelete(e, aluno.id, index)} />
            </div>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
