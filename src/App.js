import React from 'react';
import './App.css';
import MainForm from './form-components/MainForm'; 

function App() {
 return (
    <div className="App">
      <header className="App-header">
        <h1>Patient Registry</h1>
      </header>
      <main>
        <MainForm /> 
      </main>
    </div>
 );
}

export default App;
