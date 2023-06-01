import express from 'express';
import { Question } from '../assessments';

const api = express.Router();

api.get('/', async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.json(questions);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(400).json({
            error: err.message
        });
    }
});

export default api;