import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpResponse } from '../models/http-response.model';

import { environment } from '../../../environments/environment';
import { Observable, map, of } from 'rxjs';
import { Project } from '../../projects/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class SharedHttpService {
  baseUrl = environment.baseUrl;
  options = {
    params: {
      authRoute: true,
    },
  };

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<false | Project[]> {
    const url = this.baseUrl + '/projects';
    return this.http.get<BaseHttpResponse<Project[]>>(url, this.options).pipe(
      map((response) => {
        if (response.data) {
          return response.data;
        }
        return false;
      })
    );
  }
}
