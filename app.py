import os
from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  # Habilita CORS en toda la app
socketio = SocketIO(app, cors_allowed_origins="*")

datos_sensores = {"temperatura": None, "humedad_ambiente": None, "humedad_suelo": None, "luz": None}

@app.route('/')
def home():
    return "¡Servidor Flask con WebSockets funcionando!", 200

@app.route('/datos', methods=['POST'])
def recibir_datos():
    global datos_sensores
    datos_sensores = request.json
    print("Datos recibidos:", datos_sensores)
    
    socketio.emit('actualizar_datos', datos_sensores)
    
    return jsonify({"mensaje": "Datos recibidos correctamente"}), 200

@app.route('/datos', methods=['GET'])
def enviar_datos():
    return jsonify(datos_sensores), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, host='0.0.0.0', port=port, debug=True)
