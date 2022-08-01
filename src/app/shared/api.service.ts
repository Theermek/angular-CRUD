import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postCompany(data : any) {
    return this.http.post<any>('http://localhost:3000/posts', data)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  getCompany() {
    return this.http.get<any>('http://localhost:3000/posts')
    .pipe(map((res: any) => {
      return res;
    }))
  }

  deleteCompany(id : number) {
    return this.http.delete<any>('http://localhost:3000/posts/'+id)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  updateCompany(data : any) {
    return this.http.put<any>('http://localhost:3000/posts', data)
    .pipe(map((res: any) => {
      return res;
    }))
  }

}
