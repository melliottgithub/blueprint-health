import { Domain, Question } from "../src/assessments";

test('Create a valid question', () => {
    const question = new Question('1', Domain.depression);
    expect(question.id).toBe('1');
    expect(question.domain).toBe(Domain.depression);
});


test('Create an valid question', () => {
    try {
        new Question('1', 'unknown' as Domain);
        expect(true).toBeFalsy();
    } catch (error) {
        const err = error as Error;
        expect(err.message).toBe('Invalid domain');
    }
});
