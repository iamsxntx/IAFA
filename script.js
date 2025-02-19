const API_URL = "https://iafa-h9tv.onrender.com/datos";
let chart;

// Requisitos óptimos de cada cultivo
const requisitosCultivos = {
    mora: { luzMin: 6, luzMax: 8, humedadMin: 60, humedadMax: 70, tempMin: 15, tempMax: 25 },
    lulo: { luzMin: 8, luzMax: 10, humedadMin: 70, humedadMax: 80, tempMin: 15, tempMax: 20 },
    frijol: { luzMin: 6, luzMax: 8, humedadMin: 50, humedadMax: 60, tempMin: 20, tempMax: 30 },
    cafe: { luzMin: 5, luzMax: 7, humedadMin: 70, humedadMax: 80, tempMin: 18, tempMax: 24 },
    maiz: { luzMin: 10, luzMax: 12, humedadMin: 55, humedadMax: 75, tempMin: 20, tempMax: 30 },
    arveja: { luzMin: 6, luzMax: 8, humedadMin: 50, humedadMax: 70, tempMin: 15, tempMax: 20 },
    yuca: { luzMin: 8, luzMax: 10, humedadMin: 60, humedadMax: 70, tempMin: 25, tempMax: 30 },
    auyama: { luzMin: 6, luzMax: 8, humedadMin: 60, humedadMax: 70, tempMin: 20, tempMax: 25 },
    papa: { luzMin: 8, luzMax: 10, humedadMin: 70, humedadMax: 80, tempMin: 15, tempMax: 20 },
    cebolla: { luzMin: 10, luzMax: 12, humedadMin: 60, humedadMax: 70, tempMin: 15, tempMax: 20 },
    tomate: { luzMin: 8, luzMax: 10, humedadMin: 60, humedadMax: 70, tempMin: 20, tempMax: 25 },
    naranjas: { luzMin: 8, luzMax: 10, humedadMin: 50, humedadMax: 60, tempMin: 25, tempMax: 30 },
};

// Función para obtener datos del servidor
async function obtenerDatos() {
    try {
        console.log("Intentando obtener datos del servidor...");
        let response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        let datos = await response.json();
        console.log("Datos obtenidos:", datos);

        // Actualiza los valores en la página
        document.getElementById("temp").innerText = datos.temperatura + "°C";
        document.getElementById("humedad").innerText = datos.humedad + "%";
        document.getElementById("luz").innerText = datos.luz + " horas";

        // Actualiza el gráfico
        actualizarGrafico(datos);

        // Analiza el cultivo seleccionado
        analizarCultivo(datos);

    } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
    }
}

// Función para analizar el cultivo y mostrar recomendaciones
function analizarCultivo(datos) {
    const cultivo = document.getElementById("cultivo").value;
    const requisitos = requisitosCultivos[cultivo];

    let recomendaciones = [];

    if (datos.temperatura < requisitos.tempMin) {
        recomendaciones.push("Hace mucho frío para el cultivo.");
    } else if (datos.temperatura > requisitos.tempMax) {
        recomendaciones.push("Hace demasiado calor para el cultivo.");
    }

    if (datos.humedad < requisitos.humedadMin) {
        recomendaciones.push("Falta agua, regar.");
    } else if (datos.humedad > requisitos.humedadMax) {
        recomendaciones.push("Exceso de humedad, reducir riego.");
    }

    if (datos.luz < requisitos.luzMin) {
        recomendaciones.push("Poca luz, asegure más exposición solar.");
    } else if (datos.luz > requisitos.luzMax) {
        recomendaciones.push("Demasiada luz, posible estrés en la planta.");
    }

    document.getElementById("recomendacion").innerText = recomendaciones.length > 0
        ? recomendaciones.join(" ")
        : "Las condiciones son óptimas.";
}

// Función para inicializar el gráfico
function inicializarGrafico() {
    const ctx = document.getElementById("graficoCondiciones").getContext("2d");

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Luz (horas)", "Humedad (%)", "Temperatura (°C)"],
            datasets: [
                {
                    label: "Condiciones Actuales",
                    data: [0, 0, 0],
                    backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)"],
                    borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Función para actualizar los datos en el gráfico
function actualizarGrafico(datos) {
    if (chart) {
        chart.data.datasets[0].data = [datos.luz, datos.humedad, datos.temperatura];
        chart.update();
    }
}

// Inicializa el gráfico al cargar la página
document.addEventListener("DOMContentLoaded", inicializarGrafico);

// Asigna la función al botón para actualizar los datos al hacer clic
document.getElementById("actualizar").addEventListener("click", obtenerDatos);
