// components/ExpenseChart.js
import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, LogarithmicScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    LogarithmicScale,
    PointElement,
    LineElement
);

const ExpenseChart = ({ data }) => {
    const { categories, expenses, dailyExpenses, dailyLabels } = data;

    // Bar Chart Data
    const barChartData = {
        labels: categories,
        datasets: [
            {
                label: 'Expenses by Category',
                data: expenses,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Doughnut Chart Data
    const doughnutChartData = {
        labels: categories,
        datasets: [
            {
                label: 'Expense Distribution',
                data: expenses,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Logarithmic Scale Line Chart Data
    const logScaleChartData = {
        labels: dailyLabels,
        datasets: [
            {
                label: 'Daily Expenses',
                data: dailyExpenses,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null && !isNaN(context.parsed.y)) {
                            label += `$${context.parsed.y.toFixed(2)}`;
                        } else {
                            label += 'N/A';
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Categories',
                },
                // For the line chart with time scale
                type: 'category',
                labels: dailyLabels,
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount ($)',
                },
                type: 'logarithmic',
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h3>Expenses by Category (Bar Chart)</h3>
            <Bar data={barChartData} options={chartOptions} />
            <h3>Expense Distribution (Doughnut Chart)</h3>
            <Doughnut data={doughnutChartData} options={{ responsive: true }} />
            <h3>Daily Expenses (Logarithmic Scale Line Chart)</h3>
            <Line data={logScaleChartData} options={chartOptions} />
        </div>
    );
};

export default ExpenseChart;
