import { GradingScale } from '../../types';

export interface UserInterface {
  type: string;
  data: {
    email?: string;
    fullName?: string;
    company?: string;
    courseCompletion?: GradingScale;
    courseEngagement?: GradingScale;
    projectDegree?: GradingScale;
    teamProjectDegree?: GradingScale;
    bonusProjectUrls?: string;
  }[];
}
