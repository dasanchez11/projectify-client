import { Report } from './report.model';

export interface CreateReport {
  hours: number;
  projectId: string;
  week: string;
}
