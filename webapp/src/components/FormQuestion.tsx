import React from "react";
import { RadioButton } from 'primereact/radiobutton';
import { Question, Choice } from "../assessment/types";

type FormQuestionProps = {
  question: Question;
  choices: Choice[];
  value: string | null;
  onChange: (value: string) => void;
};

function FormQuestion(props: FormQuestionProps) {
  return (
    <div className="flex flex-column m-0 p-0">
      <h2 className="ml-2 text-900 font-medium">{props.question.title}</h2>
      {props.choices.map((choice, index) => (
        <div key={index} className="flex flex-row m-0 ml-2 p-1">
          <RadioButton
            type="radio"
            inputId={choice.value}
            name={props.question.id}
            value={choice.value}
            checked={props.value === choice.value}
            onChange={() => props.onChange(choice.value)}
          />
          <label htmlFor={choice.value} className="ml-2">{choice.title}</label>
        </div>
      ))}
    </div>
  );
}

export default FormQuestion;
