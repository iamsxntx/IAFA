const requisitosCultivos = {
     mora: { luminosidad: "6-8 horas", humedad_ambiente: "60-70%", humedad_suelo: "50-60%", temperatura: "15-25°C" },
    lulo: { luminosidad: "8-10 horas", humedad_ambiente: "70-80%", humedad_suelo: "60-70%", temperatura: "15-20°C" },
    frijol: { luminosidad: "6-8 horas", humedad_ambiente: "50-60%", humedad_suelo: "40-50%", temperatura: "20-30°C" },
    cafe: { luminosidad: "5-7 horas", humedad_ambiente: "70-80%", humedad_suelo: "60-70%", temperatura: "18-24°C" },
    maiz: { luminosidad: "10-12 horas", humedad_ambiente: "55-75%", humedad_suelo: "50-60%", temperatura: "20-30°C" },
    arveja: { luminosidad: "6-8 horas", humedad_ambiente: "50-70%", humedad_suelo: "40-50%", temperatura: "15-20°C" },
    yuca: { luminosidad: "8-10 horas", humedad_ambiente: "60-70%", humedad_suelo: "50-60%", temperatura: "25-30°C" },
    auyama: { luminosidad: "6-8 horas", humedad_ambiente: "60-70%", humedad_suelo: "50-60%", temperatura: "20-25°C" },
    papa: { luminosidad: "8-10 horas", humedad_ambiente: "70-80%", humedad_suelo: "60-70%", temperatura: "15-20°C" },
    cebolla: { luminosidad: "10-12 horas", humedad_ambiente: "60-70%", humedad_suelo: "50-60%", temperatura: "15-20°C" },
    tomate: { luminosidad: "8-10 horas", humedad_ambiente: "60-70%", humedad_suelo: "50-60%", temperatura: "20-25°C" },
    naranjas: { luminosidad: "8-10 horas", humedad_ambiente: "50-60%", humedad_suelo: "40-50%", temperatura: "25-30°C" },
};

let chart;

async function obtenerDatos() {
    try {
        console.log("Intentando obtener datos del servidor...");
        let response = await fetch("https://iafa-h9tv.onrender.com/datos");

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        let datos = await response.json();
        console.log("Datos obtenidos:", datos);

        console.log("Temperatura obtenida:", datos.temperatura);

        document.getElementById("temp").innerText = datos.temperatura + "°C";
        document.getElementById("humedad_ambiente").innerText = datos.humedad_ambiente + "%";
        document.getElementById("humedad_suelo").innerText = datos.humedad_suelo + "%";
        document.getElementById("luz").innerText = datos.luz;

        actualizarGrafico(datos);

    } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
    }
}

function actualizarGrafico(datos) {
    if (chart) {
        chart.data.datasets[1].data = [datos.luz, datos.humedad_ambiente, datos.humedad_suelo , datos.temperatura];
        chart.update();
    }
}

document.getElementById("actualizar").addEventListener("click", obtenerDatos);

function analizarCultivo() {
    const cultivo = document.getElementById("cultivo").value;
    const resultadosDiv = document.getElementById("resultados");

    const requisitos = requisitosCultivos[cultivo];

    resultadosDiv.innerHTML = `
        <h3>Requisitos para cultivar ${cultivo.charAt(0).toUpperCase() + cultivo.slice(1)}:</h3>
        <ul>
            <li><strong>Luminosidad:</strong> ${requisitos.luminosidad}</li>
            <li><strong>Humedad Ambiente:</strong> ${requisitos.humedad_ambiente}</li>
            <li><strong>Humedad Suelo:</strong> ${requisitos.humedad_suelo}</li>
            <li><strong>Temperatura:</strong> ${requisitos.temperatura}</li>
        </ul>
        <p>¡Verifica si las condiciones de tu suelo son adecuadas!</p>
    `;

    mostrarGrafico(requisitos);
}

async function render() {
    try {
        console.log('Intentando obtener datos del servidor...');
        const response = await fetch('https://iafa-h9tv.onrender.com/datos');
        console.log('Respuesta del servidor:', response);

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        const data = await response.json();
        console.log('Datos obtenidos:', data);

        return {
            luminosidad: data.luz,
            humedad: data.humedad_ambiente,
            humedad: data.humedad_suelo,
            temperatura: data.temperatura
        };
    } catch (error) {
        console.error('Error al obtener datos del render:', error);
        return {
            luminosidad: 0,
            humedad_ambiente: 0,
            humedad_suelo: 0,
            temperatura: 0
        };
    }
}

async function mostrarGrafico(requisitos) {
    const container = document.getElementById("graficoContainer");

    const data = await render();

    if (chart) {
        chart.destroy();
    }

    const ctx = document.createElement("canvas");
    container.innerHTML = '';
    container.appendChild(ctx);

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Luminosidad', 'Humedad Ambiente', 'Humedad de Suelo', 'Temperatura'],
            datasets: [
                {
                    label: 'Requisitos del Cultivo',
                    data: [
                        parseFloat(requisitos.luminosidad), 
                        parseInt(requisitos.humedad_ambiente),
                        parseInt(requisitos.humedad_suelo),
                        parseInt(requisitos.temperatura)
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Condiciones Actuales',
                    data: [
                        parseFloat(data.luminosidad), 
                         parseInt(data.humedad_ambiente),
                        parseInt(data.humedad_suelo),
                        parseInt(data.temperatura)
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

setInterval(obtenerDatos, 3000);

obtenerDatos();
