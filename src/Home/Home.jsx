// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import {Report} from '../Report/Report.jsx';
import styles from './Home.module.css';
import NavBar from '../NavBar/NavBar.jsx'

function Home() {
    //Storing for list of records, populated with demo data for now until backend is finished
    const [records, setRecords] = useState([
        {id: 1, date: '2024-10-19', time: '11:00', machine: 'West Freezer', machineTempF: 10, room: 'Room 205', roomTempF: 69, location: 'West' },
        {id: 2, date: '2024-10-19', time: '11:30', machine: 'East Freezer', machineTempF: 5, room: 'Room 107', roomTempF: 71, location: 'East' }
    ]);

    // Add state for filtered records
    const [filteredRecords, setFilteredRecords] = useState([]);

    // tracks the active state of the report generator
    const [showReport, setShowReport] = useState(false);

    //keeps track of all records from users that use crud operations
    const [selectedRecords, setSelectedRecords] = useState([]);

    // Add new state for date range search
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });

    // handles form data objects
    const [formData, setFormData] = useState({
        user: '',
        location: '',
        room: '',
        machine: '',
        machineTempF: '',
        roomTempF: '',
        date: '',
        time: '',
    });

    // toggles boolean admin view to true for now, until backend is finished to show record deletion
    const [isAdmin, setIsAdmin] = useState(true); //true to show working webpage
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // useEffect hook used to perform fetching records
    useEffect(() => {
        fetchRecords();
        setFilteredRecords(records); // Initialize filtered records with all records
    }, []);

    // placeholder method to function fake records, until backend is implemented
    const fetchRecords = () => {
        // not fetching anything until backend is implemented
    };

    // Handle date range changes
    const handleDateRangeChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle search button click with actual filtering
    const handleSearch = () => {
        if (!dateRange.startDate || !dateRange.endDate) {
            alert('Please select both start and end dates');
            return;
        }

        const filtered = records.filter(record => {
            const recordDate = new Date(record.date);
            const startDate = new Date(dateRange.startDate);
            const endDate = new Date(dateRange.endDate);
            
            return recordDate >= startDate && recordDate <= endDate;
        });

        setFilteredRecords(filtered);
    };

    // Handle print button click with filtered records
    const handlePrint = () => {
        // Store the current content of the body
        const originalContent = document.body.innerHTML;
        
        // Create a print-specific version of the table
        let printContent = `
            <h2>Records from ${dateRange.startDate} to ${dateRange.endDate}</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid black; padding: 8px;">Date</th>
                        <th style="border: 1px solid black; padding: 8px;">Time</th>
                        <th style="border: 1px solid black; padding: 8px;">Machine</th>
                        <th style="border: 1px solid black; padding: 8px;">Machine Temp (℉)</th>
                        <th style="border: 1px solid black; padding: 8px;">Room</th>
                        <th style="border: 1px solid black; padding: 8px;">Room Temp (℉)</th>
                        <th style="border: 1px solid black; padding: 8px;">Location</th>
                        <th style="border: 1px solid black; padding: 8px;">User</th>
                    </tr>
                </thead>
                <tbody>
        `;

        filteredRecords.forEach(record => {
            printContent += `
                <tr>
                    <td style="border: 1px solid black; padding: 8px;">${record.date}</td>
                    <td style="border: 1px solid black; padding: 8px;">${record.time}</td>
                    <td style="border: 1px solid black; padding: 8px;">${record.machine}</td>
                    <td style="border: 1px solid black; padding: 8px;">${record.machineTempF}</td>
                    <td style="border: 1px solid black; padding: 8px;">${record.room}</td>
                    <td style="border: 1px solid black; padding: 8px;">${record.roomTempF}</td>
                    <td style="border: 1px solid black; padding: 8px;">${record.location}</td>
                    <td style="border: 1px solid black; padding: 8px;">${record.user}</td>
                </tr>
            `;
        });

        printContent += `
                </tbody>
            </table>
        `;

        // Replace body content with print content
        document.body.innerHTML = printContent;
        
        // Print
        window.print();
        
        // Restore original content
        document.body.innerHTML = originalContent;
        
        // Re-render React components
        window.location.reload();
    };

    // function to handle selecting or deselecting records
    const handleSelectRecord = (recordId) => {
        @@ -57,7 +146,6 @@ function Home()
            if (selectedRecords.includes(recordId)) {
            setSelectedRecords(selectedRecords.filter(id => id !== recordId));
        } else {
            setSelectedRecords([...selectedRecords, recordId]);
        }
    };

    // handles user input in the form for updates from user
    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //clears the form data and resets the input fields for the user
    const handleClearForm = () => {
        setFormData({
            user: '',
            location: '',
            room: '',
            machine: '',
            machineTempF: '',
            roomTempF: '',
            date: '',
            time: '',
        });
    };

    // adds a new record based on user input into the form (temp)
    const handleSave = () => {
        const newRecord = {
            id: records.length + 1,
            ...formData                      //demo adding a new record for now, until backened is developed and connected
        };
        setRecords([...records, newRecord]);
        setFilteredRecords([...records, newRecord]); // Update filtered records too
        handleClearForm();
    };

    // deletes selected records chosen by the user (temp until backend is implemented)
    const handleDelete = () => {
        // demo deleting records until backend is developed
        const remainingRecords = records.filter(record => !selectedRecords.includes(record.id));
        setRecords(remainingRecords); // updates the form with the records remaining
        setFilteredRecords(remainingRecords); // Update filtered records too
        setSelectedRecords([]); // clears the selected records chosen by the user
        setDeleteDialogOpen(false); // closes the delete confirmation dialog
    };

    return (
        <>
        <NavBar/>
        <div className={styles.homePageView}>
            <div className={styles.dateSearchSection}>
                <div className={styles.dateInputs}>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={dateRange.startDate}
                        onChange={handleDateRangeChange}
                        className={styles.dateInput}
                    />
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={dateRange.endDate}
                        onChange={handleDateRangeChange}
                        className={styles.dateInput}
                    />
                    <button onClick={handleSearch} className={styles.searchButton}>Search</button>
                    <button onClick={handlePrint} className={styles.printButton}>Print</button>
                </div>
            </div>
            <div className={styles.splitLayout}>
                <div className={styles.gridWrapper}>
                    <table className={styles.recordGrid}>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Machine</th>
                            <th>Machine Temp (℉)</th>
                            <th>Room</th>
                            <th>Room Temp (℉)</th>
                            <th>Location</th>
                            <th>User</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRecords.map(record => (
                            <tr key={record.id}
                                onClick={() => handleSelectRecord(record.id)}
                                {/* Each field of the form for the user to input temp data */}      
                                className={selectedRecords.includes(record.id) ? 'selected' : ''}
                            >
                                <td>{record.date}</td>
                                <td>{record.time}</td>
                                <td>{record.machine}</td>
                                <td>{record.machineTempF}</td>
                                <td>{record.room}</td>
                                <td>{record.roomTempF}</td>
                                <td>{record.location}</td>
                                <td>{record.user}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.editorLayout}>
                    <form className={styles.formLayout}>
                        <div>
                            <label>User</label>
                            <input
                                type="text"
                                name="user"
                                value={formData.user}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Room</label>
                            <input
                                type="text"
                                name="room"
                                value={formData.room}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Machine</label>
                            <input
                                type="text"
                                name="machine"
                                value={formData.machine}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Machine Temp (℉)</label>
                            <input
                                type="number"
                                name="machineTempF"
                                value={formData.machineTempF}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Room Temp (℉)</label>
                            <input
                                type="number"
                                name="roomTempF"
                                value={formData.roomTempF}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className={styles.buttonLayout}>
                            <button type="button" onClick={handleSave}>Save</button>  {/* Saves updated info added*/}                            <button type="button" onClick={handleClearForm}>Clear</button>
                        </div>
                    </form>
                    {isAdmin && ( // only shows the delete button if the user is an admin
                        <button className={styles.deleteButton}
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            Delete Selected Records
                        </button>
                    )}
                </div>
            </div>
            {deleteDialogOpen && ( // Delete confirmation printout to the user if they are an admin
                    <div className={styles.confirmDialog}>
                    <p>Are you sure you want to delete these records?</p>
                    <button onClick={handleDelete}>Confirm</button>
                    <button onClick={() => setDeleteDialogOpen(false)}>Cancel</button>
                </div>
            )}
        </div>
        </>
    );
}

export default Home;
