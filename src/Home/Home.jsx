import React, { useState, useEffect } from "react";
import { useEffectOnce, useList } from "react-use";
import { addDoc, deleteDoc, doc, getFirestore } from "firebase/firestore/lite";
import { collection, getDocs } from "firebase/firestore/lite";
import { Report } from "../Report/Report.jsx";
import { app } from "../firebase.js";
import "./Home.css";
import NavBar from "../NavBar/NavBar.jsx";
import {auth} from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth';

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


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClearForm = () => {
    setFormData({
      user: "",
      location: "",
      room: "",
      machine: "",
      machineTemp: 0,
      roomTemp: 0,
      date: "",
      time: "",
    });
  };

  const handleSave = async () => {
    await addDoc(collectionRef, formData);
    getDataFromFirebase();
    handleClearForm();
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "temperatures", selectedId));
    getDataFromFirebase();
  };

  return (
    <>
      <NavBar />
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
                    {data.map((record) => (
                      <tr key={record.id}>
                        <td>{record.date}</td>
                        <td>{record.time}</td>
                        <td>{record.machine}</td>
                        <td>{record.machineTemp}</td>
                        <td>{record.room}</td>
                        <td>{record.roomTemp}</td>
                        <td>{record.location}</td>
                        <td>{record.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="editorLayout">
            <form className="formLayout">
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
                </button>
                <button type="button" onClick={handleClearForm}>
                  Clear
                </button>
              </div>
            </form>
            <button
              onClick={() => setShowReport(!showReport)}
            >
              {showReport ? "Hide Report" : "Generate Report"}
            </button>
            {showReport && <Report />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
