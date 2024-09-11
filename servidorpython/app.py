from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from gtts import gTTS
import subprocess
import os

app = Flask(__name__)
CORS(app)  

@app.route('/analizar-site', methods=['POST'])
def analyze_site():
    data = request.get_json()
    site_name = data.get('siteName')
    print(f'Recebido siteName: {site_name}')

    # Executa traceroute e ping
    traceroute_output = run_command(['tracert', site_name])  # Para Windows
    ping_output = run_command(['ping', site_name, '-n', '4'])  # Para Windows

    print('Traceroute output:', traceroute_output)
    print('Ping output:', ping_output)

    # Simulação de análise do site
    path = f'/path/to/{site_name}'
    anomalies = []

    # Gera o áudio com a resposta
    if site_name:
        audio_url = generate_audio('Análise concluída com sucesso. Está OK.')
    else:
        anomalies.append('Nome do site não fornecido.')
        audio_url = generate_audio('Falha na análise. Nome do site não fornecido.')

    return jsonify({
        'path': path,
        'anomalies': anomalies,
        'audioUrl': audio_url,
        'traceroute': traceroute_output,
        'ping': ping_output
    })

def run_command(command):
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return e.output

def generate_audio(message):
    audio_file = 'response.mp3'
    tts = gTTS(text=message, lang='pt')
    tts.save(audio_file)
    return f'http://localhost:5002/{audio_file}'

@app.route('/response.mp3')
def get_audio():
    return send_from_directory('.', 'response.mp3')

if __name__ == '__main__':
    app.run(port=5002, debug=True)
