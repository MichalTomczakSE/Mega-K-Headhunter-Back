export interface StudentDegreesEntity {
    id: string;
    email: string;
    courseCompletion: 0 | 1 | 2 | 3 | 4 | 5;
    courseEngagement: 0 | 1 | 2 | 3 | 4 | 5;
    projectDegree: 0 | 1 | 2 | 3 | 4 | 5,
    teamProjectDegree: 0 | 1 | 2 | 3 | 4 | 5;
    bonusProjectUrls: string | null;
    activationToken: string | null
}