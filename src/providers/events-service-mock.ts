import {Injectable} from '@angular/core';
import Events from './mock-events';

@Injectable()
export class EventService {

    getEvents() {
        return Events;
    }

    
}
