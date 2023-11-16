document.addEventListener("DOMContentLoaded", function () {
    const minRoomTempElement = document.getElementById('minRoomTempInput');
    const maxRoomTempElement = document.getElementById('maxRoomTempInput');
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
}