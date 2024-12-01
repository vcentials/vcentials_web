import React, { useState } from 'react';
import styles from './Metrics.module.css';
import { PolarArea, Bar } from 'react-chartjs-2';
import NavBar from '../NavBar/NavBar.jsx';
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
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const polarData = {
        labels: ['West Campus', 'East Campus', 'Osceola Campus'],
        datasets: [{
            label: 'Weekly Average',
            data: [35, 37, 38],
            backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        }],
    };

    const barData = {
        labels: ['West Campus', 'East Campus', 'Osceola Campus'],
        datasets: [{
            label: 'Temperature',
            data: [35, 37, 38],
            backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.topbar}>
                        <div className={styles.toggle} onClick={toggleMenu}>
                            <ion-icon name="menu-outline"></ion-icon>
                        </div>
                        <div className={styles.search}>
                            <label>
                                <input type="text" placeholder="Search here" />
                                <ion-icon name="search-outline"></ion-icon>
                            </label>
                        </div>
                        <div className={styles.user}>
                            <img src="VCentials.jpg" alt="User" />
                        </div>
                    </div>

                    <div className={styles.cardBox}>
                        {[
                            { number: 56, name: "Weekly Reports" },
                            { number: 125, name: "Monthly Reports" },
                            { number: 276, name: "Quarterly Reports" },
                            { number: 531, name: "Annual Reports" },
                        ].map((card, index) => (
                            <div className={styles.card} key={index}>
                                <div>
                                    <div className={styles.numberes}>{card.number}</div>
                                    <div className={styles.cardName}>{card.name}</div>
                                </div>
                                <div className={styles.iconBx}>
                                    <ion-icon name="newspaper-outline"></ion-icon>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.chartsBx}>
                        <div className={styles.chart}>
                            <PolarArea data={polarData} options={chartOptions} />
                        </div>
                        <div className={styles.chart}>
                            <Bar data={barData} options={chartOptions} />
                        </div>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.recentOrders}>
                            <div className={styles.cardHeader}>
                                <h2>Campus Updates</h2>
                                <a href="#" className={styles.btn}>View All</a>
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
                                        { location: 'Osceola Campus', temp: 38, category: 'Cool', status: 'Good' },
                                    ].map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.location}</td>
                                            <td>{order.temp}</td>
                                            <td>{order.category}</td>
                                            <td><span className={`${styles.status} ${styles.good}`}>{order.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.locationReports}>
                            <div className={styles.cardHeader}>
                                <h2>Location Reports</h2>
                            </div>
                            <table>
                                {['West Campus', 'East Campus', 'Osceola Campus'].map((location, index) => (
                                    <tr key={index}>
                                        <td width="60px">
                                            <div className={styles.imgBx}><img src="/VCentials.jpg" alt="Location" /></div>
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
        </>
    );
}

export default Metrics;
