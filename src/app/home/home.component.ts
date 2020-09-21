import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Country } from 'src/models/Country';
import { State } from 'src/models/State';
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
  CountryItems:SelectItem[];
  SelectedCountryId='';
  constructor(private apiService:ApiService ,private fileService:DownloadfileService) { }

  ngOnInit(): void {
    this.GetStates();
  }

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

  GetStates(){
    
    this.apiService.GetCountries().subscribe(res=>{
   
      this.CountryItems = [];
      let i = 0;

      setTimeout(() => {
        for (var v in res) // for acts as a foreach  
        {
    
          this.CountryItems.push({
            label: res[i].Name,
            value: res[i].CountryId,
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
      console.log('countries not getting ! internal serve error');
    },
   );
  
  }

}
