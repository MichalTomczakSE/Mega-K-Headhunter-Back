export type gradingScale = 0 | 1 | 2 | 3 | 4 | 5;

export interface StudentDegreesEntity {
    id: string;
    email: string;
    courseCompletion: gradingScale;
    courseEngagement: gradingScale;
    projectDegree: gradingScale,
    teamProjectDegree: gradingScale;
    bonusProjectUrls: string | null;
    activationToken: string | null
}