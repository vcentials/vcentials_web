
import React, { useState, useEffect } from "react";
import { useEffectOnce, useList } from "react-use";
import { addDoc, deleteDoc, doc, getFirestore } from "firebase/firestore/lite";
import { collection, getDocs } from "firebase/firestore/lite";

import { Report } from "../Report/Report.jsx";
import { app } from "../firebase.js";
import "./Home.css";
import NavBar from '../NavBar/NavBar.jsx'

function Home() {
  const [data, { push, clear }] = useList([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  // initialize firestore
  const db = getFirestore(app);
  const collectionRef = collection(db, "temperatures");

  const getDataFromFirebase = async () => {
    clear();
    setLoading(true);
    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
      push({ ...doc.data(), id: doc.id });
    });
    setLoading(false);
  };

  // gets data from firestore
  useEffectOnce(() => {
    getDataFromFirebase();
  });

  // tracks the active state of the report generator
  const [showReport, setShowReport] = useState(false);

  // handles form data objects
  const [formData, setFormData] = useState({
    user: "",
    location: "",
    room: "",
    machine: "",
    machineTemp: "",
    roomTemp: "",
    date: "",
    time: "",
  });

  // toggles boolean admin view to true for now, until backend is finished to show record deletion
  const [isAdmin, setIsAdmin] = useState(true); //true to show working webpage
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // function to handle selecting or deselecting records
  //   const handleSelectRecord = (recordId) => {
  //     if (selectedRecords.includes(recordId)) {
  //       setSelectedRecords(selectedRecords.filter((id) => id !== recordId));
  //     } else {
  //       setSelectedRecords([...selectedRecords, recordId]);
  //     }
  //   };

  // handles user input in the form for updates from user
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //clears the form data and resets the input fields for the user
  const handleClearForm = () => {
    setFormData({
      username: "",
      location: "",
      room: "",
      machine: "",
      machineTemp: 0,
      roomTemp: 0,
      date: "",
      time: "",
    });
  };

  // adds a new record based on user input into the form (temp)
  const handleSave = async () => {
    await addDoc(collectionRef, formData);
    getDataFromFirebase();
    handleClearForm();
  };

  // deletes selected records chosen by the user (temp until backend is implemented)
  const handleDelete = async () => {
    await deleteDoc(doc(db, "temperatures", selectedId));
    getDataFromFirebase();
    setDeleteDialogOpen(false);
  };

  return (
    <>
    <NavBar/>
    <div className="homePageView">
      <div className="splitLayout">
        <div className="gridWrapper">
          {loading ? (
            <div
              className="spinner-border text-primary spinner-border-lg"
              role="status"
            ></div>
          ) : (
            <>
              <table className="recordGrid">
                <thead>
                  <tr>
                    {isAdmin && <th>Action</th>}
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
                  {data.map((record) => (
                    <tr key={record.id}>
                      {isAdmin && (
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteDialogOpen(true);
                              setSelectedId(record.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                          </button>
                        </td>
                      )}
                      <td>{record.date}</td>
                      <td>{record.time}</td>
                      <td>{record.machine}</td>
                      <td>{record.machineTemp}</td>
                      <td>{record.room}</td>
                      <td>{record.roomTemp}</td>
                      <td>{record.location}</td>
                      <td>{record.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => setShowReport(!showReport)}>
                {showReport ? "Hide Report" : "Generate Report"}
              </button>

              {/* Render Report component conditionally */}
              {showReport && <Report />}
            </>
          )}
        </div>
        <div className="editorLayout">
          <form className="formLayout">
            {/* Each field of the form for the user to input temp data */}
            <div>
              <label>User</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleFormChange}
              >
                <option selected=""></option>
                <option value="East Campus">East Campus</option>
                <option value="Lake Nona Campus">Lake Nona Campus</option>
                <option value="West Campus">West Campus</option>
                <option value="Osceola Campus">Osceola Campus</option>
              </select>
            </div>
            <div>
              <label>Room</label>
              <select
                name="room"
                value={formData.room}
                onChange={handleFormChange}
              >
                <option selected=""></option>
                <option value="Front Room">Front Room</option>    
                <option value="Back Room">Back Room</option>
                <option value="Lab A">Lab A</option>
                <option value="Lab B">Lab B</option>
                <option value="Storage Room">Storage Room</option>            
              </select>
            </div>
            <div>
              <label>Machine</label>
              <select
                name="machine"
                value={formData.machine}
                onChange={handleFormChange}
              >
              <option selected=""></option>
              <option value="Refrigerator">Refrigerator</option>
              <option value="Freezer_A">Freezer A</option>  
              <option value="Freezer_B">Freezer B</option>
              </select>
            </div>
            <div>
              <label>Machine Temp (℉)</label>
              <input
                type="number"
                name="machineTemp"
                value={formData.machineTemp}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Room Temp (℉)</label>
              <input
                type="number"
                name="roomTemp"
                value={formData.roomTemp}
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
            <div className="buttonLayout">
              <button type="button" onClick={handleSave}>
                Save
              </button>{" "}
              {/* Saves updated info added*/}
              <button type="button" onClick={handleClearForm}>
                Clear
              </button>{" "}
              {/*Clears all of the info added into the form */}
            </div>
          </form>
          {/* {isAdmin && ( // only shows the delete button if the user is an admin
            <button
              className="deleteButton"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete Selected Records
            </button>
          )} */}
        </div>
      </div>
      {deleteDialogOpen && ( // Delete confirmation printout to the user if they are an admin
        <div className="confirmDialog">
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
