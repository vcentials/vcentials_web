<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PrintPreview.css'; // Add custom styling if needed

export default function PrintPreview() {
  const [records, setRecords] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Get data from location state (passed from the report generator)
    if (location.state && location.state.records) {
      setRecords(location.state.records);
    }

    // Open the print dialog when the component mounts
    const timer = setTimeout(() => window.print(), 500);
    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <div className="print-preview">
      <h2>Print Preview</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Machine</th>
            <th>Temperature (F)</th>
            <th>Room</th>
            <th>Room Temperature (F)</th>
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
    </div>
  );
}
=======
import React, { useRef } from 'react';
import Metrics from '../Metrics/Metrics.jsx' // Adjust the import path as needed
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import NavBar from '../NavBar/NavBar.jsx'
 
// PrintPreview component
const PrintPreview = () => {
    const printRef = useRef(); // Create a reference to the content we want to print
 
    // Function to handle the print preview
    const handlePrint = () => {
        const contentToPrint = printRef.current; // Get the content inside the printRef
 
        // Open a new window to display the print preview
        const printWindow = window.open('', '', 'width=800,height=600');
 
        // Write the HTML content for the new window
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
        <body>${contentToPrint.innerHTML}</body>
      </html>
    `);
 
        printWindow.document.close(); // Close the document to finalize the content
        printWindow.focus(); // Focus on the new window
        printWindow.print(); // Trigger the print dialog
        printWindow.close(); // Close the window after printing
    };
 
    // Function to save as PDF
    const handleSavePDF = () => {
        const contentToPrint = printRef.current;
        html2canvas(contentToPrint).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('download.pdf'); // Save the PDF
        });
    };
 
    // Function to save as JPG
    const handleSaveJPG = () => {
        const contentToPrint = printRef.current;
        html2canvas(contentToPrint).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'download.jpg'; // Set download filename
            link.click(); // Trigger download
        });
    };
 
    return (
      <>
      <NavBar/>
        <div>
            <h1>React Print Preview Example</h1>
 
            {/* Content that will be printed, including the Metrics component */}
            <div ref={printRef}>
                <Metrics /> {/* Render the Metrics component */}
            </div>
 
            {/* Buttons to trigger actions */}
            <button onClick={handlePrint}>Print Preview</button>
            <button onClick={handleSavePDF}>Save as PDF</button>
            <button onClick={handleSaveJPG}>Save as JPG</button>
        </div>
        </>
    );
};
 
export default PrintPreview;
 
 
>>>>>>> 90d493c3931f8140a49dc8fc5b89453d5d08e734
