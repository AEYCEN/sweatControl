let temperatureChart;
let data;
let externalTempElement;
let heaterTempElement;

document.addEventListener("DOMContentLoaded", function () {
    externalTempElement = document.getElementById('externalTempDisplay');
    heaterTempElement = document.getElementById('heaterTempDisplay');

    const canvas = document.getElementById('sc-chart');
    const ctx = canvas.getContext('2d');
    data = {
        x: [20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0, -2, -4, -6, -8, -10, -12, -14, -16, -18, -20], // Außentemperatur
        y: [], // Kesseltemperatur
    };

    const chartConfig = {
        type: 'line',
        data: {
            labels: data.x,
            datasets: [{
                data: data.y,
                borderColor: '#d37147',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#d3d3d3',
                        font: {size: 16}
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Außentemperatur in °C',
                        color: 'lightgrey',
                        font: {size: 14}
                    },
                    ticks: {
                        color: 'lightgrey',
                        font: {size: 12}
                    }
                },
                y: {
                    ticks: {
                        color: 'lightgrey',
                        font: {
                            size: 12
                        }
                    },
                    min: 20,
                    max: 80
                }
            }
        }
    };
    temperatureChart = new Chart(ctx, chartConfig);

    // Call the function to fetch predicted values after the chart setup
    fetchPredictedValues();
});

function fetchPredictedValues() {
    fetch('/get_diagram', {
        method: 'POST',
    })
        .then(response => response.json())
        .then(values => {
            updateChart(values['chartValues'])
            updateExternalAndHeaterTemp(values['externalTemp'], values['heaterTemp'])
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function updateChart(newYValues) {
    temperatureChart.data = {
        labels: data.x,
        datasets: [{
            label: 'Kesseltemperatur',
            data: newYValues,
            borderColor: '#d37147',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
        }],
    };
    temperatureChart.update();
}

function updateExternalAndHeaterTemp(newExternalTemp, newHeaterTemp) {
    externalTempElement.innerText = newExternalTemp;
    heaterTempElement.innerText = newHeaterTemp;
}