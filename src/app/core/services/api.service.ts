import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(`${environment.api}${path}`, {params})
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: {} = {}): Observable<any> {
    return this.httpClient.put(
      `${environment.api}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: {} = {}): Observable<any> {
    return this.httpClient.post(
      `${environment.api}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.httpClient.delete(
      `${environment.api}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
