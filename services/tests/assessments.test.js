"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("../src/db"));
const assessments_1 = require("../src/assessments");
const questions_json_1 = __importDefault(require("../src/assessments/questions.json"));
const types_1 = require("../src/assessments/types");
const answers = [
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
const correctScores = {
    depression: 1,
    anxiety: 2,
    mania: 5,
    substance_use: 0
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.sequelize.authenticate();
    yield db_1.default.sequelize.sync();
    yield db_1.default.sequelize.query('DELETE FROM answers');
    yield db_1.default.sequelize.query('DELETE FROM questions');
    yield db_1.default.sequelize.query('DELETE FROM assessments');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.sequelize.close();
}));
test('Create a valid Assessment', () => __awaiter(void 0, void 0, void 0, function* () {
    const question = assessments_1.Question.new('question_x', types_1.Domain.depression);
    yield question.save();
    const assessment = yield assessments_1.Assessment.new([{
            value: "1",
            question_id: "question_x"
        }]);
    expect(assessment.answers).toHaveLength(1);
    yield assessment.saveWithAnswers();
    const retrievedAssessment = yield assessments_1.Assessment.findByPk(assessment.id);
    expect(retrievedAssessment).not.toBeNull();
    expect(retrievedAssessment === null || retrievedAssessment === void 0 ? void 0 : retrievedAssessment.id).toBe(assessment.id);
}));
test('Assessment score', () => __awaiter(void 0, void 0, void 0, function* () {
    for (const question of questions_json_1.default) {
        const q = assessments_1.Question.new(question.question_id, question.domain);
        yield q.save();
    }
    const assessment = yield assessments_1.Assessment.new(answers);
    const scores = assessment.score();
    for (const [domain, score] of Object.entries(scores)) {
        expect(score).toBe(correctScores[domain]);
    }
}));
