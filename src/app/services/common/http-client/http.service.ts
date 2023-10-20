import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  public httpHeadersToken = new HttpHeaders({ 'Content-Type': 'application/json' });

  public httpHeadersAnon = new HttpHeaders({ 'Content-Type': 'application/json', 'Anonymous': '' });

}
