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
