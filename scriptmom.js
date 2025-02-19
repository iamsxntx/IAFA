async function monitorearCultivo() {
    document.getElementById("monitoreoResultados").innerHTML = "<p>Monitoreo en proceso...</p>";

    try {
        console.log("Obteniendo datos del sensor...");
        const response = await fetch("https://iafa-h9tv.onrender.com/datos");

        if (!response.ok) throw new Error(`Error en la respuesta del servidor: ${response.status}`);

        const data = await response.json();
        console.log("Datos obtenidos:", data);

        // Usar los valores reales del sensor
        const temp = data.temperatura;
        const hum = data.humedad;
        const luz = data.luz;

        // Construir y mostrar la respuesta HTML con los valores reales
        document.getElementById("monitoreoResultados").innerHTML = construirRespuestaHTML(temp, hum, luz);
    } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
        document.getElementById("monitoreoResultados").innerHTML = "<p>Error al obtener datos del sensor.</p>";
    }
}

// ✅ Función para construir la respuesta HTML con los valores reales del sensor
function construirRespuestaHTML(temp, hum, luz) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Monitor de Cultivo</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; margin: 0; padding: 0; }
                .container { width: 80%; margin: auto; }
                .card { background: white; padding: 20px; margin: 15px auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); max-width: 300px; }
                h1 { color: #333; }
                .temp { border-left: 5px solid #ff5722; }
                .hum { border-left: 5px solid #03a9f4; }
                .luz { border-left: 5px solid #ffeb3b; }
            </style>
        </head>
        <body>
            <h1>🌱 Monitor de Cultivo Inteligente</h1>
            <div class="container">
                ${crearCard("🌡 Temperatura", temp, "°C", "temp")}
                ${crearCard("💧 Humedad", hum, "%", "hum")}
                ${crearCard("☀️ Luz", luz, " lux", "luz")}
            </div>
        </body>
        </html>
    `;
}

// ✅ Función para crear cada tarjeta con los datos del sensor
function crearCard(titulo, valor, unidad, clase) {
    return `
        <div class="card ${clase}">
            <h2>${titulo}</h2>
            <p>${isNaN(valor) ? "Error al leer sensor" : `${valor} ${unidad}`}</p>
        </div>
    `;
}
