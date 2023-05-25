import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthHttpService {
  private readonly baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  login() {}

  register() {}
}
