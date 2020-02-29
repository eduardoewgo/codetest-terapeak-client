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

  find(params: {
    keyword?: string,
    minPrice?: string,
    maxPrice?: string,
    location?: string,
    condition?: string[]
  } = {}): Observable<Item[]> {
    return this.apiService.get(`${this.path}`, new HttpParams({fromObject: params}));
  }
}
