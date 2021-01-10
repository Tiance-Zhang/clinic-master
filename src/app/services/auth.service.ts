import { Injectable } from "@angular/core";
import { Clinician } from "../models/Clinician";
import { Observable } from "rxjs";
import { HttpClient,  HttpHeaders, HttpParams } from "@angular/common/http"

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: "root"
})
export class AuthService {

  url: string
  constructor(private http: HttpClient) { }

  loginClinician(account:Clinician): Observable<boolean>{
    let url = "http://localhost:8080/login"
    console.log(account);
    return this.http.post<boolean>(url, account, httpOptions);
  }
}
