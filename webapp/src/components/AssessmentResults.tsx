import React from "react";
import { Panel } from "primereact/panel";
import { AssessmentResult } from "../assessment/types";

type ResultsProps = {
  results: AssessmentResult;
};

function Results({ results }: ResultsProps) {
  return (
    results && (
      <Panel header="Assessment Results" className="p-2 form-section text-lg line-height-3 font-medium">
        <div className="flex flex-column m-0 p-2">
          {results.results?.map((result, index) => (
            <div key={index} className="font-medium mb-2">
              <label>{result}</label>
            </div>
          ))}
        </div>
      </Panel>
    )
  );
}

export default Results;
