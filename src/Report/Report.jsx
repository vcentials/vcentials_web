import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx'
import styles from './Report.module.css'; // Add custom styling if needed

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

  const handleGenerateReport = () => {
    navigate('/print-preview', { state: { records: filteredRecords } });
  };
  
  return (
    <>
    <NavBar/>
    <div className="report">
      <h2 className="report-title">Report View</h2>
      <div className="controls">
        <label className="checkbox-label">
          <input type="checkbox" checked={sortEnabled} onChange={handleSortChange} /> Sort by Date
        </label>
        <label className="checkbox-label">
          <input type="checkbox" checked={groupEnabled} onChange={handleGroupChange} /> Group by Criteria
        </label>
        <div className="date-picker">
          <label className="date-label">
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="date-input" />
          </label>
          <label className="date-label">
            End Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="date-input" />
          </label>
        </div>
        <div className="location-picker">
          <label className="location-label">
            Location:
            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="location-select">
              <option value="">All Locations</option>
              <option value="West Campus">West Campus</option>
              <option value="East Campus">East Campus</option>
              <option value="Osceola Campus">Osceola Campus</option>
            </select>
          </label>
        </div>
        <div className="room-picker">
          <label className="room-label">
            Room:
            <input type="text" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} placeholder="Enter room number" className="room-input" />
          </label>
        </div>
        <div className="machine-picker">
          <label className="machine-label">
            Machine:
            <input type="text" value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)} placeholder="Enter machine type" className="machine-input" />
          </label>
        </div>
        <div className="username-picker">
          <label className="username-label">
            Username:
            <input type="text" value={selectedUsername} onChange={(e) => setSelectedUsername(e.target.value)} placeholder="Enter username" className="username-input" />
          </label>
        </div>
      </div>
      <div className="record-count">
        <h3 className="record-count-title">Number of Records: {filteredRecords.length}</h3>
      </div>
      <button onClick={handleGenerateReport} className="generate-report-button">Generate Report</button>
    </div>
    </>
  );
};

export default Report;
