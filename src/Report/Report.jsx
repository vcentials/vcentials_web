import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

//import styles from './Report.module.css'; Add custom styling if needed

export function Report() {
  const [records, setRecords] = useState([]);
  const [sortEnabled, setSortEnabled] = useState(false);
  const [groupEnabled, setGroupEnabled] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch or simulate data here (e.g., from an API or hardcoded values)
    const fetchData = async () => {
      const data = [
        { date: '2024-10-21', time: '10:00 AM', machine: 'Freezer A', temp: -5, room: 'Room 101', roomTemp: 70, location: 'West Campus', username: 'User1' },
        { date: '2024-10-21', time: '11:00 AM', machine: 'Fridge B', temp: 38, room: 'Room 102', roomTemp: 68, location: 'East Campus', username: 'User2' },
      ];
      setRecords(data);
    };
    fetchData();
  }, []);

  const handleSortChange = () => {
    setSortEnabled(!sortEnabled);
  };

  const handleGroupChange = () => {
    setGroupEnabled(!groupEnabled);
  };

  const filteredRecords = records.filter(record => {
    const recordDate = new Date(record.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const isWithinDateRange = (!start || recordDate >= start) && (!end || recordDate <= end);
    const isLocationMatch = !selectedLocation || record.location === selectedLocation;
    const isRoomMatch = !selectedRoom || record.room === selectedRoom;
    const isMachineMatch = !selectedMachine || record.machine === selectedMachine;
    const isUsernameMatch = !selectedUsername || record.username === selectedUsername;
    return isWithinDateRange && isLocationMatch && isRoomMatch && isMachineMatch && isUsernameMatch;
  });

  const handleGenerateReport = async () => {
    try {
      // Create temporary table with only filtered results
      const tempTable = document.createElement('table');
      tempTable.className = 'recordGrid';
      tempTable.style.fontSize = '18px'; // Add font size
      
      // Add headers with font size
      const thead = document.createElement('thead');
      thead.style.fontSize = '18px';
      thead.innerHTML = `
        <tr>
          <th style="font-size: 18px;">Date</th>
          <th style="font-size: 18px;">Location</th>
          <th style="font-size: 18px;">Room</th>
          <th style="font-size: 18px;">Machine</th>
          <th style="font-size: 18px;">Temperature</th>
          <th style="font-size: 18px;">Username</th>
        </tr>
      `;
      tempTable.appendChild(thead);

      // Add filtered data with font size
      const tbody = document.createElement('tbody');
      tbody.style.fontSize = '18px';
      filteredRecords.forEach(record => {
        const row = document.createElement('tr');
        row.style.fontSize = '18px';
        row.innerHTML = `
          <td style="font-size: 18px;">${record.date}</td>
          <td style="font-size: 18px;">${record.location}</td>
          <td style="font-size: 18px;">${record.room}</td>
          <td style="font-size: 18px;">${record.machine}</td>
          <td style="font-size: 18px;">${record.temp}</td>
          <td style="font-size: 18px;">${record.username}</td>
        `;
        tbody.appendChild(row);
      });
      tempTable.appendChild(tbody);

      // Add temp table to document temporarily
      document.body.appendChild(tempTable);
      
      // Create canvas from temp table
      const canvas = await html2canvas(tempTable);
      
      // Remove temp table
      document.body.removeChild(tempTable);
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add centered title
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      const title = 'Records Report';
      const titleWidth = pdf.getStringUnitWidth(title) * pdf.getFontSize() / pdf.internal.scaleFactor;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const titleX = (pageWidth - titleWidth) / 2;
      pdf.text(title, titleX, 20);

      // Add filtered table image
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 30, imgWidth, imgHeight);

      // Open in new window for print preview
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl, '_blank');

    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  // Update the return statement to show filtered results
  return (
    <div className="report">
      <h2 className="report-title" style={{marginTop: '20px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold'}}>
        Report View
      </h2>

      {/* Existing filter controls */}
      <div className="controls">
        <label className="checkbox-label" style={{ marginRight: '10px'}}>
          <input type="checkbox" checked={sortEnabled} onChange={handleSortChange} /> Sort by Date
        </label>
        <label className="checkbox-label" style={{ marginRight: '10px'}}>
          <input type="checkbox" checked={groupEnabled} onChange={handleGroupChange} /> Group by Criteria
        </label>
        <div className="date-picker" style={{ marginTop: '20px'}}>
          <label className="date-label" style={{ marginRight: '10px', marginBottom: '10px'}}>
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="date-input" 
            />
          </label>
          <label className="date-label" style={{ marginRight: '10px'}}>
            End Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="date-input" />
          </label>
        </div>
        <div className="location-picker" style={{marginTop: '20px'}}>
          <label className="location-label" style={{marginBotton: '10px', marginRight: '10px'}}>
            Location:
            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="location-select">
              <option value="">All Locations</option>
              <option value="West Campus">West Campus</option>
              <option value="East Campus">East Campus</option>
              <option value="Osceola Campus">Osceola Campus</option>
            </select>
          </label>
        </div>
        <div className="room-picker" style={{marginTop: '10px'}}>
          <label className="room-label">
            Room:
            <input type="text" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} placeholder="Enter room number" className="room-input" />
          </label>
        </div>
        <div className="machine-picker" style={{ marginTop: '10px'}}>
          <label className="machine-label">
            Machine:
            <input type="text" value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)} placeholder="Enter machine type" className="machine-input" />
          </label>
        </div>
        <div className="username-picker" style={{ marginTop: '10px'}}>
          <label className="username-label">
            Username:
            <input type="text" value={selectedUsername} onChange={(e) => setSelectedUsername(e.target.value)} placeholder="Enter username" className="username-input" />
          </label>
        </div>
      </div>

      {/* Print button moved above filtered results */}
      <button 
        onClick={handleGenerateReport}
        className="print-button"
        style={{
          padding: '10px 20px',
          backgroundColor: '#f44336', // Changed to match red color
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          float: 'left',
          marginBottom: '20px'
        }}
      >
        Print Records
      </button>

      {/* Display filtered results */}
      <div className="filteredResults" style={{marginTop: '20px', marginBottom: '20px', clear: 'both'}}>
        <table className="recordGrid">
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Room</th>
              <th>Machine</th>
              <th>Temperature</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.location}</td>
                <td>{record.room}</td>
                <td>{record.machine}</td>
                <td>{record.temp}</td>
                <td>{record.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
