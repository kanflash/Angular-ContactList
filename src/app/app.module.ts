import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactsPageComponent }   from './contactsPage.component';
import { ContactsListComponent }   from './contactsList.component';
import { ContactCardComponent }   from './contactCard.component';
import { ContactFormPageComponent }   from './contactFormPage.component';
import { ContactFormEditComponent }   from './contactFormEdit.component';
import { ContactFormDetailComponent }   from './contactFormDetail.component';

import { ContactService } from './contact.service';
import { SharedContactService } from './sharedContact.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    ContactsListComponent,
    ContactCardComponent,
    ContactFormPageComponent,
    ContactFormEditComponent,
    ContactFormDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ContactService,SharedContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
