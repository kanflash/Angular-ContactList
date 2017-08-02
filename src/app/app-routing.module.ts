import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsPageComponent }   from './contactsPage.component';
import { ContactFormEditComponent }   from './contactFormEdit.component';
import { ContactFormDetailComponent }   from './contactFormDetail.component';


const routes: Routes = [
  { path: 'contacts',  component: ContactsPageComponent, pathMatch: 'prefix',
    children: [
      { path: ':id/edit', component: ContactFormEditComponent },
      { path: ':id/detail', component: ContactFormDetailComponent },
      { path: 'new', component: ContactFormEditComponent }
      
    ]
  },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**', redirectTo: '/contacts'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}