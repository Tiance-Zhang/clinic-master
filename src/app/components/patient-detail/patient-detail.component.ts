import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecordService } from '../../services/record.service';
import { Record } from 'src/app/models/Record';
import { ParticipantService } from '../../services/participant.service';

// import { Participant } from 'src/app/models/Participant';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  id: number;
  // participant: Participant
  username: string;
  records: Record[];
  recordsCount: number;
  isAlert = false;
  lastWeekUsage: number[]; // attention
  dataSource: MatTableDataSource<Record>;
  displayedColumns: string[] = ['index', 'location', 'time'];

  lineChartOptions = {
    salesShowVerticalLines: false,
    responsive: true,
  };
  lineChartLabels = ['7th Day', '6th Day', '5th Day', '4th Day', '3rd Day', '2nd Day', '1st Day'];
  lineChartLegend = true;

  lineChartType = 'line';
  lineChartData = [];
  lineChartColors = [{backgroundColor: 'rgba(0,13,122,0.5)'}];

  constructor(
    private recordService: RecordService,
    private participantService: ParticipantService,
    private route: ActivatedRoute,

  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    // get id from template
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // get the participant
    this.recordService.getWeeklyUsageByParticipant(this.id).subscribe(usage => {
      this.lineChartData =
        [
          { data: usage, label: 'Report Frequency of Last Seven Days' },
        ];
    });
    this.participantService.getParticipant(this.id).subscribe(participant => {
      if (participant != null && participant.alert_days >= 2) {
        this.isAlert = true;
      }
      if (participant != null) {
        this.username = participant.username;
      }
      // this.participant = participant;
      // console.log(this.participant);
    });
    // get all records in reversed time order
    this.recordService.getRecordsByParticipant(this.id).subscribe(records => {
      if (records != null) {
        this.recordsCount = records.length;

        // covert iso time to utc time
        for (let i = 0; i < records.length; i++) {
          records[i].time = new Date(records[i].time).toLocaleString();
        }
      }
      this.records = records;
      this.dataSource = new MatTableDataSource<Record>(this.records);
      this.dataSource.paginator = this.paginator;
    });


    // show the bar chart in the right sidebar
    this.recordService.getWeeklyUsageByParticipant(this.id).subscribe(lastWeekUsage => {
      this.lastWeekUsage = lastWeekUsage;
    });

  }

}
