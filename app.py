from flask import Flask, request, jsonify

app = Flask(_name_)

datos_sensores = {"temperatura": None, "humedad": None, "luz": None}

@app.route('/datos', methods=['POST'])
def recibir_datos():
    global datos_sensores
    datos_sensores = request.json
    print("Datos recibidos:", datos_sensores)
    return jsonify({"mensaje": "Datos recibidos correctamente"}), 200

@app.route('/datos', methods=['GET'])
def enviar_datos():
    return jsonify(datos_sensores), 200

if _name_ == '_main_':
    app.run(host='0.0.0.0', port=5000, debug=True)
