import React, { useEffect } from "react";
import { Button } from 'primereact/button';
import { Message } from "primereact/message";
import { Answer, Assessment, AssessmentResult, Question, ScreenerForm, Section } from "./types";
import { createAssessment, getQuestions } from "../services";
import bpds from "./bpds.json";
import FormSection from "../components/FormSection";
import AssessmentResults from "../components/AssessmentResults";

const Screener = bpds as unknown as ScreenerForm;

function Module() {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);
  const [currentSection, setCurrentSection] = React.useState<Section | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState<number>(0);
  const [assessment, setAssessment] = React.useState<Assessment>({ answers: []});
  const [message, setMessage] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<AssessmentResult | null>(null);

  useEffect(() => {
    setCurrentSection(Screener.content.sections[0]);
    setCurrentQuestionIdx(0);

    getQuestions().then((questions) => {
      setQuestions(questions);
      setCurrentQuestionIdx(0);
    });

  }, []);

  const getCurrentAnswer = (): Answer => {
    let currentAnswer = assessment.answers[currentQuestionIdx];
    if (!currentAnswer && questions) {
      currentAnswer = { value: "", question: questions[currentQuestionIdx] };
    }
    return currentAnswer;
  }

  const onAnswerHandler = (value: string) => {
    if (questions) {
      const newAssessment = { ...assessment };
      let answer = newAssessment.answers.find((entry) => {
        return entry.question.id === questions[currentQuestionIdx].id;
      });

      if (answer) {
        answer.value = value;
      } else {
        newAssessment.answers.push({
          value, question: questions[currentQuestionIdx]
        });
      }

      setAssessment(newAssessment);

      if (currentQuestionIdx < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIdx(currentQuestionIdx + 1);
        }, 100);
      }
    }   
  }

  const onSubmitHandler = async () => {
    console.log("Submit assessment", assessment);
    try {
      const results = await createAssessment(assessment);
      if (results.error) setMessage(results.error);
      else {
        setResults(results);
        setMessage(null);
      }
      
    } catch (error) {
      console.log(error);
      const err = error as Error;
      setMessage(err.message);
    }
  };

  const currentAnswer = getCurrentAnswer();
  const isLastQuestion = questions && (currentQuestionIdx === questions?.length - 1);
  const allAnswers = questions && (assessment.answers.length === questions?.length);

  return (
    <div className="flex flex-column m-0 surface-50 min-h-screen">
      <h1 className="ml-2 text-900 font-medium">
        {Screener.content.displayName}
      </h1>
      { /*<pre>
        assessment: {JSON.stringify(assessment, null, 2)}
  </pre> */}
      {!message && isLastQuestion && (
          <Message severity="info" text="This is the last question." />
      )}
      {message && (
          <Message severity="error" text={message} />
      )}
      { results && (
        <AssessmentResults results={results} />
      )}
      { !results && (
      <FormSection
        section={currentSection}
        answer={currentAnswer} 
        onAnswer={onAnswerHandler}
      />
      )} 
      {!results && isLastQuestion && allAnswers && (
          <Button label="Submit" className="p-button-raised w-4 mx-auto my-3"
            onClick={onSubmitHandler}
          />
      )}
    </div>
  );
}

export default Module;
