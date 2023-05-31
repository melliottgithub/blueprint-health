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
    try {
        const assessment = new Assessment(answers);
        const scores = assessment.score();
        res.json({
            scores,
            results: assessment.getResult()
        });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({
            error: err.message
        });
    }
});

app.use('/assessment', api);

app.listen(5000, () => {
    console.log('Server started on port 5000');
});