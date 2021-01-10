import { Injectable } from "@angular/core";
import { Participant } from "../models/Participant";
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
export class ParticipantService {
  participants: Observable<Participant[]>
  participant: Observable<Participant>

  url: string
  constructor(private http: HttpClient) { }

  // METHOD
  getParticipant(id: number): Observable<Participant>{
    let url = "http://localhost:8080/participants/" + id;
    return this.http.get<Participant>(url);
  }

  getParticipants(): Observable<Participant[]>{
    let url = "http://localhost:8080/participants";
    return this.http.get<Participant[]>(url);
  }

  getParticipantsInAlertOrder(): Observable<Participant[]>{
    let url = "http://localhost:8080/participants/alert";
    return this.http.get<Participant[]>(url);
  }

  updateParticipant(id:number, participant:Participant) {
    let url = "http://localhost:8080/participants" + id;
    return this.http.patch<Participant[]>(url, participant, httpOptions);
  }
  deleteParticipant(id:number) {
    let url = "http://localhost:8080/participants" + id;
    return this.http.delete<Participant[]>(url, httpOptions);
  }




}