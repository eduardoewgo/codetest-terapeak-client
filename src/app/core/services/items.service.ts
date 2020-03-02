import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Item} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private path = '/items';

  constructor(private apiService: ApiService) {
  }

  // Couldn't use the interface as the type
  // https://github.com/microsoft/TypeScript/issues/15300
  find(
    params: {
      keyword?: string, minPrice?: string, maxPrice?: string,
      location?: string, condition?: string[], offset: string, limit: string
    } = {
      offset: '0', limit: '10'
    }): Observable<Item[]> {
    return this.apiService.get(`${this.path}`, new HttpParams({fromObject: params}));
  }
}
