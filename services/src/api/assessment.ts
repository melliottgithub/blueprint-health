import express from 'express';
import { Assessment } from '../assessments';

const api = express.Router();

api.post('/', async (req, res) => {
    const answers = req.body.answers;
    try {
        const assessment = await Assessment.new(answers);
        assessment.saveWithAnswers();
        const scores = assessment.score();
        res.json({
            scores,
            results: assessment.getResult()
        });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(400).json({
            error: err.message
        });
    }
});

export default api;