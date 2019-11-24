import React from 'react';
import './App.scss';
const crypto = require('crypto');

function App() {
  function c() {
    console.log(crypto.randomBytes(4).toString('hex'));
  }

  return (
    <div className="App">
      <button onClick={c}>CLICK</button>
    </div>
  );
}

export default App;
