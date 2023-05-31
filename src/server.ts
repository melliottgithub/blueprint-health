import express from 'express';
import cors from 'cors';
import Assessment from './api/assessment';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/assessment', Assessment);

app.listen(5000, () => {
    console.log('Server started on port 5000');
});