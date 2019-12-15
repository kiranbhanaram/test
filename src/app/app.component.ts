import { Component , OnInit, ViewChild} from '@angular/core';
import { EventService } from '../providers/events-service-mock';
import { MemberService } from '../providers/members-service-mock';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material';
import { AddeventComponent } from './components/addevent/addevent.component';
import { RegisteredEventsComponent } from './components/registered-events/registered-events.component';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'members-events-App';
  events: Array<any>;
  members: Array<any> = [];
  memberDataSource: any;
  eventDataSource: any;
  openedDialogueRowObj: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  membersColumns: string[] = ['name', 'age', 'phone', 'email', 'company', 'action', 'registeredEvents', 'locateOnCalendar'];
  eventsColumns: string[] = ['organizer', 'company', 'about', 'scheduled_at', 'duration', 'capacity', 'hideShowEvent'];

  constructor(private eventService: EventService, private memberService: MemberService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getMembersEventsData();
  }

  getMembersEventsData() {
    this.members = this.memberService.getMembers();
    this.events = this.eventService.getEvents();
    this.memberDataSource = new MatTableDataSource(this.members);
    this.memberDataSource.sort = this.sort;
    this.eventDataSource = new MatTableDataSource(this.events);
  }

  applyFilter(filterValue: string) {
    this.memberDataSource.filter = filterValue.trim().toLowerCase();

    if (this.memberDataSource.filter.trim().length >0)
    {
      const filteredData = this.memberDataSource.filteredData;
      const filterEvents = [];
      filteredData.forEach(memberElement => {
        memberElement.events.forEach(memberEventElement => {
          this.events.forEach(eventElement => {
            if (memberEventElement._id === eventElement._id) {
              filterEvents.push(eventElement);
            }
          });
        });
        
       });

       this.eventDataSource = new MatTableDataSource(filterEvents);
    }
    else {
      this.eventDataSource = new MatTableDataSource(this.events);
    }
    
     

    
  }

  deleteMember(rowObj) {
      this.members.forEach((element, index, members) => {
          if (rowObj.email === element.email ) {
            members.splice(index, 1);
            this.memberDataSource = new MatTableDataSource(this.members);
            this.memberDataSource.sort = this.sort;
          }
      });

  }

  openAddDialogue(rowObj) {
    
    this.openedDialogueRowObj = rowObj;

    this.events.forEach( (eventElement, index) => {
        this.events[index].added = false;
    });

    this.openedDialogueRowObj.events.forEach( (selectedEventElemnt) => {
      this.events.forEach( (eventElement, index) => {
        if (selectedEventElemnt._id === eventElement._id) {
          this.events[index].added = true;
        }
      });
    });

    if (this.openedDialogueRowObj.events.length <= 0) {
        this.events.forEach( (eventElement, index) => {
            this.events[index].added = false;
        });
    }
    

    const dialogRef = this.dialog.open(AddeventComponent, {
      data: this.events,
      width: '90%',
      panelClass : 'addEvent'
    });

    dialogRef.afterClosed().subscribe(data =>  {
     data.forEach(selectedEventElemnt => {
      selectedEventElemnt.added = true;
      this.openedDialogueRowObj.events.push(selectedEventElemnt);
      this.events.forEach( (eventElement, index) => {
        if (selectedEventElemnt._id === eventElement._id) {
          this.events[index].capacity = this.events[index].capacity - 1;
        }
      });
     });
     
     this.eventDataSource = new MatTableDataSource(this.events);
    });
  }

  openRegisteredEventsDailogue(rowObj) {

    const visibleEvents = [];
    rowObj.events.forEach(element => {
      element.visible ? visibleEvents.push(element) : false ;
    });
    const dialogRef = this.dialog.open(RegisteredEventsComponent, {
      data: visibleEvents,
      width: '60%',
      panelClass : 'addEvent'
    });
  }

  handleEventVisibility(slideToggleObh, rowObj) {
    rowObj.visible = slideToggleObh.checked;
  }

  filterMemberEvents(rowObj) {

    const registeredEvents = [];
    const that = this;
    rowObj.events.forEach(memberElement => {
     that.events.forEach(eventElement => {
       if (memberElement._id === eventElement._id) {
         registeredEvents.push(eventElement);
       }
     });
    });
    this.eventDataSource = new MatTableDataSource(registeredEvents);
   }

}
