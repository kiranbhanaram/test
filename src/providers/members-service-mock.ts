import {Injectable} from '@angular/core';
import Members from './mock-members';

@Injectable()
export class MemberService {

    getMembers() {
        return Members;
    }


}
