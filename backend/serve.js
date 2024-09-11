const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Rota para analisar o site
app.post('/analisar', async (req, res) => {
  try {
    const { siteName } = req.body;
    console.log(`Recebido siteName: ${siteName}`);
    
    const response = await axios.post('http://localhost:5002/analizar-site', { siteName });
    console.log('Resposta do servidor Python:', response.data);

    res.json({
      path: response.data.path,
      anomalies: response.data.anomalies,
      audioUrl: response.data.audioUrl,
      traceroute: response.data.traceroute,
      ping: response.data.ping
    });
  } catch (error) {
    console.error('Error analise de site:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Falha ao analisar site' });
  }
});

app.listen(port, () => {
  console.log(`SERVIDOR RODANDO PORTA ${port}`);
});
