import React from "react";
import { Answer, Section } from "../assessment/types";
import { Panel } from "primereact/panel";
import FormQuestion from "./FormQuestion";
import "./formsection.css";

type FormSectionProps = {
  section: Section | null;
  answer: Answer | null;
  onAnswer: (value: string) => void;
};

function FormSection({ section, answer, onAnswer }: FormSectionProps) {
  return (
    section && answer && (
      <Panel header={section.title} className="p-2 form-section text-lg line-height-3 font-medium">

          <FormQuestion question={answer.question} choices={section.choices} 
            onChange={onAnswer} value={answer.value}
          />

      </Panel>
    )
  );
}

export default FormSection;
