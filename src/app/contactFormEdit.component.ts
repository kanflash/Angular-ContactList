import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml, SafeUrl} from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Contact }  from './contact';
import { ContactService }  from './contact.service';
import { SharedContactService } from './sharedContact.service';
import { fadeInAnimation } from './fade-in-animation';


@Component({
  selector: 'contact-form-edit',
  templateUrl: './contactFormEdit.component.html',
  animations: [
    fadeInAnimation 
  ]
})
export class ContactFormEditComponent implements OnInit {
  dummySVGURL = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcyIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MiAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUzNGYwNjk1OTQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTM0ZjA2OTU5NCI+PHJlY3Qgd2lkdGg9IjE3MiIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI2MC4wNDY4NzUiIHk9Ijk0LjM5Njg3NSI+MTcyeDE4MDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==';

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

  private dummySVG: SafeUrl;

  
  modified:Boolean = false;
  loading:Boolean = false;
  errors:Object = {};
  

  constructor(private sanitizer: DomSanitizer, private sharedContactService: SharedContactService, private contactService: ContactService, private route: ActivatedRoute, private router: Router) { 
    this.dummySVG = sanitizer.bypassSecurityTrustUrl(this.dummySVGURL);
  }

  ngOnInit(): void {
    //console.log('ContactFormEditComponent');
   this.route.paramMap
    .switchMap((params: ParamMap) => {
      //debugger;
    if(params.has('id'))
      return this.contactService.fetchContact(params.get('id'));
    else
      return [];
    }).subscribe((contact: Contact) => this.contact = contact);
  }

  handleChange = (e) => {
    //debugger;
      if (!!this.errors[e.target.name]) {
          let errors = Object.assign({}, this.errors);
          delete errors[e.target.name];
      } 
      else {
              this.modified = true;
      }
  }

  handleSubmit = (e) => {
        //debugger;
        e.preventDefault();
        // validation
        let errors:any = {};
        if (this.contact.fname === '') errors.fname = "Can't be empty";
        if (this.contact.lname === '') errors.lname = "Can't be empty";
        if (this.contact.dt === '') errors.dt = "Can't be empty";
        if (this.contact.company === '') errors.company = "Can't be empty";
        if (this.contact.email === '') errors.email = "Can't be empty";
        if (this.contact.phone === '') errors.phone = "Can't be empty";
        if (this.contact.cover === '') errors.cover = "Can't be empty";

        this.errors = Object.assign({}, errors);

        const isValid = Object.keys(errors).length === 0

        if (isValid) {
          const { _id, fname, lname, dt, company, email, phone, cover } = this.contact;
          debugger;
          if (_id) {
            this.contactService.updateContact({ _id, fname, lname, dt, company, email, phone, cover })
            .then(contact => {
              this.contact = contact;
              this.sharedContactService.sharedContactTriggerAction({ contact:this.contact, trig_val:'update' });
              this.router.navigate(['contacts/'+_id+'/detail']);
            })
            .catch((err) => {
              debugger;
              this.errors['global'] = err.json().errors.global;
              //err.toPromise().then(response => response.json()._body(({errors}) => this.errors = errors.global)
            });
          } else {
            this.contactService.saveContact({ _id, fname, lname, dt, company, email, phone, cover })
            .then(contact => {
              this.contact = contact;
              this.sharedContactService.sharedContactTriggerAction({ contact:this.contact, trig_val:'add' });
              this.router.navigate(['contacts/'+this.contact._id+'/detail']);
            });
          }
          
        }
  }

}