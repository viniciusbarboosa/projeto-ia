import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [siteName, setSiteName] = useState('');
  const [path, setPath] = useState('');
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const [traceroute, setTraceroute] = useState('');
  const [ping, setPing] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/analisar', { siteName });
      setPath(response.data.path);
      setAnomalies(response.data.anomalies);
      setAudio(response.data.audioUrl);
      setTraceroute(response.data.traceroute);
      setPing(response.data.ping);
    } catch (error) {
      console.error('Error analyzing site:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>V anaalises</h1>
      <input
        type="text"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
        placeholder="COloque o nome do site"
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Analise...' : 'Analisar'}
      </button>
      <div>
        <h2>Path:</h2>
        <p>{path}</p>
      </div>
      <div>
        <h2>Anomalias:</h2>
        <ul>
          {anomalies.map((anomaly, index) => (
            <li key={index}>{anomaly}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Traceroute:</h2>
        <pre>{traceroute}</pre>
      </div>
      <div>
        <h2>Ping:</h2>
        <pre>{ping}</pre>
      </div>
      {audio && <audio controls src={audio}></audio>}
    </div>
  );
}

export default App;
