document.addEventListener("DOMContentLoaded", function () {
    const minTempInput = document.getElementById('minTempInput');
    const maxTempInput = document.getElementById('maxTempInput');
    const heaterTempElement = document.getElementById('heaterTemperature'); // Hier musst du das entsprechende Element in deinem HTML finden

    minTempInput.addEventListener('change', sendUpdateRequest);
    maxTempInput.addEventListener('change', sendUpdateRequest);

    function sendUpdateRequest() {
        const minTemp = minTempInput.value;
        const maxTemp = maxTempInput.value;

        fetch('/update_heater_temperature', {
            method: 'POST',
            body: new URLSearchParams({ min_temp, max_temp }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => response.json())
        .then(data => {
            // Hier kannst du die erhaltenen Daten verwenden, um das Frontend zu aktualisieren
            // data enthält die aktualisierte Kesseltemperatur
            heaterTempElement.textContent = data.updatedHeaterTemperature; // Annahme: Daten aus der JSON-Antwort
        })
        .catch(error => {
            console.error('Fehler bei der Aktualisierung:', error);
        });
    }





    const canvas = document.getElementById('sc-chart');
    const ctx = canvas.getContext('2d');
    const data = {
        x: [20,19,18,17,16,15,14,13,12,11,10,8,6,4,2,0,-2,-4,-6,-8,-10,-12,-14,-16,-18,-20], //Außentemperatur
        y: [20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80], //Kesseltemperatur
    };

    const chartConfig = {
        type: 'line',
        data: {
            labels: data.x,
            datasets: [{
                label: 'Kesseltemperatur',
                data: data.y,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
            }]
        },
        options: {
            plugins: {legend: {display: false}},
            scales: {
                x: {
                    title: {display: true, color: 'white', font: {size: 16}},
                    ticks: {color: 'lightgrey', font: {size: 12}}
                },
                y: {
                    min: 20,
                    max: 80
                }
            }
        }
    };

    const temperatureChart = new Chart(ctx, chartConfig);

    function generateYValues(min, max) {
            const newYValues = [];
            for (let i = 0; i <= max; i += 2) {
                if (i >= min) {
                    newYValues.push(i);
                }
            }
            return newYValues;
        }

    function updateChart(newYValues) {
        const newData = {
            labels: data.x,
            datasets: [{
                label: 'Kesseltemperatur',
                data: newYValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
            }],
        };

        temperatureChart.data = newData;
        temperatureChart.update();
    }
});
