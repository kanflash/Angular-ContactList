import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { Contact } from './contact';

@Injectable()
export class SharedContactService {

  constructor() { }

  private _sharedContactTriggerAction = new Subject();
  sharedContactTriggerAction$ = this._sharedContactTriggerAction.asObservable();

  sharedContactTriggerAction(obj) {
    this._sharedContactTriggerAction.next(obj);
  }

}
