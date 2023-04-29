export type GradingScale = 0 | 1 | 2 | 3 | 4 | 5;

export interface StudentDegreesEntity {
    id: string;
    courseCompletion: GradingScale;
    courseEngagement: GradingScale;
    projectDegree: GradingScale,
    teamProjectDegree: GradingScale;
    bonusProjectUrls: string | null;
    activationToken: string | null
}