import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { parse, parseISO } from 'date-fns';

import { RiProfileLine } from 'react-icons/ri';
import { AiOutlineTeam } from 'react-icons/ai';
import { RiBikeLine } from 'react-icons/ri';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth, User } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import ProfileData from '../../components/ProfileData';
import Textarea from '../../components/Textarea';
import SimpleInput from '../../components/SimpleInput';

import {
  Container,
  Tab,
  LeftSide,
  Main,
  TabContent,
  PhoneIcon,
  CakeIcon,
} from './styles';

//* -> interfaces

interface ProfileFormData {
  bio?: string;
}

interface Profile {
  id: string;
  nickname: string;
  birthdate: Date;
  phone: string;
  bio: string;
  user: User;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, token } = useAuth();
  const history = useHistory();
  const { addToast } = useToast();

  const [profile, setProfile] = useState<Profile>();
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    api
      .get('users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setProfile(response.data);
      })
      .catch(err => {
        if (err.request?.status === 404) {
          addToast({
            type: 'info',
            title: 'Perfil inconpleto',
            description: `Por favor complete alguns dados do seu perfil`,
          });
          history.push('/profile');
        }
      });
  }, [token, addToast, history]);

  //* -> on button click
  const handleButtonOnClink = useCallback(() => {
    if (isEdit === false) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [isEdit]);

  //* -> on submit
  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          bio: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.put('/users/profile', data, {
          headers: { Authorization: `Bearer ${token}` },
        });

        api
          .get('users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => {
            setProfile(response.data);
          })
          .catch(err => {
            if (err.request?.status === 404) {
              addToast({
                type: 'info',
                title: 'Perfil inconpleto',
                description: `Por favor complete alguns dados do seu perfil`,
              });
              history.push('/profile');
            }
          });

        setIsEdit(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o perfil',
          description:
            'Ocorreu um erro ao atualizar o perfil , tente novamente.',
        });
      }
    },
    [addToast, token, history],
  );

  return (
    <Container>
      <Tab className="desktop">
        <div className="wrapper">
          <span className="offset" />
          <TabContent>
            <Link to="/profile">
              <RiProfileLine />
              Perfil
            </Link>
          </TabContent>
          <TabContent>
            <Link to="/team">
              <AiOutlineTeam />
              Equipes
            </Link>
          </TabContent>
          <TabContent>
            <Link to="/bikes">
              <RiBikeLine />
              Bikes
            </Link>
          </TabContent>
        </div>

        <span className="line" />
      </Tab>

      <Main>
        <LeftSide isEdit>
          <ProfileData
            edit={
              isEdit ? (
                <button
                  className="edit"
                  type="button"
                  onClick={handleButtonOnClink}
                >
                  Editar perfil
                </button>
              ) : (
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Textarea
                    name="bio"
                    defaultValue={profile?.bio}
                    placeholder="Escreva um pouco sobre você..."
                    rows={6}
                    data-input-max-length={200}
                  />

                  <SimpleInput
                    name="birthdate"
                    icon={CakeIcon}
                    type="date"
                    defaultValue={`${profile?.birthdate}`}
                  />
                  <SimpleInput
                    name="phone"
                    icon={PhoneIcon}
                    defaultValue={profile?.phone}
                  />

                  <div className="buttons">
                    <button className="save" type="submit">
                      Salvar
                    </button>
                    <button
                      className="cancel"
                      onClick={handleButtonOnClink}
                      type="button"
                    >
                      Cancelar
                    </button>
                  </div>
                </Form>
              )
            }
            avatar_url={user.avatar_url}
            name={user.name}
            nickname={profile?.nickname}
            email={user.email}
            birthdate={isEdit && profile?.birthdate}
            phone={isEdit && profile?.phone}
            bio={profile?.bio}
          />
        </LeftSide>
      </Main>
    </Container>
  );
};

export default Dashboard;
