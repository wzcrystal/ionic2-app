import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class WorkflowService {
  constructor(private http: HttpClient){

  }

  login(url:string): Observable<{}>{
    return this.http.post(url,{});
  }

}
