import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EMPTY, catchError, finalize, map } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { ProjectService } from './project.service';
import { BaseHttpResponse } from '../../shared/models/http-response.model';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectHttpService {
  baseUrl = environment.baseUrl;
  options = {
    params: {
      authRoute: true,
    },
  };
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private projectService: ProjectService
  ) {}

  getAllProjects() {
    const url = this.baseUrl + '/projects';
    this.projectService.setIsLoading$(true);
    return this.http.get<BaseHttpResponse<Project[]>>(url, this.options).pipe(
      map((response) => {
        if (response.data) {
          return response.data;
        }
        return false;
      }),
      catchError((error) => {
        this.notificationService.openSnackBar(error.error.message, true);
        return EMPTY;
      }),
      finalize(() => {
        this.projectService.setIsLoading$(false);
      })
    );
  }
}
