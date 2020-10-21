import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiUser, FiPhone, FiCamera } from 'react-icons/fi';
import { RiCake2Line } from 'react-icons/ri';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import InputForm from '../../components/InputForm';
import Button from '../../components/Button';

import {
  Container,
  Banner,
  Content,
  Box,
  BoxContent,
  AvatarInput,
} from './styles';

interface ProfileFormData {
  nickname: string;
  birthdate: Date;
  phone: string;
  bio: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { token, updateUser, user } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nickname: Yup.string().min(2, 'No mínimo 2 dígitos'),
          birthdate: Yup.date()
            .max(new Date(), 'Você não pode nascer no futuro!')
            .nullable()
            .required('Data de nascimento é obrigatória.'),
          phone: Yup.string().min(11, 'No mínimo 11 dígitos'),
          bio: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        //* create profile user
        await api.post('/users/profile', data, {
          headers: { Authorization: `Bearer ${token}` },
        });

        addToast({
          type: 'success',
          title: 'Pefil concluido!',
          description: 'Você já pode navegar pelo dashborad!',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, token, history],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api
          .patch('/users/avatar', data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => {
            updateUser(response.data);

            addToast({
              type: 'success',
              title: 'Avatar atualizado!',
            });
          });
      }
    },
    [addToast, updateUser, token],
  );

  return (
    <Container>
      <Banner />
      <Content>
        <Box>
          <BoxContent>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Meu Perfil</h1>

              <AvatarInput>
                <img src={user.avatar_url} alt={user.name} />
                <label htmlFor="avatar">
                  <FiCamera />

                  <input
                    type="file"
                    id="avatar"
                    onChange={handleAvatarChange}
                  />
                </label>
              </AvatarInput>

              <InputForm
                name="nickname"
                type="text"
                span="Apelido"
                icon={FiUser}
                placeholder="Ex: Maia"
              />
              <InputForm
                name="birthdate"
                type="date"
                span="Data de nascimento"
                icon={RiCake2Line}
                placeholder="dd/mm/aaaa"
              />
              <InputForm
                name="phone"
                type="text"
                span="Contato"
                icon={FiPhone}
                placeholder="Ex: 15996601743"
              />
              <Button type="submit">Salvar</Button>
            </Form>
          </BoxContent>
        </Box>
      </Content>
    </Container>
  );
};

export default Profile;
