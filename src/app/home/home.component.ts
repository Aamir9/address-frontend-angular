import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { City } from 'src/models/City';
import { Country } from 'src/models/Country';
import { PostalCode } from 'src/models/PostalCode';
import { State } from 'src/models/State';
import { Street } from 'src/models/Street';
import { ApiService } from '../shared/api.service';
import { DownloadfileService } from '../shared/downloadfile.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

  country:Country[]=[];
  state:State[]=[];
  City:City[]=[];
  postalCodes:PostalCode[]=[];
  streer:Street[]=[];
  house:Street[]=[];

  CountryItems:SelectItem[];
  StateItems:SelectItem[];
  CityItems:SelectItem[];
  PostalCodeItems:SelectItem[];
  StreetItems:SelectItem[];

  SelectedCountryId='';
  SelectedStateId='';
  SelectedCityId='';
  SelectedPostalCodeId='';
  SelectedStreetId='';
  constructor(private apiService:ApiService ,private fileService:DownloadfileService) { }

  ngOnInit(): void {
    this.GetAllCountries();
    this.GetStates();
    this.GetCities();
    this.GetPostcalCodes();
    this.GetStreets();
  }

  // geting csv files
  GetCountries(){
    
    this.apiService.GetCountries().subscribe(res=>{
      this.country=res;
      this.fileService.downloadFile(this.country,"Countries.csv");
      
    },
    error =>{
      console.log('countries not getting ! internal serve error');
    },
   );
  
  }

  GetAllCountries(){
    
    this.apiService.GetCountries().subscribe(res=>{
      this.country=res;
      this.CountryItems = [];
      let i = 0;

      setTimeout(() => {
        for (var v in this.country) // for acts as a foreach  
        {
    
          this.CountryItems.push({
            label: this.country[i].Name,
            value: this.country[i].CountryId,
          });
          i = i + 1;
    
        }
      }, 1000);
    
    },
    error =>{
      console.log('countries not getting ! internal serve error');
    },
   );
  
  }


  GetFileStates(){
    this.apiService.GetStatesbyCuntryId(this.SelectedCountryId).subscribe(res=>{
      this.state=res;
       this.fileService.downloadFile(this.state,"states.csv");
      
    },
    error =>{
      console.log('not getting ! internal serve error');
    },
   );
  
  }


  GetStates(){
    
    this.apiService.GetStates().subscribe(res=>{
   
      this.StateItems = [];
      let i = 0;

      setTimeout(() => {
        for (var v in res) // for acts as a foreach  
        {
    
          this.StateItems.push({
            label: res[i].Name,
            value: res[i].StateId,
          });
          i = i + 1;
    
        }
      }, 1000);
    
    },
    error =>{
      console.log('countries not getting ! internal serve error');
    },
   );
  
  }

  GetCities(){
    
    this.apiService.GetCities().subscribe(res=>{
     this.CityItems = [];
      let i = 0;
      setTimeout(() => {
        for (var v in res) 
        {
            this.CityItems.push({
            label: res[i].Name,
            value: res[i].CityId,
          });
          i = i + 1;
    
        }
      }, 1000);
    
    },
    error =>{
      console.log('countries not getting ! internal serve error');
    },
   );
  
  }

  GetPostcalCodes(){
    
    this.apiService.GetPostalCodes().subscribe(res=>{
     this.PostalCodeItems = [];
      let i = 0;
      setTimeout(() => {
        for (var v in res) 
        {
            this.PostalCodeItems.push({
            label: res[i].Name,
            value: res[i].PostalCodeId,
          });
          i = i + 1;
    
        }
      }, 1000);
    
    },
    error =>{
      console.log('countries not getting ! internal serve error');
    },
   );
  
  }
  GetStreets(){
    
    this.apiService.GetStreets().subscribe(res=>{
     this.StreetItems = [];
      let i = 0;
      setTimeout(() => {
        for (var v in res) 
        {
            this.StreetItems.push({
            label: res[i].Name,
            value: res[i].StreetId,
          });
          i = i + 1;
    
        }
      }, 1000);
    
    },
    error =>{
      console.log('countries not getting ! internal serve error');
    },
   );
  
  }


  GetFileCities(){
    this.apiService.GetCitiesbyStateId(this.SelectedStateId).subscribe(res=>{
  
       this.fileService.downloadFile(res,"cities.csv");
      
    },
    error =>{
      console.log('not getting ! internal serve error');
    },
   );

  }

  GetFilePostalCodes(){
    this.apiService.GetPostalCodesbyCityId(this.SelectedCityId).subscribe(res=>{
   
       this.fileService.downloadFile(res,"postalCodes.csv");
      
    },
    error =>{
      console.log('not getting ! internal serve error');
    },
   );
  }

  GetFileStreets(){
    this.apiService.GetStreetsbyPostalCodeId(this.SelectedPostalCodeId).subscribe(res=>{
      this.state=res;
       this.fileService.downloadFile(this.state,"streets.csv");
      
    },
    error =>{
      console.log('not getting ! internal serve error');
    },
   );

  }

  GetFileHouses(){
    this.apiService.GetHousesbyStreetId(this.SelectedStreetId).subscribe(res=>{
      this.state=res;
       this.fileService.downloadFile(this.state,"streets.csv");
      
    },
    error =>{
      console.log('not getting ! internal serve error');
    },
   );
    
  }

}
