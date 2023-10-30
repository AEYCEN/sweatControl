document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('temperature-chart');
    const ctx = canvas.getContext('2d');
    const data = {
        x: [-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        y: [80,78,76,74,72,70,68,66,64,62,60,58,56,54,52,50,48,46,44,42,40,38,36,34,32,30,28,26,24,22,20],
    };

    const chartConfig = {
        type: 'line',
        data: {
            labels: data.x, // -20 bis +20 Grad Außentemperatur
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
    const sliders = document.querySelectorAll('.slider');

    // Schieberegler-Änderungen
    sliders.forEach((slider, index) => {
        slider.addEventListener('input', () => {
            const value = parseInt(slider.value);
            chartConfig.data.datasets[0].data[index] = value;
            temperatureChart.update();
        });
        slider.value = data.y[index];
    });
});
