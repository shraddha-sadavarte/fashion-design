import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Models
const Design = sequelize.define('Design', {
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT }
});

const Booking = sequelize.define('Booking', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false }
});

sequelize.sync().then(() => console.log('Database connected and synced'));

// API Routes

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.get('/designs', async (req, res) => {
    const designs = await Design.findAll();
    res.json(designs);
});

app.post('/designs', async (req, res) => {
    const { title, image, description } = req.body;
    const design = await Design.create({ title, image, description });
    res.json(design);
});

app.post('/bookings', async (req, res) => {
    const { name, email, date } = req.body;
    const booking = await Booking.create({ name, email, date });
    res.json(booking);
});

app.get('/bookings', async (req, res) => {
    const bookings = await Booking.findAll();
    res.json(bookings);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));