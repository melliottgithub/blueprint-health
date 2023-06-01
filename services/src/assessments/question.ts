import {  Model, DataTypes } from "sequelize";
import { Domain } from "./types";
import Db from '../db';

export class Question extends Model {
    id!: string;
    domain!: Domain;

    static new(id: string, domain: Domain) {
        if (!Object.values(Domain).includes(domain)) throw Error('Invalid domain');
        const question = new Question();
        question.id = id;
        question.domain = domain;
        return question;
    }

    static async getQuestionLookup() {
        const questions = await Question.findAll();
        const questionLookup: Record<string, Question> = {};
        questions.forEach((question) => {
            questionLookup[question.id] = question;
        });
        return questionLookup;
    }
}

Question.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: Db.sequelize, tableName: 'questions' });
