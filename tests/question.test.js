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
const question_1 = require("../src/assessments/question");
const types_1 = require("../src/assessments/types");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.sequelize.authenticate();
    yield db_1.default.sequelize.sync();
    yield db_1.default.sequelize.query('DELETE FROM questions');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.sequelize.close();
}));
test('Create a valid question', () => {
    const randomId = Math.random().toString();
    const question = question_1.Question.new(randomId, types_1.Domain.depression);
    expect(question.id).toBe(randomId);
    expect(question.domain).toBe(types_1.Domain.depression);
});
test('Create an valid question', () => {
    try {
        question_1.Question.new('1', 'unknown');
        expect(true).toBeFalsy();
    }
    catch (error) {
        const err = error;
        expect(err.message).toBe('Invalid domain');
    }
});
test('Save a question to db', () => __awaiter(void 0, void 0, void 0, function* () {
    const question = question_1.Question.new('1', types_1.Domain.depression);
    yield question.save();
    const retrievedQuestion = yield question_1.Question.findByPk('1');
    expect(retrievedQuestion === null || retrievedQuestion === void 0 ? void 0 : retrievedQuestion.id).toBe('1');
    expect(retrievedQuestion === null || retrievedQuestion === void 0 ? void 0 : retrievedQuestion.domain).toBe(types_1.Domain.depression);
}));
