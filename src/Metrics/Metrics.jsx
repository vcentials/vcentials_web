// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import styles from './Metrics.module.css';
import { PolarArea, Bar } from 'react-chartjs-2';
import NavBar from '../NavBar/NavBar.jsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { app } from '../firebase.js';
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";  // import of the vcentials firestore collection

// uses chartJs to create pie chart and bar chart of machine and room temps
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


//initializes firestore data retrieval, and the pie/bar charts to show that data
function Metrics() {
    const [menuActive, setMenuActive] = useState(false);
    const printRef = useRef(); // Reference for printing
    const [polarData, setPolarData] = useState(null);
    const [barData, setBarData] = useState(null);
    const [campusUpdates, setCampusUpdates] = useState([]);
    const [locationReports, setLocationReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore(app);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const dataCollection = collection(db, "temperatures");
            const snapshot = await getDocs(dataCollection);
            const records = snapshot.docs.map(doc => doc.data());

            // Extract and convert temperature data from strings to numbers
            const labels = records.map((_, index) => `Record ${index + 1}`);
            const machineTemps = records.map(record => parseInt(record.machineTemp, 10) || 0);
            const roomTemps = records.map(record => parseInt(record.roomTemp, 10) || 0);

            const groupedByLocation = records.reduce((acc, record) => {
                const location = record.location || 'Unknown Location';
                acc[location] = acc[location] || [];
                acc[location].push(record);
                return acc;
            }, {});

            // creates an average temperature along with a status code based on temp in F
            const updates = Object.keys(groupedByLocation).map(location => {
                const avgTemp = groupedByLocation[location].reduce((sum, record) => sum + parseInt(record.machineTemp, 10), 0) / groupedByLocation[location].length;
                return {
                    location,
                    avgTemp: avgTemp.toFixed(2),
                    status: avgTemp > 40 ? 'Hot' : avgTemp < 30 ? 'Cold' : 'Good',
                };
            });

            setCampusUpdates(updates);
            setLocationReports(Object.keys(groupedByLocation));

            // Create chart data for machine and room temperatures
            setPolarData({
                labels,
                datasets: [{
                    label: 'Machine Temperatures',
                    data: machineTemps,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                }]
            });

            setBarData({
                labels,
                datasets: [
                    {
                        label: 'Machine Temperatures',
                        data: machineTemps,
                        backgroundColor: 'rgba(54, 162, 235, 1)',
                    },
                    {
                        label: 'Room Temperatures',
                        data: roomTemps,
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                    }
                ]
            });
        } catch (error) {
            console.error("Error fetching data from Firestore:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePrint = () => {
        const contentToPrint = printRef.current;
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Preview</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                    </style>
                </head>
                <body>${contentToPrint.innerHTML}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    const handleSavePDF = () => {
        const contentToPrint = printRef.current;
        html2canvas(contentToPrint).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('download.pdf');
        });
    };

    const handleSaveJPG = () => {
        const contentToPrint = printRef.current;
        html2canvas(contentToPrint).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'download.jpg';
            link.click();
        });
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.main} ref={printRef}>
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

                    <div className={styles.buttonContainer}>
                        <button onClick={handlePrint}>Print Page</button>
                        <button onClick={handleSavePDF}>Save as PDF</button>
                        <button onClick={handleSaveJPG}>Save as JPG</button>
                    </div>

                    {loading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : (
                        <>
                            <div className={styles.chartsBx}>
                                {polarData && (
                                    <div className={styles.chart}>
                                        <PolarArea data={polarData} options={chartOptions} />
                                    </div>
                                )}
                                {barData && (
                                    <div className={styles.chart}>
                                        <Bar data={barData} options={chartOptions} />
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Metrics;

