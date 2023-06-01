import {  Model, DataTypes } from "sequelize";
import Db from '../db';
import { Question } from "./question";


export class Answer extends Model {
    question!: Question;
    value!: number;
    assessment_id!: number;
    question_id!: string;

    static new(question: Question, value: number): Answer {
        if (typeof value !== 'number') throw Error('Answer value must be a number');
        if (value < 0 || value > 4) throw Error('Answer value must be between 0 and 4');

        const answer = new Answer();
        answer.question = question;
        answer.question_id = question.id;
        answer.value = value;
        return answer;
    }
}

Answer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize: Db.sequelize, tableName: 'answers' });
