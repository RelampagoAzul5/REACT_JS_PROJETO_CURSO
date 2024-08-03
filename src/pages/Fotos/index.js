import React, { useState, useEffect } from "react";
import { get } from "lodash";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import Loading from '../../components/Loading';
import { Title, Form } from "./styled";
import axios from '../../services/axios';
import history from '../../services/history';
import { toast } from "react-toastify";
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '')
  const [isLoading, setIsloading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Images[0].url', ''))
        setIsloading(false);

      } catch (err) {
        toast.error('Ocorreu um erro ao obter imagem');
        setIsloading(false);
        history.push('/');
      };
    }
    getData();
  }, [])

  const handleChange = async e => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);
    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('Image', file);

    try {
      setIsloading(true);
      await axios.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      toast.success('Foto enviada com sucesso!');
      setIsloading(false);
    } catch (err) {
      setIsloading(false);

      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto.');
      if (status === 401) dispatch(actions.loginFailure());
    }
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto"></img> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>

      </Form>
    </Container>
  )
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired
}
