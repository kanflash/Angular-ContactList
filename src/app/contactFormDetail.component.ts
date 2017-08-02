import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Contact }  from './contact';
import { ContactService }  from './contact.service';
import { SharedContactService } from './sharedContact.service';

@Component({
  selector: 'contact-form-detail',
  templateUrl: './contactFormDetail.component.html'
})
export class ContactFormDetailComponent implements OnInit {

  @Input()
  contact: Contact = {
    _id: '',
    fname: '',
    lname: '',
    dt: '',
    company: '',
    email: '',
    phone: '',
    cover: ''
  };
  
  _id = '';

  constructor(private sharedContactService: SharedContactService, private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //console.log('ContactFormDetailComponent');
    /*this.route.paramMap.switchMap((params: ParamMap) => {
      
        console.log("switchMap");
        let _id = params.get('id');
        this.contactService.fetchContact(_id)
    });*/

   this.route.paramMap
    .switchMap((params: ParamMap) => {
      return this.contactService.fetchContact(params.get('id'));
    }).subscribe((contact: Contact) => this.contact = contact);
  }

  deleteContact = (_id) => {
    this.contactService.deleteContact(_id)
    .then(data => {
      this.sharedContactService.sharedContactTriggerAction({ _id, trig_val:'delete' });
      this.router.navigate(['contacts']);
    });
  }

}