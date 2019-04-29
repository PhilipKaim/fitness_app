import React, { useEffect } from 'react';
import Chart from 'chart.js'

const PieChartLoseWeight = () => {

    useEffect(() => {
        let ctx = document.getElementById('loseWeightMacrosChart').getContext('2d');
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
                    data: [50, 40, 10]
                }]
            },

            // Configuration options go here
            options: {}
        });
    })

    return (
        <div>
            <h2>Lose Weight Chart</h2>
            <canvas id="loseWeightMacrosChart"></canvas>
        </div>
    );
};

export default PieChartLoseWeight;