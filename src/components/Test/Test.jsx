import React from 'react';
import './Test.scss';
import '../../styles/container.scss';

export const Test = () => {

  return (
    <article className="test">
      <div className="container">
        <div className="test__content">
          <h1 className="test__title">
            Test assignment for front-end developer
          </h1>
          <div className="test__text">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </div>
          <a href="#signUp">
            <button className="test__button">Sign up</button>
          </a>
        </div>
      </div>
    </article>
  );
};