import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import * as d3 from 'd3';

import '../styles/components/UserPieChart.css';

class UserPieChart extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         thereAreMacros: undefined,
    //         macros: undefined
    //     }
    // }

    componentDidMount() {
    //    this.handleCheckMacros();
       this.handleCreatePieChart();
    }

    componentDidUpdate() {
        // this.handleCheckMacros();
        this.handleCreatePieChart();
    }

    // handleCheckMacros = () => {
    //     const {
    //         totalCarbs,
    //         totalFats,
    //         totalProteins
    //     } = this.props.foods;

    //     let macros = [totalCarbs, totalFats, totalProteins];

    //     if (macros.every(el => el === 0)) {
    //         console.log('false');
            
    //         this.setState({ thereAreMacros: false });
    //     } else {
    //         console.log('true');
            
    //         setTimeout(() => {
    //             this.setState({ thereAreMacros: true });
    //             this.handleCreatePieChart();
    //         }, 500);            
    //     }
    // }

    handleCreatePieChart = () => {
        const {
            totalCarbs,
            totalFats,
            totalProteins
        } = this.props.foods;

        const node = this.node;
        const data = [{
            grams: totalProteins,
            nutrient: 'Proteins'
        }, {
            grams: totalCarbs,
            nutrient: 'Carbohydrates'
        }, {
            grams: totalFats,
            nutrient: 'Fats'
        }];

        const colorScale = d3.scaleOrdinal()
            .domain(Object.keys(data))
            .range(['#b4b4b4', 'cornflowerblue', 'lightyellow']);

        d3.select('body')
            .append('div')
            .classed('tooltip', true);

        // allows chart to update
        if (document.querySelector('g')) {
            let g = document.querySelector('g');
            g.parentNode.removeChild(g);
        }

        d3.select(node)
            .append('g')
            .attr('transform', `translate(${300 / 2}, ${300 / 2})`)
            .classed('chart', true);

        const arc = d3.pie()
            .value(d => d.grams)(data);        

        let path = d3.arc()
            .innerRadius(300 / 2)
            .outerRadius(300 / 4)
            .padAngle(0.02)
            .cornerRadius(5);

        d3.select('.chart')
            .selectAll('.arc')
            .data(arc)
            .enter()
            .append('path')
            .classed('arc', true)
            .attr('fill', d => colorScale(d.data.grams))
            .attr('stroke', '#b4b4b4')
            .attr('d', path)
            .on('mouseenter', (d) => enter(d))
            .on('mouseleave', (d) => leave(d))
            .on('touchstart', (d) => leave(d))
            .on('touchend', (d) => leave(d));

        const enter = (d) => {
            d3.select('.tooltip')
                .style('opacity', 1)
                .style('left', d3.event.x + 'px')
                .style('top', d3.event.y + 'px')
                .text(`${d.data.nutrient}: ${d.data.grams}g`)
        }

        const leave = (d) => {
            d3.select('.tooltip')
                .style('opacity', 0);
        }
    }

    render() {

        const {
            totalCarbs,
            totalFats,
            totalProteins
        } = this.props.foods;

        let macros = [totalCarbs, totalFats, totalProteins];

        let thereAreMacros = !macros.every(el => el === 0);
        console.log(thereAreMacros);
        

        return (
            <div>
                {
                    thereAreMacros
                    ?
                    (<svg ref = {
                    node => this.node = node
                    }
                    width = '300'
                    height = '300' >
                    </svg>)
                    :
                    'No Data ☹️'
                }
            </div>
                
        );
    }
}

const mapStateToProps = (state) => {
    return {
        foods: state.foods
    };
};

export default connect(mapStateToProps)(UserPieChart);