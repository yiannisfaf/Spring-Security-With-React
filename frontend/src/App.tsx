import React, { useEffect } from 'react';
import './styles/main.scss';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <Header />
    </div>
  );
}

export default App;
