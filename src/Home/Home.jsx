// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import styles from './Home.module.css';
import NavBar from '../NavBar/NavBar.jsx'
import {auth} from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth';

function Home() {

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    

    //Storing for list of records, populated with demo data for now until backend is finished
    const [records, setRecords] = useState([
        {id: 1, date: '2024-10-19', time: '11:00', machine: 'West Freezer', machineTempF: 10, room: 'Room 205', roomTempF: 69, location: 'West' },
        {id: 2, date: '2024-10-19', time: '11:30', machine: 'East Freezer', machineTempF: 5, room: 'Room 107', roomTempF: 71, location: 'East' }
    ]);


    //keeps track of all records from users that use crud operations
    const [selectedRecords, setSelectedRecords] = useState([]);
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
    }, []);


    // placeholder method to function fake records, until backend is implemented
    const fetchRecords = () => {
        // not fetching anything until backend is implemented
    };


    // function to handle selecting or deselecting records
    const handleSelectRecord = (recordId) => {
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
        handleClearForm();
    };


    // deletes selected records chosen by the user (temp until backend is implemented)
    const handleDelete = () => {
        // demo deleting records until backend is developed
        const remainingRecords = records.filter(record => !selectedRecords.includes(record.id));
        setRecords(remainingRecords); // updates the form with the records remaining
        setSelectedRecords([]); // clears the selected records chosen by the user
        setDeleteDialogOpen(false); // closes the delete confirmation dialog
    };

    return (
        <>
        <NavBar/>
        <div className={styles.homePageView}>
    
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
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        {records.map(record => (
                            <tr key={record.id}
                                onClick={() => handleSelectRecord(record.id)} // on user click user can select/deselect a record
                                className={selectedRecords.includes(record.id) ? 'selected' : ''}
                            >
                                <td>{record.date}</td>
                                <td>{record.time}</td>
                                <td>{record.machine}</td>
                                <td>{record.machineTempF}</td>
                                <td>{record.room}</td>
                                <td>{record.roomTempF}</td>
                                <td>{record.location}</td>
                                <td>{record.username}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.editorLayout}>
                    <form className={styles.formLayout}>
                        {/* Each field of the form for the user to input temp data */}
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
                            <button type="button" onClick={handleSave}>Save</button> {/* Saves updated info added*/}
                            <button type="button" onClick={handleClearForm}>Clear</button> {/*Clears all of the info added into the form */}
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