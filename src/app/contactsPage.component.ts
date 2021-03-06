import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ContactsListComponent }   from './contactsList.component';
import { ContactFormPageComponent }   from './contactFormPage.component';
import { Contact }        from './contact';
import { ContactService } from './contact.service';
import { SharedContactService } from './sharedContact.service';


@Component({
  selector: 'contacts-page',
  templateUrl: './contactsPage.component.html'
})
export class ContactsPageComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  subscription: Subscription;
  sub: Subscription;
  data$: Observable<string>;
  contactActionStatusText:String = null;
  contactActionStatusVisible:Boolean = false;
  
  constructor(private contactService: ContactService,private sharedContactService:SharedContactService, private route: ActivatedRoute, private router: Router) { 
  
    this.subscription = sharedContactService.sharedContactTriggerAction$.subscribe( data => {
        this.updateContactsList(data);
    });
      
  }

  ngOnInit(): void {
    
    /*this.sub = this.route.params.subscribe(
        params => {          
          console.log(params.id)
        }
      );*/

    /*
    this.route.paramMap.subscribe(
     params => console.log(params.get('id'))
    );
    */


    this.contactService.fetchContacts()
      .then(contacts => {
        //console.log(contacts);
        this.contacts = contacts;
      });
  }

  updateContactsList = (data) => {
    debugger;
    let contacts:Contact[];
    if(data.trig_val === 'add'){
      contacts = [... this.contacts,data.contact];
      this.contacts = contacts;
      this.contactActionStatusText = 'Contact successfully added.';
      this.contactActionStatusVisible  = true;
    }
    else if(data.trig_val === 'update'){
      contacts = this.contacts.map(item => {
          if (item._id === data.contact._id) return Object.assign({}, data.contact);
          return item;
      });
      this.contacts = contacts;
      this.contactActionStatusText = 'Contact successfully updated.';
      this.contactActionStatusVisible  = true;
    }
    else if(data.trig_val === 'delete'){
      contacts = this.contacts.filter(item => item._id !== data._id);
      this.contacts = contacts;
      this.contactActionStatusText = 'Contact successfully removed.';
      this.contactActionStatusVisible  = true;
    }
    setTimeout(function() {
        this.contactActionStatusVisible  = false;
    }.bind(this), 2500);
  }

  gotoNewForm(): void {
    this.router.navigate(['contacts/new']);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}