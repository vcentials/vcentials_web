import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx'
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './Report.module.css'; // Add custom styling if needed
import "bootstrap/dist/css/bootstrap.min.css"


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

    <div className="mt-5">
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md="6">
          <h2 className="report-title">Report View</h2>
            <Form>
              <div>
                <div>
                  <h4>Sorting options:</h4>
                </div>
              {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Date"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="Room"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="Machine"
                    type={type}
                    id={`inline-${type}-3`}
                  />
                  <Form.Check
                    inline
                    label="Location"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="Username"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
              </div>

              <div>
                <div>
                  <h4>Grouping options:</h4>
                </div>
              {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Date"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="Room"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="Machine"
                    type={type}
                    id={`inline-${type}-3`}
                  />
                  <Form.Check
                    inline
                    label="Location"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="Username"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
              </div>

              <div>

                <Form.Label>Start Date</Form.Label>
                <Form.Control type="Date" value={startDate} onChange={(e) => setStartDate(e.target.value)}></Form.Control>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="Date" value={endDate} onChange={(e) => setEndDate(e.target.value)}></Form.Control>
              </div>

              <div>
                <Form.Label>Location:</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="">All Locations</option>
                  <option value="West Campus">West Campus</option>
                  <option value="East Campus">East Campus</option>
                  <option value="Osceola Campus">Osceola Campus</option>
                </Form.Select>
              </div>

              <Button variant="danger" type="submit" onClick={handleGenerateReport}>
                  Generate Report
              </Button>
            
          </Form>
        </Col>

      </Row>

    </Container>

    </div>

    

    </>
  );
};

export default Report;