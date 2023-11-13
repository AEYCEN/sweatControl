document.addEventListener("DOMContentLoaded", function () {
    const minTempInput = document.getElementById('minTempInput');
    const maxTempInput = document.getElementById('maxTempInput');
    const heaterTempElement = document.getElementById('heaterTemperature');

    const canvas = document.getElementById('sc-chart');
    const ctx = canvas.getContext('2d');
    const data = {
        x: [20,18,16,14,12,10,8,6,4,2,0,-2,-4,-6,-8,-10,-12,-14,-16,-18,-20], // Außentemperatur
        y: [], // Kesseltemperatur
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

    function fetchPredictedValues() {
        fetch('http://127.0.0.1:5000/test', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(values => {
            updateChart(values)
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
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
            }],
        };
        temperatureChart.update();
    }

    // Call the function to fetch predicted values after the chart setup
    fetchPredictedValues();
});
