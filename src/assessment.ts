import Questions from "./questions.json";

enum Domain {
    depression = "depression",
    anxiety = "anxiety",
    mania = "mania",
    substance_use = "substance_use",
}

class Question {
    constructor(public id: string, public domain: Domain) {
        if (!Domain.hasOwnProperty(domain)) throw Error('Invalid domain');

        this.id = id;
        this.domain = domain;
    }
}

class Answer {
    constructor(public question: Question, public value: number) {
        if (typeof value !== 'number') throw Error('Answer value must be a number');
        if (value < 0 || value > 4) throw Error('Answer value must be between 0 and 4');

        this.question = question;
        this.value = value;
    }
}

export class Assessment {
    answers: Answer[] = [];

    constructor(answers: Record<string, any>[]) {
        const questions = this.readQuestions();
        answers.forEach((answer: Record<string, any>) => {
            const question = questions[answer.question_id];
            if (question) {
                this.answers.push(new Answer(question, Number.parseInt(answer.value)));
            }
        });
    }

    readQuestions() : Record<string, Question>{
        const questions: Record<string, Question> = {};
        Questions.forEach((question: any) => {
            questions[question.question_id] = new Question(question.question_id, question.domain);
        });
        return questions;
    }

    score() : Record<Domain, number> {
        const scores: Record<Domain, number> = {
            depression: 0,
            anxiety: 0,
            mania: 0,
            substance_use: 0,
        };
        
        this.answers.forEach((answer: Answer) => {
            scores[answer.question.domain] += answer.value;
        });
        return scores;
    }
}