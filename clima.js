const apiEndpoint = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'a6c70ff6ee453d0222a396af6c64552f';

const ubicacionInput = document.getElementById('ubicacion');
const paisSelect = document.getElementById('pais');
const departamentoSelect = document.getElementById('departamento');
const buscarClimaButton = document.getElementById('buscar-clima');
const climaActualDiv = document.getElementById('clima-actual');

const departamentos = {
    CO: [
        { nombre: 'Antioquia', ciudad: 'Medellín' },
        { nombre: 'Cundinamarca', ciudad: 'Bogotá' },
        { nombre: 'Valle del Cauca', ciudad: 'Cali' },
        { nombre: 'Atlántico', ciudad: 'Barranquilla' },
        { nombre: 'Bolívar', ciudad: 'Cartagena' },
        { nombre: 'Boyacá', ciudad: 'Tunja' },
        { nombre: 'Caldas', ciudad: 'Manizales' },
        { nombre: 'Caquetá', ciudad: 'Florencia' },
        { nombre: 'Casanare', ciudad: 'Yopal' },
        { nombre: 'Cauca', ciudad: 'Popayán' },
        { nombre: 'Cesar', ciudad: 'Valledupar' },
        { nombre: 'Chocó', ciudad: 'Quibdó' },
        { nombre: 'Córdoba', ciudad: 'Montería' },
        { nombre: 'Guainía', ciudad: 'Inírida' },
        { nombre: 'Guaviare', ciudad: 'San José del Guaviare' },
        { nombre: 'Huila', ciudad: 'Neiva' },
        { nombre: 'La Guajira', ciudad: 'Riohacha' },
        { nombre: 'Magdalena', ciudad: 'Santa Marta' },
        { nombre: 'Meta', ciudad: 'Villavicencio' },
        { nombre: 'Nariño', ciudad: 'Pasto' },
        { nombre: 'Norte de Santander', ciudad: 'Cúcuta' },
        { nombre: 'Putumayo', ciudad: 'Mocoa' },
        { nombre: 'Quindío', ciudad: 'Armenia' },
        { nombre: 'Risaralda', ciudad: 'Pereira' },
        { nombre: 'San Andrés y Providencia', ciudad: 'San Andrés' },
        { nombre: 'Santander', ciudad: 'Bucaramanga' },
        { nombre: 'Sucre', ciudad: 'Sincelejo' },
        { nombre: 'Tolima', ciudad: 'Ibagué' },
        { nombre: 'Valle del Cauca', ciudad: 'Cali' },
        { nombre: 'Vaupés', ciudad: 'Mitú' },
        { nombre: 'Vichada', ciudad: 'Puerto Carreño' }
    ],
    PE: [
        { nombre: 'Lima', ciudad: 'Lima' },
        { nombre: 'Arequipa', ciudad: 'Arequipa' },
        { nombre: 'Cusco', ciudad: 'Cusco' },
        { nombre: 'Amazonas', ciudad: 'Chachapoyas' },
        { nombre: 'Áncash', ciudad: 'Huaraz' },
        { nombre: 'Apurímac', ciudad: 'Abancay' },
        { nombre: 'Ayacucho', ciudad: 'Ayacucho' },
        { nombre: 'Cajamarca', ciudad: 'Cajamarca' },
        { nombre: 'Callao', ciudad: 'Callao' },
        { nombre: 'Huancavelica', ciudad: 'Huancavelica' },
        { nombre: 'Huánuco', ciudad: 'Huánuco' },
        { nombre: 'Ica', ciudad: 'Ica' },
        { nombre: 'Junín', ciudad: 'Huancayo' },
        { nombre: 'La Libertad', ciudad: 'Trujillo' },
        { nombre: 'Lambayeque', ciudad: 'Chiclayo' },
        { nombre: 'Loreto', ciudad: 'Iquitos' },
        { nombre: 'Madre de Dios', ciudad: 'Puerto Maldonado' },
        { nombre: 'Moquegua', ciudad: 'Moquegua' },
        { nombre: 'Pasco', ciudad: 'Cerro de Pasco' },
        { nombre: 'Piura', ciudad: 'Piura' },
        { nombre: 'Puno', ciudad: 'Puno' },
        { nombre: 'San Martín', ciudad: 'Moyobamba' },
        { nombre: 'Tacna', ciudad: 'Tacna' },
        { nombre: 'Tumbes', ciudad: 'Tumbes' },
        { nombre: 'Ucayali', ciudad: 'Pucallpa' }
    ],
    EC: [
        { nombre: 'Pichincha', ciudad: 'Quito' },
        { nombre: 'Guayas', ciudad: 'Guayaquil' },
        { nombre: 'Manabí', ciudad: 'Portoviejo' },
        { nombre: 'Azuay', ciudad: 'Cuenca' },
        { nombre: 'Bolívar', ciudad: 'Guaranda' },
        { nombre: 'Cañar', ciudad: 'Azogues' },
        { nombre: 'Carchi', ciudad: 'Tulcán' },
        { nombre: 'Chimborazo', ciudad: 'Riobamba' },
        { nombre: 'Cotopaxi', ciudad: 'Latacunga' },
        { nombre: 'El Oro', ciudad: 'Machala' },
        { nombre: 'Esmeraldas', ciudad: 'Esmeraldas' },
        { nombre: 'Galápagos', ciudad: 'Puerto Baquerizo Moreno' },
        { nombre: 'Imbabura', ciudad: 'Ibarra' },
        { nombre: 'Loja', ciudad: 'Loja' },
        { nombre: 'Los Ríos', ciudad: 'Babahoyo' },
        { nombre: 'Morona Santiago', ciudad: 'Macas' },
        { nombre: 'Napo', ciudad: 'Tena' },
        { nombre: 'Orellana', ciudad: 'Francisco de Orellana' },
        { nombre: 'Pastaza', ciudad: 'Puyo' },
        { nombre: 'Santa Elena', ciudad: 'La Libertad' },
        { nombre: 'Santo Domingo de los Tsáchilas', ciudad: 'Santo Domingo' },
        { nombre: 'Sucumbíos', ciudad: 'Nueva Loja' },
        { nombre: 'Tungurahua', ciudad: 'Ambato' },
        { nombre: 'Zamora Chinchipe', ciudad: 'Zamora' }
    ],
    MX: [
        { nombre: 'Ciudad de México', ciudad: 'Ciudad de México' },
        { nombre: 'Jalisco', ciudad: 'Guadalajara' },
        { nombre: 'Nuevo León', ciudad: 'Monterrey' },
        { nombre: 'Aguascalientes', ciudad: 'Aguascalientes' },
        { nombre: 'Baja California', ciudad: 'Mexicali' },
        { nombre: 'Baja California Sur', ciudad: 'La Paz' },
        { nombre: 'Campeche', ciudad: 'San Francisco de Campeche' },
        { nombre: 'Chiapas', ciudad: 'Tuxtla Gutiérrez' },
        { nombre: 'Chihuahua', ciudad: 'Chihuahua' },
        { nombre: 'Coahuila', ciudad: 'Saltillo' },
        { nombre: 'Colima', ciudad: 'Colima' },
        { nombre: 'Durango', ciudad: 'Durango' },
        { nombre: 'Estado de México', ciudad: 'Toluca' },
        { nombre: 'Guanajuato', ciudad: 'Guanajuato' },
        { nombre: 'Guerrero', ciudad: 'Chilpancingo' },
        { nombre: 'Hidalgo', ciudad: 'Pachuca' },
        { nombre: 'Michoacán', ciudad: 'Morelia' },
        { nombre: 'Morelos', ciudad: 'Cuernavaca' },
        { nombre: 'Nayarit', ciudad: 'Tepic' },
        { nombre: 'Oaxaca', ciudad: 'Oaxaca' },
        { nombre: 'Puebla', ciudad: 'Puebla' },
        { nombre: 'Querétaro', ciudad: 'Querétaro' },
        { nombre: 'Quintana Roo', ciudad: 'Chetumal' },
        { nombre: 'San Luis Potosí', ciudad: 'San Luis Potosí' },
        { nombre: 'Sinaloa', ciudad: 'Culiacán' },
        { nombre: 'Sonora', ciudad: 'Hermosillo' },
        { nombre: 'Tabasco', ciudad: 'Villahermosa' },
        { nombre: 'Tamaulipas', ciudad: 'Ciudad Victoria' },
        { nombre: 'Tlaxcala', ciudad: 'Tlaxcala' },
        { nombre: 'Veracruz', ciudad: 'Xalapa' },
        { nombre: 'Yucatán', ciudad: 'Mérida' },
        { nombre: 'Zacatecas', ciudad: 'Zacatecas' }
    ],
    ES: [
        { nombre: 'Madrid', ciudad: 'Madrid' },
        { nombre: 'Cataluña', ciudad: 'Barcelona' },
        { nombre: 'Andalucía', ciudad: 'Sevilla' },
        { nombre: 'Aragón', ciudad: 'Zaragoza' },
        { nombre: 'Asturias', ciudad: 'Oviedo' },
        { nombre: 'Baleares', ciudad: 'Palma' },
        { nombre: 'Canarias', ciudad: 'Las Palmas' },
        { nombre: 'Cantabria', ciudad: 'Santander' },
        { nombre: 'Castilla y León', ciudad: 'Valladolid' },
        { nombre: 'Castilla-La Mancha', ciudad: 'Toledo' },
        { nombre: 'Extremadura', ciudad: 'Mérida' },
        { nombre: 'Galicia', ciudad: 'Santiago de Compostela' },
        { nombre: 'La Rioja', ciudad: 'Logroño' },
        { nombre: 'Murcia', ciudad: 'Murcia' },
        { nombre: 'Navarra', ciudad: 'Pamplona' },
        { nombre: 'País Vasco', ciudad: 'Vitoria' },
        { nombre: 'Valencia', ciudad: 'Valencia' }
    ],
    BO: [
        { nombre: 'La Paz', ciudad: 'La Paz' },
        { nombre: 'Cochabamba', ciudad: 'Cochabamba' },
        { nombre: 'Santa Cruz', ciudad: 'Santa Cruz' },
        { nombre: 'Oruro', ciudad: 'Oruro' },
        { nombre: 'Potosí', ciudad: 'Potosí' },
        { nombre: 'Tarija', ciudad: 'Tarija' },
        { nombre: 'Chuquisaca', ciudad: 'Sucre' },
        { nombre: 'Beni', ciudad: 'Trinidad' },
        { nombre: 'Pando', ciudad: 'Cobija' }
    ]
};

paisSelect.addEventListener('change', function() {
    const pais = this.value;
    departamentoSelect.innerHTML = '<option value="">Seleccione un departamento</option>';

    if (departamentos[pais]) {
        departamentos[pais].forEach(function(departamento) {
            const option = document.createElement('option');
            option.value = departamento.nombre;
            option.textContent = `${departamento.nombre} (${departamento.ciudad})`;
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

    const departamentoData = departamentos[pais].find(d => d.nombre === departamento);
    const ciudad = departamentoData ? departamentoData.ciudad : '';

    const urlClima = `${apiEndpoint}weather?q=${ubicacion},${ciudad},${pais}&units=metric&appid=${apiKey}&lang=es`;
    const urlForecast = `${apiEndpoint}forecast?q=${ubicacion},${ciudad},${pais}&units=metric&appid=${apiKey}&lang=es`;

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