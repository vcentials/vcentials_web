import React, { useState } from 'react';
import axios from 'axios';
import Styles from './Email.module.css';

const Email = () => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [previewContent, setPreviewContent] = useState('');
    const [reportTitle, setReportTitle] = useState('');

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newAttachments = files.map(file => ({
            name: file.name,
            data: file,
        }));
        setAttachments(prev => [...prev, ...newAttachments]);
    };

    const handleRemovePreview = () => {
        setPreviewContent('');
        setReportTitle('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        attachments.forEach(att => {
            formData.append('attachments', att.data);
        });

        formData.append('recipient', recipient);
        formData.append('subject', subject);
        formData.append('body', body);

        try {
            await axios.post('/api/send-email', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(`Email sent successfully to ${recipient}`);
        } catch (error) {
            alert(`Failed to send email: ${error.message}`);
        }

        setAttachments([])
    };

    return (
        <div className="email-view">
            <h1>Compose Email</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>To:</label>
                    <input
                        type="email"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Attachments:</label>
                    <input
                        type="file"
                        multiple
                        accept=".pdf,image/jpeg,image/png,text/plain,.doc,.docx"
                        onChange={handleFileChange}
                    />
                    <ul>
                        {attachments.map((att, index) => (
                            <li key={index}>{att.name}</li>
                        ))}
                    </ul>
                </div>
                {previewContent && (
                    <div className="preview">
                        <h3>Preview: {reportTitle}</h3>
                        <div dangerouslySetInnerHTML={{ __html: previewContent }} />
                        <button type="button" onClick={handleRemovePreview}>
                            Remove Preview
                        </button>
                    </div>
                )}
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Email;