import dotenv from 'dotenv';
dotenv.config();
import Db from '../src/db';
import { Assessment, Question } from "../src/assessments";
import QuestionList from '../src/assessments/questions.json';
import { Domain } from '../src/assessments/types';

const answers: Record<string, string>[] = [
    {
        value: "1",
        question_id: "question_a"
    },
    {
        value: "0",
        question_id: "question_b"
    },
    {
        value: "2",
        question_id: "question_c"
    },
    {
        value: "3",
        question_id: "question_d"
    },
    {
        value: "1",
        question_id: "question_e",
    },
    {
        value: "0",
        question_id: "question_f"
    },
    {
        value: "1",
        question_id: "question_g"
    },
    {
        value: "0",
        question_id: "question_h"
    }
];

const correctScores: Record<string, number> = {
    depression: 1,
    anxiety: 2,
    mania: 5,
    substance_use: 0
};

beforeAll(async () => {
    await Db.sequelize.authenticate();
    await Db.sequelize.sync();

    await Db.sequelize.query('DELETE FROM answers');
    await Db.sequelize.query('DELETE FROM questions');
    await Db.sequelize.query('DELETE FROM assessments');

});

afterAll(async () => {
    await Db.sequelize.close();
});

test('Create a valid Assessment', async () => {
    const question = Question.new('question_x', Domain.depression);
    await question.save();

    const assessment = await Assessment.new([{
        value: "1",
        question_id: "question_x"
    }]);

    expect(assessment.answers).toHaveLength(1);
    await assessment.saveWithAnswers();

    const retrievedAssessment = await Assessment.findByPk(assessment.id);
    expect(retrievedAssessment).not.toBeNull();
    expect(retrievedAssessment?.id).toBe(assessment.id);
});


test('Assessment score', async () => {
    for (const question of QuestionList) {
        const q = Question.new(question.question_id, question.domain as Domain);
        await q.save();
    }
    const assessment = await Assessment.new(answers);
    const scores = assessment.score();

    for (const [domain, score] of Object.entries(scores)) {
        expect(score).toBe(correctScores[domain]);
    }
});
