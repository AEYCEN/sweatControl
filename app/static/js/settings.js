let minRoomTempElement;
let maxRoomTempElement;
let minTempElement;
let maxTempElement;
let heaterVariantElement;
let heaterVariantName;
let button;

document.addEventListener("DOMContentLoaded", function () {
    minRoomTempElement = document.querySelector('#minRoomTempInput');
    maxRoomTempElement = document.querySelector('#maxRoomTempInput');
    minTempElement = document.querySelector('#minTempInput');
    maxTempElement = document.querySelector('#maxTempInput');
    heaterVariantElement = document.querySelector('#heaterVariantInput');
    heaterVariantName = document.querySelector('#heaterVariantName');
    button = document.querySelector('#settingsSubmit');

    if (heaterVariant !== 0) {
        for (let i = 0; i < heaterVariantElement.options.length; i++) {
            if (heaterVariantElement.options[i].value === '0') {
                heaterVariantElement.options[i].selected = false;
            }
            if (savedHeaterVariant) {
                if (heaterVariantElement.options[i].value == savedHeaterVariant) {  // Keine 3 Gleichzeichen!
                    heaterVariantElement.options[i].selected = true;
                    heaterVariantName.innerText = heaterVariantElement.options[i].innerText;
                    break;
                }
            } else {
                if (heaterVariantElement.options[i].value == heaterVariant) {  // Keine 3 Gleichzeichen!
                    heaterVariantElement.options[i].selected = true;
                    heaterVariantName.innerText = heaterVariantElement.options[i].innerText;
                    break;
                }
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
    let changedSettings = false;
    savedMinRoomTemp = parseInt(localStorage.getItem("minRoomTemp"), 10);
    savedMaxRoomTemp = parseInt(localStorage.getItem("maxRoomTemp"), 10);
    savedMinTemp = parseInt(localStorage.getItem("minTemp"), 10);
    savedMaxTemp = parseInt(localStorage.getItem("maxTemp"), 10);
    savedHeaterVariant = parseInt(localStorage.getItem("heaterVariant"), 10);

    // Raumtemperatur-Einstellbereich
    const minRoomTemp = parseInt(minRoomTempElement.value, 10);
    const maxRoomTemp = parseInt(maxRoomTempElement.value, 10);

    if (minRoomTemp !== savedMinRoomTemp || maxRoomTemp !== savedMaxRoomTemp) {
        localStorage.setItem("minRoomTemp", minRoomTempElement.value);
        localStorage.setItem("maxRoomTemp", maxRoomTempElement.value);

        const thermostat = new NeuThermostat(".temp", savedMinRoomTemp, savedMaxRoomTemp);
        changedSettings = true;
    }

    // Kesseltemperatur-Einstellbereich und Heizungstyp ändern
    const minTemp = parseInt(minTempElement.value, 10);
    const maxTemp = parseInt(maxTempElement.value, 10);
    const heaterVariantElement = document.querySelector('#heaterVariantInput');
    const heaterVariant = parseInt(heaterVariantElement.value, 10);

    if (minTemp !== savedMinTemp || maxTemp !== savedMaxTemp || heaterVariant !== savedHeaterVariant) {
        localStorage.setItem("minTemp", minTempElement.value);
        localStorage.setItem("maxTemp", maxTempElement.value);
        localStorage.setItem("heaterVariant", heaterVariantElement.value);
        heaterVariantName.innerText = heaterVariantElement.selectedOptions[0].innerText

        fetch('/update_temperatures_boiler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                minTemperature: minTemp,
                maxTemperature: maxTemp,
                heaterVariant: heaterVariant
            })
        })
        .then(response => response.json())
        .then(values => {
            fetchPredictedValues()
            console.log(values);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
        changedSettings = true;
    }

    if (changedSettings === true) {
        showSuccessToast();
    } else {
        showErrorToast('nochange');
    }
}

function showSuccessToast() {
    if (!button) return;

    button.classList.add('buttonSuccess');
    const span = button.querySelector('span');
    if (span) {
        span.innerText = '✔ Erfolgreich geändert';
    }

    setTimeout(function () {
        button.classList.remove('buttonSuccess');
        if (span) {
            span.innerText = 'Änderungen übernehmen';
        }
    }, TOAST_TIMEOUT);
}

function showErrorToast(type) {
    if (!button) return;

    button.classList.toggle('buttonError');
    const span = button.querySelector('span');
    if (span) {
        switch (type) {
            case 'nochange':
                span.innerText = '✘ Keine Änderungen!';
                break;
            case 'wronginput':
                span.innerText = '✘  Fehlerhafte Eingabe!';
                break;
        }
    }

    setTimeout(function () {
        button.classList.toggle('buttonError');
        if (span) {
            span.innerText = 'Änderungen übernehmen';
        }
    }, TOAST_TIMEOUT);
}

const TOAST_TIMEOUT = 2500;