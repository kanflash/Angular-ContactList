import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from './contact';
import { ContactService }  from './contact.service';
import { SharedContactService } from './sharedContact.service';

@Component({
  selector: 'contact-card',
  templateUrl: './contactCard.component.html'
})
export class ContactCardComponent implements OnInit {
  
  @Input() contacts: Contact[]; 

  id:String = "6";

  constructor(private sharedContactService: SharedContactService, private contactService: ContactService,private router: Router) { }

  ngOnInit(): void {

  }

  deleteContact = (_id) => {
    this.contactService.deleteContact(_id)
    .then(data => {
       this.sharedContactService.sharedContactTriggerAction({ _id, trig_val:'delete' });
       this.router.navigate(['contacts']);
    });
  }

}