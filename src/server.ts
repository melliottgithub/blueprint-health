import dotenv from 'dotenv';
dotenv.config();
import Db from './db';
import express from 'express';
import cors from 'cors';
import Assessment from './api/assessment';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/assessment', Assessment);

Db.sequelize.authenticate().then(() => {
    console.log('Connected to database');
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});