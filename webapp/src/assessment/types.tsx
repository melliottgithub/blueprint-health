export type ScreenerForm = {
  id: string;
  name: string;
  fulllName: string;
  disorder: string;
  content: {
    displayName: string;
    sections: Section[];
  }
};

export type Assessment = {
  id?: number;
  answers: Answer[];
};

export type AssessmentResult = {
  results: string[];
}

export type Section = {
  type: string;
  title: string;
  choices: Choice[];
  questions: Question[];
  answers: Answer[];
};

export type Question = {
  id: string;
  title: string;
};

export type Answer = {
  value: string;
  question: Question;
};

export type Choice = {
  value: string;
  title: string;
};
