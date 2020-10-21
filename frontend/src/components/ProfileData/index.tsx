import React, { ReactFragment } from 'react';

import { Container, Flex, Avatar, Column, CakeIcon, PhoneIcon } from './styles';

interface ProfileProps {
  avatar_url: string;
  name: string;
  nickname?: string;
  email: string;
  birthdate?: Date | boolean;
  phone?: string | boolean;
  bio?: string;
  edit: ReactFragment;
}

const ProfileData: React.FC<ProfileProps> = ({
  avatar_url,
  name,
  nickname,
  email,
  birthdate,
  phone,
  bio,
  edit,
}) => {
  return (
    <Container>
      <Flex>
        <Avatar src={avatar_url} alt={name} />

        <div>
          <h1>
            {name}
            {` `}
            {nickname}
          </h1>
          <h2>{email}</h2>
        </div>
      </Flex>

      <Column>
        {bio && (
          <li>
            <span className="bio">{bio}</span>
          </li>
        )}
        {edit}
        {birthdate && (
          <li>
            <CakeIcon />
            <span>{birthdate}</span>
          </li>
        )}
        {phone && (
          <li>
            <PhoneIcon />
            <span>{phone}</span>
          </li>
        )}
      </Column>
    </Container>
  );
};

export default ProfileData;
