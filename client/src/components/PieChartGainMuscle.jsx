import React, { useEffect } from 'react';
import Chart from 'chart.js'

const PieChartGainMuscle = () => {

    useEffect(() => {
        let ctx = document.getElementById('gainMuscleMacrosChart').getContext('2d');
        let chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'doughnut',

            // The data for our dataset
            data: {
                labels: ['protiens', 'carbs', 'fats'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: ['rgb(255, 99, 132)', 'green', 'blue'],
                    borderColor: 'white',
                    data: [30, 60, 10]
                }]
            },

            // Configuration options go here
            options: {}
        });
    })

    return (
        <div>
            <h2>Gain Muscle Chart</h2>
            <canvas id="gainMuscleMacrosChart"></canvas>
        </div>
    );
};

export default PieChartGainMuscle;