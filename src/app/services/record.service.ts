import { Injectable } from '@angular/core';
import { Record } from "../models/Record";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  records: Observable<Record[]>
  record: Observable<Record>

  url:string

  constructor(private http: HttpClient) { }

    // METHOD
    getRecordsByParticipant(pid:number): Observable<Record[]>{
      let url = "http://localhost:8080/participants/" + pid + "/records";
      return this.http.get<Record[]>(url);
    }
  
    getWeeklyUsageByParticipant(pid:number): Observable<number[]>{
      let url = "http://localhost:8080/participants/" + pid + "/usage/lastweek";
      return this.http.get<number[]>(url);
    }
}
