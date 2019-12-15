import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule, MatDialog, MatDialogModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule , MatStepperModule, MatInputModule, MatCheckboxModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EventService } from '../providers/events-service-mock';
import { MemberService } from '../providers/members-service-mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddeventComponent } from './components/addevent/addevent.component';
import { RegisteredEventsComponent } from './components/registered-events/registered-events.component';


@NgModule({
  declarations: [
    AppComponent,
    AddeventComponent,
    RegisteredEventsComponent
  ],
  imports: [
    BrowserModule, OverlayModule,
    AppRoutingModule, MatDialogModule,
    BrowserAnimationsModule, MatCheckboxModule,
    MatTableModule, MatSlideToggleModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule ,
    MatStepperModule,
    MatInputModule
  ],
  entryComponents: [AddeventComponent, RegisteredEventsComponent],
  providers: [EventService, MemberService, MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
