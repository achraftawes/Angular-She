import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Appointement} from "../../model/Appointement.model";
import {Observable} from "rxjs";

const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }),
  'responseType': 'text as json'
};

@Injectable({
  providedIn: 'root'
})
export class AppointementService {

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;  charset=utf-8 ',
        'Access-Control-Allow-Origin':'*',

    }),
  };

  constructor(private http: HttpClient) { }

  addAppointement(a: Appointement, id: number) {
    return this.http.post<Appointement>(`/appointement/add/`+id, a, this.httpOptions);
  }

    FilterAppointementByDateDesc(): Observable<[Appointement]> {
    return this.http.get<[Appointement]>(`/appointement/getbyexpert/1`);
  }

  deleteAppointement(appointement: Appointement | number): Observable<string>
  {
    const id = typeof appointement === "number" ? appointement : appointement.idAppointement;
    const path = `/appointement/delete/`+id;
    //@ts-ignore
    return this.http.delete<string>(path, httpOptionsPlain);
  }

    updateAppointement(appointement:Appointement,id:number): Observable<Appointement> {
    return this.http.put<Appointement>(`/appointement/Update/`+id  ,appointement , this.httpOptions);
  }

   getAppointementByID(id: number):Observable<Appointement>{
    return this.http.get<Appointement>(`/appointement/appointement-by-id/`+id  );
  }
    cancelAppointement(appointement: Appointement | number): Observable<string>
  {
    const id = typeof appointement === "number" ? appointement : appointement.idAppointement;
    const path = `/appointement/annul/`+id;
    //@ts-ignore
    return this.http.delete<string>(path, httpOptionsPlain);
  }
}
