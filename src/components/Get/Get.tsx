import React, {useEffect, useState} from 'react';
import './Get.scss';
import '../../helpers/UsersItem/UsersItem.scss';
import '../../styles/container.scss';
import {request} from '../../api';
import {User} from '../../types';
import {UsersItem} from '../../helpers/UsersItem/UsersItem';
import classNames from 'classnames/bind';

type Props = {
  renewal: boolean,
}

export const Get: React.FC<Props> = ({renewal}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    request(`users?page=1&count=6`)
      .then(result => {
        setPage(1);
        setUsers(result.users);
        setTotalPages(result.total_pages);
      })
  }, [renewal]);

  const updateUsers = async () => {
    let usersFromServer = await request(`users?page=${page}&count=6`).then(result => result.users);
    
    setUsers(prev => [...prev, ...usersFromServer]);
    console.log(users);
  }

  return (
    <div className='get' id='users'>
      <div className="container">
        <div className="get__content">
          <h1 className="get__title">
            Working with GET request
          </h1>
          <div className="get__list">
            {users === [] && (<p className='get__preloader'></p>)}
            {users !== [] && users.map(user => (
              <div className='usersItem' key={user.id}>
                <UsersItem user={user}/>
              </div>
            ))}
          </div>
          <button className={classNames("get__button", {
            "get__button--show": page === totalPages+1,
          })} onClick={() => {
            setPage(page => page+1);
            updateUsers();
          }}>
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};
