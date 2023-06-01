export enum Domain {
    depression = "depression",
    anxiety = "anxiety",
    mania = "mania",
    substance_use = "substance_use",
}

export enum AssessmentType {
    PHQ9 = "PHQ-9",
    ASRM = "ASRM",
    ASSIST = "ASSIST",
}

export type Level2Assessment = {
    type: AssessmentType,
    domain: Domain,
    minScore: number,
};