import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Donator } from '../models/Donator.model';

@Injectable({ providedIn: 'root' })
export class DonatorService {

  constructor(private http: HttpClient) { }

  listDonnation() : Promise<Donator[]> {
    return this.http.get('/donator/retrieve-donator').toPromise() as  Promise<Donator[]>
    }
}