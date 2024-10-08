const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://sujishri003:Suji1707@cluster0.jj2fo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Update with your credentials
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err));

// Mongoose schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// POST route to save contact form data
app.post('/api/contact', (req, res) => {
    const { name, phone, email, subject, message } = req.body;

    const newContact = new Contact({
        name,
        phone,
        email,
        subject,
        message
    });

    newContact.save()
        .then(() => res.json({ msg: 'Message saved successfully!' }))
        .catch(err => res.status(400).json({ error: 'Failed to save message' }));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
