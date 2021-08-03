import React from "react";
import logo from './logo.svg';
import './App.css';
import VolumeMeter from './VolumeMeter';


function App() {
  const [type, setType] = React.useState('');
  const [stream, setStream] = React.useState(null);
  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((s) => {
        setStream(s);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <div className="buttons">
          <button className="button" onClick={() => setType('AudioWorkletNode')}>AudioWorkletNodeVolumeMeter</button>
          <br />
          <button className="button" onClick={() => setType('ScriptProcessorNode')}>ScriptProcessorNodeVolumeMeter</button>
        </div>
        <div className="type">
          current type: {type}
        </div>
        {type && <VolumeMeter type={type} stream={stream} max={20} style={{width: '160px', backgroundColor: '#282c34'}} />}
      </header>
    </div>
  );
}

export default App;
