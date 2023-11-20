document.addEventListener("DOMContentLoaded", function () {
    const minRoomTempElement = document.getElementById('minRoomTempInput');
    const maxRoomTempElement = document.getElementById('maxRoomTempInput');
    const minTempElement = document.getElementById('minTempInput');
    const maxTempElement = document.getElementById('maxTempInput');
    const heaterVariantInput = document.getElementById('heaterVariantInput');
    const heaterVariantName = document.getElementById('heaterVariantName');

    if (heaterVariant !== 0) {
        for (let i = 0; i < heaterVariantInput.options.length; i++) {
            if (heaterVariantInput.options[i].value === '0') {
                heaterVariantInput.options[i].selected = false;
            }
            if (heaterVariantInput.options[i].value == heaterVariant) {
                heaterVariantInput.options[i].selected = true;
                heaterVariantName.innerText = heaterVariantInput.options[i].innerText;
                break;
            }
        }
    } else {
        heaterVariantName.innerText = 'Typ unbekannt';
    }

    if (savedMinRoomTemp || savedMaxRoomTemp) {
        minRoomTempElement.value = savedMinRoomTemp;
        maxRoomTempElement.value = savedMaxRoomTemp;
    } else {
        minRoomTempElement.value = 15;
        maxRoomTempElement.value = 35;
    }

    if (savedMinTemp || savedMaxTemp) {
        minTempElement.value = savedMinTemp;
        maxTempElement.value = savedMaxTemp;
    } else {
        minTempElement.value = 20;
        maxTempElement.value = 80;
    }
})

function updateSettings() {
    // Raumtemperatur-Einstellbereich
    const minRoomTempElement = document.getElementById('minRoomTempInput');
    const maxRoomTempElement = document.getElementById('maxRoomTempInput');

    if (minRoomTempElement.value !== savedMinRoomTemp || maxRoomTempElement.value !== savedMaxRoomTemp) {
        localStorage.setItem("minRoomTemp", minRoomTempElement.value);
        localStorage.setItem("maxRoomTemp", maxRoomTempElement.value);
        const thermostat = new NeuThermostat(".temp", savedMinRoomTemp, savedMaxRoomTemp);
    }

    // Kesseltemperatur-Einstellbereich
    const minTempElement = document.getElementById('minTempInput');
    const maxTempElement = document.getElementById('maxTempInput');
    if (minTempElement.value !== savedMinTemp || maxTempElement.value !== savedMaxTemp) {
        localStorage.setItem("minTemp", minTempElement.value);
        localStorage.setItem("maxTemp", maxTempElement.value);

        fetch('http://127.0.0.1:5000/update_temperatures_boiler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                minTemperature: minTempElement.value,
                maxTemperature: maxTempElement.value
            })
        })
        .then(response => response.json())
        .then(values => {
            fetchPredictedValues()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}