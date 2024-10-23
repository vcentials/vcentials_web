// src/Metrics.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Metrics.css';
import { PolarArea, Bar } from 'react-chartjs-2';
// usage of importing Chart.js library components for chart functionality on the metrics page
import {
    Chart as ChartJS,
    RadialLinearScale,
    LinearScale,
    CategoryScale,
    ArcElement,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
// registers the Chart.js components that will be used in the charts due to be created from the data retrieved
ChartJS.register(
    RadialLinearScale,
    LinearScale,
    CategoryScale,
    ArcElement,
    BarElement,
    Tooltip,
    Legend
);

function Metrics() {
    //tracks the active state of the menu
    const [menuActive, setMenuActive] = useState(false);

    // toggles the menu's active state
    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    // fake data for the polar area chart (temporary until backend is implemented to make calls and display real data real time)
    const polarData = {
        labels: ['West Campus', 'East Campus', 'Osceola Campus'],
        datasets: [
            {
                label: 'Weekly Average',
                data: [35, 37, 38],                           // all fake data to demo, eventually will be refactored to make backend calls and be manipulated
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
            },
        ],
    };

    // fake data for the barchart (temporary until backend is implemented to make calls and display real data real time)
    const barData = {
        labels: ['West Campus', 'East Campus', 'Osceola Campus'],
        datasets: [
            {
                label: 'Temperature',
                data: [35, 37, 38],
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',                // all fake data to demo, eventually will be refactored to make backend calls and be manipulated
                    'rgba(255, 206, 86, 1)',
                ],
            },
        ],
    };

    // maintains aspect ratio and makes the charts responsive (hovering, load animation etc)
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };


    return (
        <div className="container">
            <div className="main">
                {/* Toggle menu, search bar for variouis metrics, and VCentials logo image for intuitiveness */}
                <div className="topbar">
                    <div className="toggle" onClick={toggleMenu}>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
                    <div className="search">
                        <label>
                            <input type="text" placeholder="Search here" />
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>
                    <div className="user">
                        <img src="VCentials.jpg" alt="User" />
                    </div>
                </div>

                {/* Card box section to display statistics for VCentials */}
                <div className="cardBox">
                    {[
                        { number: 56, name: "Weekly Reports" },
                        { number: 125, name: "Monthly Reports" },
                        { number: 276, name: "Quarterly Reports" },       // fake data for weekly, monthly, quarterly, and annual reports for VCentials (once backend is implemented it will be refactored)
                        { number: 531, name: "Annual Reports" },
                    ].map((card, index) => (
                        <div className="card" key={index}>
                            <div>
                                <div className="numbers">{card.number}</div>
                                <div className="cardName">{card.name}</div>
                            </div>
                            <div className="iconBx">
                                <ion-icon name="newspaper-outline"></ion-icon>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts section to display the polar chart and bar chart of temp data */}
                <div className="chartsBx">
                    <div className="chart">
                        <PolarArea data={polarData} options={chartOptions} />
                    </div>
                    <div className="chart">
                        <Bar data={barData} options={chartOptions} />
                    </div>
                </div>

                {/* Details Section */}
                <div className="details">
                    <div className="recentOrders">
                        <div className="cardHeader">
                            <h2>Campus Updates</h2>
                            <a href="#" className="btn">View All</a>
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <td>Location</td>
                                <td>Temperature</td>
                                <td>Category</td>
                                <td>Status</td>
                            </tr>
                            </thead>
                            <tbody>
                            {[
                                { location: 'West Campus', temp: 35, category: 'Cool', status: 'Good' },
                                { location: 'East Campus', temp: 37, category: 'Cool', status: 'Good' },
                                { location: 'Osceola Campus', temp: 38, category: 'Cool', status: 'Good' },   // fake data of recent orders and their respective status
                            ].map((order, index) => (
                                <tr key={index}>
                                    <td>{order.location}</td>
                                    <td>{order.temp}</td>                       {/* Print out of data in this order */}
                                    <td>{order.category}</td>
                                    <td><span className="status good">{order.status}</span></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Location reports section that displays each report details for each campus */}
                    <div className="locationReports">
                        <div className="cardHeader">
                            <h2>Location Reports</h2>
                        </div>
                        <table>
                            {['West Campus', 'East Campus', 'Osceola Campus'].map((location, index) => (
                                <tr key={index}>
                                    <td width="60px">
                                        <div className="imgBx"><img src="/VCentials.jpg" alt="Location" /></div>
                                    </td>
                                    <td>
                                        <h4>{location} <br /> <span>Campus</span></h4>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Metrics;