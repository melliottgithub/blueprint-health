import express from 'express';
import { Assessment } from '../assessments';

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

export default api;