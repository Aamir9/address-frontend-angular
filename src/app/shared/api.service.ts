import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from 'src/models/Country';
import { State } from 'src/models/State';
import { City } from 'src/models/City';
import { PostalCode } from 'src/models/PostalCode';
import { Street } from 'src/models/Street';
import { House } from 'src/models/House';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   headers = new HttpHeaders();   
   httpOptions;
  

  readonly url='http://localhost:54370/api';

  constructor(private http:HttpClient ) {
    this.headers.append('Content-Type', 'multipart/form-data'); 
    this.headers.append('Accept', 'application/json'); 
     this.httpOptions = { headers: this.headers }; 
   }

  UploadCountryCsv(formData: FormData) {  
    return this.http.post(this.url + '/Upload/Country', formData, this.httpOptions)  
  } 

  UploadStateCsv(formData: FormData ,id ) {  
    return this.http.post(`${this.url + '/Upload/States'}/${id}`, formData,this.httpOptions) 
  } 

  UploadCityCsv(formData: FormData ,id ) {  
    return this.http.post(`${this.url + '/Upload/Cities'}/${id}`, formData,this.httpOptions) 
  } 

  UploadPostalCodesCsv(formData: FormData ,id ) {  
    return this.http.post(`${this.url + '/Upload/PostalCodes'}/${id}`, formData,this.httpOptions) 
  } 


  UploadStreetsCsv(formData: FormData ,id ) {  
    return this.http.post(`${this.url + '/Upload/Streets'}/${id}`, formData,this.httpOptions) 
  } 


  UploadHousesCsv(formData: FormData ,id ) {  
    return this.http.post(`${this.url + '/Upload/Houses'}/${id}`, formData,this.httpOptions) 
  } 


  GetCountries(): Observable<Country[]> {  
    return this.http.get<Country[]>(this.url + '/Countries');  
  } 

  GetStates(): Observable<State[]> {  
    return this.http.get<State[]>(this.url + '/GetStates');  
  } 

  GetCities(): Observable<City[]> {  
    return this.http.get<City[]>(this.url + '/GetCities');  
  } 
  GetPostalCodes(): Observable<PostalCode[]> {  
    return this.http.get<PostalCode[]>(this.url + '/GetPostalCodes');  
  } 

  GetStreets(): Observable<Street[]> {  
    return this.http.get<Street[]>(this.url + '/GetStreets');  
  } 

  GetHouses(): Observable<House[]> {  
    return this.http.get<House[]>(this.url + '/GetHouses');  
  } 

  GetStatesbyCuntryId(id) :Observable<State[]>{
     return this.http.get<State[]>(`${this.url+ '/Country/States'}/${id}`);
   
  } 

}  

