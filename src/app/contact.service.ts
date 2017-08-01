import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contact } from './contact';

@Injectable()
export class ContactService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private contactsUrl = '/api/contacts';  // URL to web api

    constructor(private http: Http) { }

    saveContact(data): Promise<Contact> {
            return this.http.post(this.contactsUrl, JSON.stringify(data), { headers: this.headers })
                .toPromise()
                .then(response => response.json().contact as Contact)
                .catch(this.handleError);
    }

    updateContact(data): Promise<Contact> {
            return this.http.put(`${this.contactsUrl}/${data._id}`, JSON.stringify(data), { headers: this.headers })
                .toPromise()
                .then(response => response.json().contact as Contact)
                .catch(this.handleError);
    }

    deleteContact(id): Promise<Contact> {
            return this.http.delete(`${this.contactsUrl}/${id}`, { headers: this.headers })
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    fetchContacts(): Promise<Contact[]> {
        return this.http.get(this.contactsUrl)
                .toPromise()
                .then(response => response.json().contacts as Contact[])
                .catch(this.handleError);
    }

    fetchContact(id): Promise<Contact> {
        return this.http.get(`${this.contactsUrl}/${id}`)
                .toPromise()
                .then(response => response.json().contact as Contact)
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
