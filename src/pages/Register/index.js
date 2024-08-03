import React, { useState } from "react";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import axios from "../../services/axios";
import { Form, DeleteButton, FormContainer, ConfirmDiv } from "./styled";
import Loading from "../../components/Loading";
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useSelector(state => state.auth.user.id);
  const nomeStored = useSelector(state => state.auth.user.nome);
  const emailStored = useSelector(state => state.auth.user.email);
  const isLoading = useSelector(state => state.auth.isLoading);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountDelete, setAccountDelete] = useState(false);

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [id, nomeStored, emailStored]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));
  }

  const handleDelete = async () => {
    try {
      if (!id) {
        toast.error('ID do usuário não encontrado.');
        return;
      }

      await axios.delete(`/users/`);
      toast.success('Usuário deletado com sucesso!');
      dispatch(actions.loginFailure());
      history.push('/');

    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      const status = get(err, 'response.status', '');
      if (status === 401) {
        toast.error('Usuário não existe');
      }
    }
  };

  const handleConfirm = e => {
    if (e.target.value === 'Yes') {
      handleDelete();
    } else {
      setAccountDelete(false);
    }
  };

  return (
    <>
      <FormContainer>
        <Loading isLoading={isLoading} />
        <Form onSubmit={handleSubmit}>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Seu Nome"
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Sua senha"
            />
          </label>
          <button type="submit">
            {id ? 'Salvar Alterações' : 'Criar minha conta'}
          </button>
        </Form>
        {isLoggedIn && (
          accountDelete ? (
            <ConfirmDiv>
              <p>Tem certeza?</p>
              <div>
                <button onClick={handleConfirm} value={'Yes'}>Sim</button>
                <button onClick={handleConfirm} value={''}>Não</button>
              </div>
            </ConfirmDiv>
          ) : (
            <DeleteButton onClick={() => setAccountDelete(true)}>Deletar Conta</DeleteButton>
          )
        )}
      </FormContainer>
    </>
  );
}
