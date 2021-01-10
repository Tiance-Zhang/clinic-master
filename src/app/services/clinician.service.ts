import { Injectable } from "@angular/core";
import { Clinician } from "../models/Clinician";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}


@Injectable({
  providedIn: "root"
})
export class ClinicianService {

  url: string
  constructor(private http: HttpClient) { }

  // METHOD
  getClinicians(): Observable<Clinician[]>{
    let url = "http://localhost:8080/clinicians";
    return this.http.get<Clinician[]>(url);
  }

  getClinician(id:number): Observable<Clinician[]>{
    let url = "http://localhost:8080/clinicians" + id;
    return this.http.get<Clinician[]>(url);
  }

  updateClinician(id:number, clinician:Clinician) {
    let url = "http://localhost:8080/clinicians" + id;
    return this.http.patch<Clinician[]>(url, clinician, httpOptions);
  }
  // deleteClinician(id:number) {
  //   let url = "http://localhost:8080/clinicians" + id;
  //   return this.http.delete<boolean>(url, httpOptions);
  // }

}