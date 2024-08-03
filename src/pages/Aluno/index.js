import React, { useState, useEffect } from "react";
import { get } from "lodash";
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from "validator";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaEdit, FaUserCircle } from "react-icons/fa";

import { Form, FormContainer, ProfilePicture } from "./styled";
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Link } from "react-router-dom/cjs/react-router-dom.min";


export default function Aluno({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Images[0].url', '');


        setIsLoading(false);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setFoto(Foto);

      } catch (err) {
        setIsLoading(false);

        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);
        if (status === 400) errors.map(error => toast.error(error));
        history.push('/');
      };

    }
    getData();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    };
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
    };
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    };
    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('Idade inválida');
    };
    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error('Peso inválido');
    };
    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error('Altura inválida');
    };
    if (formErrors) return;
    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura
        });
        toast.success('Aluno(a) cadastrado(a) com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map(error => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
      if (status === 401) dispatch(actions.loginFailure());
    }
  };
  return (
    <>
      <Loading isLoading={isLoading} />
      <FormContainer>
        <h1>{id ? 'Editar Aluno' : 'Cadastrar Aluno'}</h1>

        {id && (
          <ProfilePicture>
            {foto ? (<img src={foto} alt={`Foto de ${nome}`} />) : (<FaUserCircle size={180} />)}
            <Link to={`/fotos/${id}`} >
              <FaEdit size={24} />
            </Link>

          </ProfilePicture>
        )}


        <Form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do Aluno" id="nome"></input>

          <label htmlFor="sobrenome">Sobrenome:</label>
          <input type="text" value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder="Sobrenome do Aluno" id="sobrenome"></input>

          <label htmlFor="email">E-mail:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email do Aluno" id="email"></input>

          <label htmlFor="idade">Idade:</label>
          <input type="number" value={idade} onChange={e => setIdade(e.target.value)} placeholder="Idade do Aluno" id="idade"></input>

          <label htmlFor="peso">Peso:</label>
          <input type="text" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso do Aluno" id="peso"></input>

          <label htmlFor="altura">Altura:</label>
          <input type="text" value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura do Aluno" id="Altura"></input>

          <button type="submit">{id ? 'Salvar Alterações' : 'Cadastrar Aluno'}</button>
        </Form>

      </FormContainer>
    </>
  )
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired
}
