import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params, NavigationEnd, Event } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Contact }  from './contact';
import { ContactService }  from './contact.service';

@Component({
  selector: 'contact-form-page',
  templateUrl: './contactFormPage.component.html'
})
export class ContactFormPageComponent implements OnInit {

  childRouterAvailable:Boolean;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {

    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:Event) => {
      //console.log(event['url']);
      let url = event['url'];
      this.childRouterAvailable = url !== '/contacts';
    });

    this.route.firstChild && this.route.firstChild.paramMap.subscribe((params ) => {
      this.childRouterAvailable = true;
      console.log("id:"+params.get('id'));
    });

    //debugger;
    /*this.route.paramMap.subscribe((params ) => {
      debugger;
      console.log("id:");
    });*/

  }

}