import React, {useState} from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Test } from './components/Test/Test';
import { Post } from './components/Post/Post';
import './styles/_utils.scss';
import {Get} from './components/Get/Get';

function App() {
  const [reload, setReload] = useState(false);
  return (
    <>
      <Header />
      <Test />
      <Get renewal={reload}/>
      <Post update={() => setReload(prev => !prev)}/>
    </>
  );
}

export default App;