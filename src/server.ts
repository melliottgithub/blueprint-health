import express from 'express';
import cors from 'cors';

import { Assessment } from './assessment';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const api = express.Router();

api.post('/', (req, res) => {
    const answers = req.body.answers;
    const assessment = new Assessment(answers);
    const scores = assessment.score();
    res.json(scores);
});

app.use('/assessment', api);

app.listen(5000, () => {
    console.log('Server started on port 5000');
});