import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobOffers } from '../models/JobOffers.model';

@Injectable({ providedIn: 'root' })
export class JobOffersService {
  urlapi="localhost:8086/SheApp/joboffers/addJobOffers"; 
  baseUrl="/joboffers/delete-JobOffers"
  baseUrll="/joboffers/get-JobOffers"
  serv="/joboffers/update-JobOffers"
  constructor(private http: HttpClient) { }

  ListOffers() {
    return this.http.get('/joboffers/retrieve-offers')
  }
  creat(offre:JobOffers):Observable<object>{
    console.log(offre);
    return this.http.post("/joboffers/addJobOffers",offre);
  }
  Delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  
  }
  getByid(id): Observable<any> {
    return this.http.get(`${this.baseUrll}/${id}`);
  
  }
  update(offre:JobOffers):Observable<object>{
    console.log(offre);
    return this.http.put(`${this.serv}`,offre);
    
    }
}

