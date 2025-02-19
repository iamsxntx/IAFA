async function mostrarGrafico(requisitos) {
    const container = document.getElementById('graficoContainer');

    const oldCanvas = document.getElementById('graficoCondiciones');
    if (oldCanvas) {
        oldCanvas.remove();
    }

    const nuevoCanvas = document.createElement('canvas');
    nuevoCanvas.id = 'graficoCondiciones';
    nuevoCanvas.width = 500;
    nuevoCanvas.height = 300;
    container.appendChild(nuevoCanvas);

    const ctx = nuevoCanvas.getContext('2d');

    if (chart) {
        chart.destroy();
    }

    try {
        // 📌 Hacer la petición a Flask para obtener los datos del ESP32
        const response = await fetch('http://192.168.0.20:5000/datos'); // Reemplaza con la IP de tu PC
        const datos = await response.json();

        // 📌 Convertir los valores de luz a horas si es necesario
        let horasLuz = datos.luz / 1000; // Ajusta esta conversión según tus sensores

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Luminosidad (h)', 'Humedad (%)', 'Temperatura (°C)'],
                datasets: [
                    {
                        label: 'Requisitos óptimos',
                        data: [
                            parseFloat(requisitos.luminosidad.split('-')[0]),
                            parseFloat(requisitos.humedad.split('-')[0]),
                            parseFloat(requisitos.temperatura.split('-')[0])
                        ],
                        backgroundColor: 'rgba(76, 175, 80, 0.8)',
                        borderColor: 'rgba(76, 175, 80, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Condiciones actuales',
                        data: [horasLuz, datos.humedad, datos.temperatura], // Ahora usa datos reales
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: "#000",
                            font: { size: 14 }
                        }
                    },
                    x: {
                        ticks: {
                            color: "#000",
                            font: { size: 14 }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error al obtener datos:", error);
        alert("No se pudieron obtener los datos del ESP32.");
    }
}
