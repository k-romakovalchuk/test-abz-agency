import React, {useEffect, useState} from 'react';
import './Post.scss';
import '../../styles/container.scss';
import {getToken, createUser, getPositions} from '../../api';
import {Position} from '../../types';
import classNames from 'classnames/bind';

type Props = {
  update: () => void,
}

export const Post: React.FC<Props> = ({update}) => {
  const [selectedFile, setSelectedFile] = useState('');
  const [position, setPosition] = useState<Position[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<File>();
  const [selectedRadio, setSelectedRadio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getToken()
      .then(setToken);
    getPositions()
      .then(setPosition);
  }, [])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (name && email && phone && selectedPhoto && selectedRadio) {
      const formData = new FormData();
      formData.append('position_id', selectedRadio);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('photo', selectedPhoto);
      createUser(formData, token);
      update();
      setSuccess(true);
    }
  };

  return (
    <div className='post' id='signUp'>
      <div className="container">
        <div className="post__content">
          <h1 className="post__title">
            Working with POST request
          </h1>
          {success ? (
            <div className="post__success">
              <h2 className="post__subtitle">
                User successfully registered
              </h2>
              <div className='post__image'></div>
            </div>
          ) : (
            <form className="post__form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
              className="post__input post__input--text"
              placeholder='Your name'
              minLength={2}
              maxLength={60}
            />
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
              className="post__input post__input--email" 
              placeholder='Email'
              minLength={2}
              maxLength={100}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <div className="post__blockPhone">
              <input
                type="tel"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                required
                className="post__input"
                placeholder='Phone'
                pattern= '^[\+]{0,1}380([0-9]{9})$'
              />
              <p className='post__phone'>+38 (XXX) XXX - XX - XX</p>
            </div>
            <label htmlFor="">Select your position</label>
            <div className="post__radioButtons">
              {position.map(item => (
                <p className='post__label' key={item.id}>
                  <input
                    type="radio"
                    className='post__radioButton'
                    name='position'
                    value={item.id}
                    id={item.name}
                    onChange={(event) => {
                      setSelectedRadio(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </p>
              ))}
            </div>
            <div className="post__upload">
              <div className={classNames("post__uploadBlock1", {
                "post__uploadBlock1--error": selectedFile === 'Image is invalid(image > 5MB)'
              })}>Upload</div>
              <div className={classNames("post__uploadBlock2", {
                "post__uploadBlock2--error": selectedFile === 'Image is invalid(image > 5MB)',
                "post__uploadBlock2--select": selectedFile
              })}>{selectedFile ? selectedFile : 'Upload your photo'}</div>
              <input
                type="file"
                className='post__file'
                id='file'
                required
                onChange={(e) => {
                  if(e.target.files) {
                    if (e.target.files[0].size <= 5242880){
                      setSelectedPhoto(e.target.files[0])
                      setSelectedFile(e.target.files[0].name)
                    } else {
                      setSelectedPhoto(undefined)
                      setSelectedFile('Image is invalid(image > 5MB)')
                    }
                  }

                }}
                accept=".jpg, .jpeg"
              />
            </div>
            <button type="submit" className='post__button' disabled={
              name === '' || email === '' || phone === '' || selectedRadio === '' || selectedPhoto === undefined
            }>Sign up</button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};
