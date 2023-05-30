import { Project } from '../../projects/models/project.model';
import { Report } from './report.model';

export type ReportResponse = Report & Omit<Project, '_id'>;
