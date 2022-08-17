import React from 'react';
import './UsersItem.scss';
import '../../styles/container.scss';
import {User} from '../../types';

type Props = {
  user: User,
}

export const UsersItem: React.FC<Props> = ({user}) => {

  return (
    <>
      <img src={user.photo ? user.photo : '../../images/avatar.svg'} alt="user" className='usersItem__image'/>
      <p className='usersItem__text'>
        {user.name}
      </p>
      <div className="usersItem__block">
        <p className="usersItem__text">
          {user.position}
        </p>
        <p className="usersItem__text">
          {user.email}
        </p>
        <p className="usersItem__text">
          {user.phone}
        </p>
      </div>
    </>
  );
};
