import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseurl="http://127.0.0.1:8000";

  constructor() { }
}
