import React, { useState } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: "Carregando!",
        html: "Por favor, aguarde enquanto o site está sendo analisado...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post('http://localhost:3001/analisar', { siteName });

      setPath(response.data.path);
      setAnomalies(response.data.anomalies);
      setAudio(response.data.audioUrl);
      setTraceroute(response.data.traceroute);
      setPing(response.data.ping);

      Swal.close();
    } catch (error) {
      console.error('Error analyzing site:', error);
    }

    setLoading(false);
  };

  return (
    <div style={{
      backgroundImage: 'url(img/imagem01.gif)',
      backgroundSize: 'cover',
      minHeight: '100vh', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Net.Eye
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
        flexGrow: 1,
      }}>
        <div style={{
          backgroundColor: 'white',
          width: '450px',
          borderRadius: '25px',
          padding: '25px',  // Ajustei o padding para aumentar o espaçamento interno
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Adicionei uma sombra para destacar a caixa
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Net.Eye</h1>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Coloque o nome do site"
              style={{
                width: '100%',  // O input agora ocupa toda a largura do container
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginBottom: '10px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
              {loading ? 'Analisando...' : 'Analisar'}
            </button>
          </div>

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
      </div>
    </div>
  );
}

export default App;
