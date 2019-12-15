import { Component, OnInit, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-registered-events',
  templateUrl: './registered-events.component.html',
  styleUrls: ['./registered-events.component.scss']
})
export class RegisteredEventsComponent implements OnInit {

  eventsColumns: string[] = ['organizer', 'company', 'about', 'scheduled_at', 'duration', 'capacity'];

  constructor(
    public dialogRef: MatDialogRef<RegisteredEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public eventDataSource: {}) {
      console.log(this.eventDataSource);
     }

  ngOnInit() {
  }

}
