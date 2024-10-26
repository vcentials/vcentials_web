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
 
 
