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
  private sub: Subscription;

  childRouterStatus:Boolean;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {
    //this.router.events.subscribe((url:any) => console.log(url));
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:Event) => {
      console.log(event['url']);
      let url = event['url'];
      this.childRouterStatus = url !== '/contacts';
    });
    /*this.sub = this.route.paramMap.subscribe((params ) => {
      console.log("AA:"+params.get('id'));
    });*/
    /*this.sub = this.route.firstChild.params.subscribe(
        params => console.log(params.id));*/
  }

}