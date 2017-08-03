import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute, ParamMap, Params, NavigationEnd, Event } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Contact }  from './contact';
import { ContactService }  from './contact.service';
import { fadeInAnimation } from './fade-in-animation';

@Component({
  selector: 'contact-form-page',
  templateUrl: './contactFormPage.component.html',
  animations: [
  trigger('visibilityChanged', [
    state('true' , style({ opacity: 1, display: 'block' })),
    state('false', style({ opacity: 0, display: 'none' })),
    transition('* => *', animate('.5s'))
  ]),
  fadeInAnimation 
  ]
})
export class ContactFormPageComponent implements OnInit, OnChanges {

  @Input()
  contactActionStatusText:String = null;
  @Input()
  contactActionStatusVisible:Boolean = false;

  visibility = 'hidden';

  childRouterAvailable:Boolean;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { 

  }

  ngOnChanges() {
    //debugger;
   //this.visibility = this.contactActionStatus ? 'shown' : 'hidden';
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