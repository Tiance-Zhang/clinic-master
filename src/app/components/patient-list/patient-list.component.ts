import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Participant } from 'src/app/models/Participant';
import { ParticipantService } from "../../services/participant.service";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {
  participants: Participant[];
  dataSource: MatTableDataSource<Participant>;
  displayedColumns: string[] = ['index', 'username', 'alert', 'last_record_time', 'operation'];
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private participantService: ParticipantService,
    private router: Router
  ) { }


  ngOnInit(): void {

    // 
    this.participantService.getParticipants().subscribe(
      participants => {
        // convert iso time to utc time 
        if (participants != null) {
          for (let i = 0; i < participants.length; i++) {
            participants[i].last_record_time = new Date(participants[i].last_record_time).toLocaleString();
          }
        }
        this.participants = participants;
        this.dataSource = new MatTableDataSource<Participant>(this.participants);
        this.dataSource.paginator = this.paginator;
      })

  }

  sendNotification(id: number) {
    // get push token by id
    // send notification with this token
  }

  navigateToDetailPage(participant_id: number) {
    this.router.navigate(["/patients/detail", { id: participant_id }]);
  }


}
