import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrintPreview = () => {
    const { state } = useLocation(); 
    const { records } = state || {}; 
    const printRef = useRef();

  // Function to handle the print preview
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

  // Function to save as PDF
  const handleSavePDF = () => {
    const contentToPrint = printRef.current;
    html2canvas(contentToPrint).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('filtered-records.pdf'); // Save the PDF
    });
  };

  // Function to save as JPG
  const handleSaveJPG = () => {
    const contentToPrint = printRef.current;
    html2canvas(contentToPrint).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'filtered-records.jpg'; // Set download filename
      link.click(); // Trigger download
    });
  };

  return (
    <>
      
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Records Report</h1>

        {/* Display filtered records */}
        <div ref={printRef} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
          {records.length > 0 ? (
            <table
              border="1"
              cellPadding="10"
              cellSpacing="0"
              style={{ width: '100%', borderCollapse: 'collapse' }}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Machine</th>
                  <th>Temperature</th>
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
            <p>No records to display.</p>
          )}
        </div>

        <button onClick={handlePrint} style={buttonStyle}>Print Page</button>
        <button onClick={handleSavePDF} style={buttonStyle}>Save as PDF</button>
        <button onClick={handleSaveJPG} style={buttonStyle}>Save as JPG</button>
      </div>
    </>
  );
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007BFF',
  color: '#FFF',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default PrintPreview;
