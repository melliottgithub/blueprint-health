import {  Model, DataTypes } from "sequelize";
import Db from '../db';
import { Question } from "./question";
import { Answer } from "./answer";
import { AssessmentType, Domain, Level2Assessment } from "./types";
// import Questions from './questions.json';

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

export class Assessment extends Model {
    id!: number;
    answers!: Answer[];

    static async new(answers: Record<string, string>[]): Promise<Assessment> {
        const assessment = new Assessment();
        assessment.answers = [];
        const questions = await Question.getQuestionLookup();
        answers.forEach((answer: Record<string, string>) => {
            const question = questions[answer.question_id];
            if (question) {
                const entry = Answer.new(question, Number.parseInt(answer.value));
                assessment.answers.push(entry);
            }
        });
        return assessment;
    }

    /*
    readQuestions() : Record<string, Question>{
        const questions: Record<string, Question> = {};
        Questions.forEach((question) => {
            questions[question.question_id] = new Question(question.question_id, question.domain as Domain);
        });
        return questions;
    }
    */

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

    async saveWithAnswers(): Promise<void> {
        await this.save();
        this.answers.forEach((answer) => answer.assessment_id = this.id);
        await Promise.all(this.answers.map((answer) => answer.save()));
    }
}

Assessment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, { sequelize: Db.sequelize, tableName: 'assessments' });

Assessment.hasMany(Answer, { foreignKey: 'assessment_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });