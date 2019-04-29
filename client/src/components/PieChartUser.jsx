import React, { useEffect } from 'react'
import Chart from 'chart.js'
import { connect } from 'react-redux'

const PieChartUser = (props) => {
    
    useEffect(() => {

        function getMacros() {
            const {
                totalCarbs,
                totalFats,
                totalProteins
            } = props.foods;
        
            let macros = [totalCarbs, totalFats, totalProteins];
    
            return macros
        }

        let macros = getMacros()

        let ctx = document.getElementById('usersCurrentMacrosChart').getContext('2d');
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
                    data: macros
                }]
            },

            // Configuration options go here
            options: {}
        });
    })

    return (
        <div>
            <h2>Current Macros Chart</h2>
            <canvas id="usersCurrentMacrosChart"></canvas>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        foods: state.foods
    };
};

export default connect(mapStateToProps)(PieChartUser);