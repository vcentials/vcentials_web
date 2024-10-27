import React, { useState } from 'react';
import { Button, Form, Table, Alert } from 'react-bootstrap';
import styles from './Admin.module.css';
import NavBar from '../NavBar/NavBar.jsx'

const Admin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddUser = () => {
        if (!username || !email) {
            setError('Please fill in both fields');
            setSuccess('');
            return;
        }

        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            setError('Username or Email already exists');
            setSuccess('');
            return;
        }

        const newUser = { username, email, role };
        setUsers([...users, newUser]);
        setUsername('');
        setEmail('');
        setRole('User');
        setError('');
        setSuccess('User added successfully!');
    };

    return (

        <>
        <NavBar/>
         <div className="container">
            <h1 className={styles.adminTitle}>Admin Setup</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={handleAddUser}>
                    Add User
                </Button>
            </Form>

            <Table striped bordered hover className={styles.userTable}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td> {/* Display role */}
                        </tr>
                    ))}
                </tbody>
            </Table>
         </div>
        </>
       
     );
};
export default Admin;