const apiEndpoint = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'a6c70ff6ee453d0222a396af6c64552f';

const ubicacionInput = document.getElementById('ubicacion');
const paisSelect = document.getElementById('pais');
const departamentoSelect = document.getElementById('departamento');
const buscarClimaButton = document.getElementById('buscar-clima');
const climaActualDiv = document.getElementById('clima-actual');

const departamentos = {
    CO: ['Antioquia', 'Cundinamarca', 'Valle del Cauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'],
    PE: ['Lima', 'Arequipa', 'Cusco', 'Amazonas', 'Áncash', 'Apurímac', 'Ayacucho', 'Cajamarca', 'Callao', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'],
    EC: ['Pichincha', 'Guayas', 'Manabí', 'Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi', 'El Oro', 'Esmeraldas', 'Galápagos', 'Imbabura', 'Loja', 'Los Ríos', 'Morona Santiago', 'Napo', 'Orellana', 'Pastaza', 'Santa Elena', 'Santo Domingo de los Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora Chinchipe'],
    MX: ['Ciudad de México', 'Jalisco', 'Nuevo León', 'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Michoacán', 'Morelos', 'Nayarit', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
    ES: ['Madrid', 'Cataluña', 'Andalucía', 'Aragón', 'Asturias', 'Baleares', 'Canarias', 'Cantabria', 'Castilla y León', 'Castilla-La Mancha', 'Extremadura', 'Galicia', 'La Rioja', 'Murcia', 'Navarra', 'País Vasco', 'Valencia'],
    BO: ['La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 'Tarija', 'Chuquisaca', 'Beni', 'Pando']
};

paisSelect.addEventListener('change', function() {
    const pais = this.value;
    departamentoSelect.innerHTML = '<option value="">Seleccione un departamento</option>';

    if (departamentos[pais]) {
        departamentos[pais].forEach(function(departamento) {
            const option = document.createElement('option');
            option.value = departamento;
            option.textContent = departamento;
            departamentoSelect.appendChild(option);
        });
    }
});

buscarClimaButton.addEventListener('click', buscarClima);

function buscarClima() {
    const ubicacion = ubicacionInput.value.trim();
    const pais = paisSelect.value;
    const departamento = departamentoSelect.value;
    
    if (!ubicacion) {
        climaActualDiv.innerHTML = '<p class="error-msg">Por favor, ingresa una ciudad válida.</p>';
        return;
    }

    climaActualDiv.innerHTML = '<p class="loading">Cargando...</p>';
    document.getElementById("pronostico").innerHTML = ""; // Limpia el pronóstico anterior

    const urlClima = `${apiEndpoint}weather?q=${ubicacion},${departamento},${pais}&units=metric&appid=${apiKey}&lang=es`;
    const urlForecast = `${apiEndpoint}forecast?q=${ubicacion},${departamento},${pais}&units=metric&appid=${apiKey}&lang=es`;

    fetch(urlClima)
        .then(response => {
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return response.json();
        })
        .then(data => {
            mostrarClimaActual(data);
            actualizarReloj(data.timezone);
        })
        .catch(error => {
            climaActualDiv.innerHTML = '<p class="error-msg">No se pudo obtener la información del clima.</p>';
            console.error(error);
        });

    fetch(urlForecast)
        .then(response => {
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return response.json();
        })
        .then(data => obtenerPrediccion(data))
        .catch(error => console.error("Error obteniendo el pronóstico:", error));
}

function mostrarClimaActual(data) {
    if (data.cod !== 200) {
        climaActualDiv.innerHTML = `<p class="error-msg">Error: ${data.message}</p>`;
        return;
    }

    document.getElementById("ciudad").innerText = `${data.name}, ${data.sys.country}`;

    const timestamp = data.dt * 1000;
    const fecha = new Date(timestamp);
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const diaSemana = diasSemana[fecha.getDay()];

    const temperatura = data.main.temp;
    const humedad = data.main.humidity;
    const condiciones = data.weather[0].description;
    const icono = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${icono}.png`;

    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString("es-ES");
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString("es-ES");
    const viento = data.wind.speed;

    climaActualDiv.innerHTML = `
        <div class="weather-card">
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>📅 Día: <strong>${diaSemana}</strong></p>
            <img src="${iconUrl}" alt="${condiciones}">
            <p class="temp">${temperatura}°C</p>
            <p>🐳 Humedad: ${humedad}%</p>
            <p>💨 Viento: <strong>${viento} m/s</strong></p>
            <p>🌅 Amanecer: <strong>${sunriseTime}</strong></p>
            <p>🌄 Atardecer: <strong>${sunsetTime}</strong></p>
            <p class="desc">${condiciones.charAt(0).toUpperCase() + condiciones.slice(1)}</p>
            <p id="reloj">🕒 Cargando hora...</p>
        </div>
    `;
}

function obtenerPrediccion(data) {
    let pronosticoPorDia = {};

    data.list.forEach(item => {
        const fecha = new Date(item.dt * 1000);
        const dia = fecha.toLocaleDateString("es-ES", { weekday: "long" });

        if (!pronosticoPorDia[dia]) {
            pronosticoPorDia[dia] = {
                min: item.main.temp,
                max: item.main.temp,
                icono: item.weather[0].icon,
                descripcion: item.weather[0].description
            };
        } else {
            pronosticoPorDia[dia].min = Math.min(pronosticoPorDia[dia].min, item.main.temp);
            pronosticoPorDia[dia].max = Math.max(pronosticoPorDia[dia].max, item.main.temp);
        }
    });

    mostrarPrediccion(pronosticoPorDia);
}

function mostrarPrediccion(pronostico) {
    let html = "<h3>Pronóstico para los próximos días:</h3><div class='forecast-container'>";

    Object.keys(pronostico).forEach(dia => {
        const { min, max, icono, descripcion } = pronostico[dia];
        const iconUrl = `http://openweathermap.org/img/w/${icono}.png`;

        html += `
            <div class="forecast-card">
                <h4>${dia}</h4>
                <img src="${iconUrl}" alt="${descripcion}">
                <p>${descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}</p>
                <p>🌡️ ${min.toFixed(1)}°C - ${max.toFixed(1)}°C</p>
            </div>
        `;
    });

    html += "</div>";
    document.getElementById("pronostico").innerHTML = html;
}

function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const url = `${apiEndpoint}weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=es`;
            
            fetch(url)
                .then(res => res.json())
                .then(data => mostrarClimaActual(data))
                .catch(err => console.error("Error obteniendo ubicación:", err));
        });
    } else {
        alert("Tu navegador no admite geolocalización.");
    }
}

function actualizarReloj(timezone) {
    function mostrarHora() {
        const ahora = new Date();
        const utc = ahora.getTime() + ahora.getTimezoneOffset() * 60000;
        const horaLocal = new Date(utc + (timezone * 1000));
        document.getElementById("reloj").innerText = `🕒 Hora local: ${horaLocal.toLocaleTimeString()}`;
    }
    mostrarHora();
    setInterval(mostrarHora, 1000);
}