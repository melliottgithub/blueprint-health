import { Assessment } from "../src/assessments";

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

test('Create a valid Assessment', () => {
    const assessment = new Assessment([{
        value: "1",
        question_id: "question_a"
    }]);

    expect(assessment.answers).toHaveLength(1);
});

test('Get Assessment Questions', () => {
    const assessment = new Assessment([]);
    const questions = assessment.readQuestions();

    expect(Object.keys(questions).length).toBeGreaterThan(0);
});

test('Assessment score', () => {
    const assessment = new Assessment(answers);
    const scores = assessment.score();

    for (const [domain, score] of Object.entries(scores)) {
        expect(score).toBe(correctScores[domain]);
    }
});