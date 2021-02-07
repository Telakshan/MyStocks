import React from 'react'
import { Line } from 'react-chartjs-2'
import './Stock.css'

const StockChart = (props) => {

    const data = {
        labels: props.x,
        datasets: [
            {
                label: props.label,
                data: props.y,
                borderColor: '#1976d2',
                pointColor: '#D0D1D3'
            }
        ]
    }
    return (
        <div className="chart-container">

            <Line data={data} />

        </div>
    )
}

export default StockChart;
