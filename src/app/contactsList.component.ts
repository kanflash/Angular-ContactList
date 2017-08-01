import { Component, OnInit, Input } from '@angular/core';

import { ContactCardComponent }   from './contactCard.component';
import { Contact } from './contact';

@Component({
  selector: 'contacts-list',
  templateUrl: './contactsList.component.html'
})
export class ContactsListComponent implements OnInit {
  
  private _contacts: Contact[];
  showContacts: Boolean;

  @Input()
  set contacts(contacts: Contact[]) {
    this._contacts = contacts || [];
    this. showContacts = this._contacts.length > 0 || false;  
  }

  get contacts(): Contact[] { return this._contacts; }
  
  constructor() { }

  ngOnInit(): void {

  }
}