import Questions from "./questions.json";

export enum Domain {
    depression = "depression",
    anxiety = "anxiety",
    mania = "mania",
    substance_use = "substance_use",
}

export enum AssessmentType {
    PHQ9 = "PHQ-9",
    ASRM = "ASRM",
    ASSIST = "ASSIST",
}

export type Level2Assessment = {
    type: AssessmentType,
    domain: Domain,
    minScore: number,
};

const level2Assessments: Level2Assessment[] = [
    {
        type: AssessmentType.PHQ9,
        domain: Domain.depression,
        minScore: 2,
    },
    {
        type: AssessmentType.ASRM,
        domain: Domain.mania,
        minScore: 2,
    },
    {
        type: AssessmentType.PHQ9,
        domain: Domain.anxiety,
        minScore: 2,
    },
    {
        type: AssessmentType.ASSIST,
        domain: Domain.substance_use,
        minScore: 1,
    },
];

export class Question {
    constructor(public id: string, public domain: Domain) {
        if (!Object.values(Domain).includes(domain)) throw Error('Invalid domain');

        this.id = id;
        this.domain = domain;
    }
}

export class Answer {
    constructor(public question: Question, public value: number) {
        if (typeof value !== 'number') throw Error('Answer value must be a number');
        if (value < 0 || value > 4) throw Error('Answer value must be between 0 and 4');

        this.question = question;
        this.value = value;
    }
}

export class Assessment {
    answers: Answer[] = [];

    constructor(answers: Record<string, string>[]) {
        const questions = this.readQuestions();
        answers.forEach((answer: Record<string, string>) => {
            const question = questions[answer.question_id];
            if (question) {
                this.answers.push(new Answer(question, Number.parseInt(answer.value)));
            }
        });
    }

    readQuestions() : Record<string, Question>{
        const questions: Record<string, Question> = {};
        Questions.forEach((question) => {
            questions[question.question_id] = new Question(question.question_id, question.domain as Domain);
        });
        return questions;
    }

    score() : Record<Domain, number> {
        const scores = {} as Record<Domain, number>;
        
        this.answers.forEach((answer: Answer) => {
            if (answer.question.domain in scores)
                scores[answer.question.domain] += answer.value;
            else
                scores[answer.question.domain] = answer.value;
        });
        return scores;
    }

    getResult() : AssessmentType[] {
        const scores = this.score();
        const result: AssessmentType[] = [];
        level2Assessments.forEach((assessment) => {
            if (scores[assessment.domain] >= assessment.minScore) {
                result.push(assessment.type);
            }
        });
        return result;
    }
}