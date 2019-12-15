import { Component , OnInit, ViewChild} from '@angular/core';
import { EventService } from '../../../providers/events-service-mock';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogRef} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {

  events: Array<any>;
  eventDataSource: any;
  selection = new SelectionModel(true, []);
  eventsColumns: string[] = ['select', 'organizer', 'company', 'about', 'scheduled_at', 'duration', 'capacity'];
  selectedEvents: Array<any>;
  constructor(private eventService: EventService, public dialogRef: MatDialogRef<AddeventComponent>) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.events = this.eventService.getEvents();
    this.eventDataSource = new MatTableDataSource(this.events);

  }

   /** Whether the number of selected elements matches the total number of events. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.eventDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all events if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.eventDataSource.data.forEach(row => {
          if (!row.visible) {
            this.selection.select(row);
          }
        });
  }

  /** The label for the checkbox on the passed event */
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addSelectedEvents() {
    this.selectedEvents = this.selection.selected;
    this.dialogRef.close(this.selectedEvents );
  }

  closeEvents() {

    this.dialogRef.close([]);
  }
}
