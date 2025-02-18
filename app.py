import os
from flask import Flask, request, jsonify

app = Flask(__name__)

datos_sensores = {"temperatura": None, "humedad": None, "luz": None}

@app.route('/')
def home():
    return "¡Servidor Flask en Render funcionando!", 200  # Nueva ruta para evitar error 404

@app.route('/datos', methods=['POST'])
def recibir_datos():
    global datos_sensores
    datos_sensores = request.json
    print("Datos recibidos:", datos_sensores)
    return jsonify({"mensaje": "Datos recibidos correctamente"}), 200

@app.route('/datos', methods=['GET'])
def enviar_datos():
    return jsonify(datos_sensores), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Usa el puerto que Render asigna
    app.run(host='0.0.0.0', port=port, debug=True)

