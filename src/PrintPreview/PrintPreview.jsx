import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom'; // to receive the state passed from the Report page
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import NavBar from '../NavBar/NavBar.jsx';

const PrintPreview = () => {
    const printRef = useRef(); // Create a reference to the content we want to print
    const { state } = useLocation(); // Use location hook to access the state passed from Report.jsx
    const { records } = state || {}; // Destructure the records from state

    // Handle the print preview functionality
    const handlePrint = () => {
        const contentToPrint = printRef.current;
    
        html2canvas(contentToPrint).then(canvas => {
            const printWindow = window.open('', '', 'width=800,height=600');
            const imgData = canvas.toDataURL('image/png');
    
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Preview</title>
                        <style>
                            @media print {
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 20px;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <img src="${imgData}" />
                    </body>
                </html>
            `);
    
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        });
    };

    // Save the content as PDF
    const handleSavePDF = () => {
        const contentToPrint = printRef.current;
        html2canvas(contentToPrint).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('download.pdf'); // Save the PDF
        });
    };

    // Save the content as JPG
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

    return (
        <>
            <NavBar />
            <div>
                <h1>Print Preview Example</h1>

                {/* Render the report passed from Report.jsx */}
                <div ref={printRef}>
                    {/* If records are present, render them */}
                    {records && records.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Machine</th>
                                    <th>Temp</th>
                                    <th>Room</th>
                                    <th>Room Temp</th>
                                    <th>Location</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.date}</td>
                                        <td>{record.time}</td>
                                        <td>{record.machine}</td>
                                        <td>{record.temp}</td>
                                        <td>{record.room}</td>
                                        <td>{record.roomTemp}</td>
                                        <td>{record.location}</td>
                                        <td>{record.username}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No records to display</p>
                    )}
                </div>
                
                {/* Buttons to print, save as PDF or JPG */}
                <button onClick={handlePrint}>Print Page</button>
                <button onClick={handleSavePDF}>Save as PDF</button>
                <button onClick={handleSaveJPG}>Save as JPG</button>
            </div>
        </>
    );
};

export default PrintPreview;

export default PrintPreview;
 
 
