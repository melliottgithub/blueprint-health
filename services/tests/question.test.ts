import dotenv from 'dotenv';
dotenv.config();
import Db from '../src/db';
import { Question } from "../src/assessments/question";
import { Domain } from "../src/assessments/types";

beforeAll(async () => {
    await Db.sequelize.authenticate();
    await Db.sequelize.sync();

    await Db.sequelize.query('DELETE FROM questions');
});

afterAll(async () => {
    await Db.sequelize.close();
});

test('Create a valid question', () => {
    const randomId = Math.random().toString();
    const question = Question.new(randomId, Domain.depression);
    expect(question.id).toBe(randomId);
    expect(question.domain).toBe(Domain.depression);
});


test('Create an valid question', () => {
    try {
        Question.new('1', 'unknown' as Domain);
        expect(true).toBeFalsy();
    } catch (error) {
        const err = error as Error;
        expect(err.message).toBe('Invalid domain');
    }
});

test('Save a question to db', async () => {
    const question = Question.new('1', Domain.depression);
    await question.save();
    const retrievedQuestion = await Question.findByPk('1');
    expect(retrievedQuestion?.id).toBe('1');
    expect(retrievedQuestion?.domain).toBe(Domain.depression);
});