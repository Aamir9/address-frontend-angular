import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Country } from 'src/models/Country';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers:[MessageService]
})
export class UploadComponent implements OnInit {

  @ViewChild('fileInput') fileInput;  
  @ViewChild('fileInputStates') fileInputStates;  
  @ViewChild('fileInputCities') fileInputCities;
  @ViewChild('fileInputPostalCodes') fileInputPostalCodes; 
  @ViewChild('fileInputStreets') fileInputStreets; 
  @ViewChild('fileInputHouses') fileInputHouses; 
  
   
  // message: string;  
  // fileToUpload: File = null;
  // fileToUploadStates: File = null;
  // exportColumns: any[];
  country:Country[]=[];
  CountryItems:SelectItem[];
  StateItems:SelectItem[];
  CityItems:SelectItem[];
  PostalCodeItems:SelectItem[];
  StreetItems:SelectItem[];

  SelectedCountryId:string='';
  SelectedStateId='';
  SelectedCityId='';
  SelectedPostalCodeId='';
  SelectedStreetId='';

  constructor(private http: HttpClient, private apiService: ApiService ,private messageService: MessageService) { }

  ngOnInit(): void {

    this.GetCountries();
    this.GetStates();
    this.GetCities();
    this.GetPostcalCodes();
    this.GetStreets();
  }

 

  uploadFile() {  
    if(this.fileInput.nativeElement.value ==null || this.fileInput.nativeElement.value ===''|| this.fileInput.nativeElement.value===undefined){
      this.messageService.add({severity:'error', summary: 'countries file is empty', detail:'please add countries csv '});  
    }
    else{
      let formData = new FormData();  
      var data =this.fileInput.nativeElement.files[0];
      formData.append('file',data)  
      this.apiService.UploadCountryCsv  (formData).subscribe(res => {
        this.fileInput.nativeElement.value='';
        this.messageService.add({severity:'success', summary:res+' '+ 'records are uploaded '});  
        this.GetCountries();   
      },
       error =>{
    });
    }
      
  
  } 

  GetCountries(){
    
    this.country=[];
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

  GetStates(){
    
    this.StateItems = [];
    this.apiService.GetStates().subscribe(res=>{
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
    this.CityItems = [];
    this.apiService.GetCities().subscribe(res=>{
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
    this.PostalCodeItems = [];
    this.apiService.GetPostalCodes().subscribe(res=>{
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
    this.StreetItems = [];
    this.apiService.GetStreets().subscribe(res=>{
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


  uploadFileStates(){

   
    if(this.fileInputStates.nativeElement.value ==null || this.fileInputStates.nativeElement.value ===''
    || this.fileInputStates.nativeElement.value===undefined  || this.SelectedCountryId===''){
      this.messageService.add({severity:'error', summary: 'states file is empty', detail:'please add states csv and select country '});  
    }
    else{
      let formData = new FormData();  
      var data =this.fileInputStates.nativeElement.files[0];
      formData.append('file',data)  
      this.apiService.UploadStateCsv (formData,this.SelectedCountryId).subscribe(res => {
        this.fileInputStates.nativeElement.value='';
        this.GetStates();
        this.messageService.add({severity:'success', summary:res+' '+ 'records are uploaded '});  
         },
       error =>{
    });
    }
  }
  uploadFileCities(){
    if(this.fileInputCities.nativeElement.value ==null || this.fileInputCities.nativeElement.value ===''
    || this.fileInputCities.nativeElement.value===undefined  || this.SelectedStateId===''){
      this.messageService.add({severity:'error', summary: 'add file and select', detail:'please add city csv and select state '});  
    }
    else{
      let formData = new FormData();  
      var data =this.fileInputCities.nativeElement.files[0];

      formData.append('file',data)  
      this.apiService.UploadCityCsv(formData,this.SelectedStateId).subscribe(res => {
        this.fileInputCities.nativeElement.value='';
        this.GetCities();
        this.messageService.add({severity:'success', summary:res+' '+ 'records are uploaded '});  
         },
       error =>{

        console.log('internal error');
    });
    }
  }
  uploadFilePostalCodes(){
    if(this.fileInputPostalCodes.nativeElement.value ==null || this.fileInputPostalCodes.nativeElement.value ===''
    || this.fileInputPostalCodes.nativeElement.value===undefined  || this.SelectedCityId===''){
      this.messageService.add({severity:'error', summary: 'add file and select', detail:'please add Postal Code csv and select city '});  
    }
    else{
      let formData = new FormData();  
      var data =this.fileInputPostalCodes.nativeElement.files[0];

      formData.append('file',data)  
      this.apiService.UploadPostalCodesCsv(formData,this.SelectedCityId).subscribe(res => {
        this.fileInputPostalCodes.nativeElement.value='';
        this.GetPostcalCodes();
        this.messageService.add({severity:'success', summary:res+' '+ 'records are uploaded '});  
         },
       error =>{

        console.log('internal error');
    });
    }
  }

  uploadFileStreets(){

    if(this.fileInputStreets.nativeElement.value ==null || this.fileInputStreets.nativeElement.value ===''
    || this.fileInputStreets.nativeElement.value===undefined  || this.SelectedPostalCodeId===''){
      this.messageService.add({severity:'error', summary: 'add file and select', detail:'please add streets csv and select postal code '});  
    }
    else{
      let formData = new FormData();  
      var data =this.fileInputStreets.nativeElement.files[0];

      formData.append('file',data)  
      this.apiService.UploadStreetsCsv(formData,this.SelectedPostalCodeId).subscribe(res => {
        this.fileInputStreets.nativeElement.value='';
        this.GetStreets();
        this.messageService.add({severity:'success', summary:res+' '+ 'records are uploaded '});  
         },
       error =>{

        console.log('internal error');
    });
    }
  }

  uploadFileHoueses(){

    if(this.fileInputHouses.nativeElement.value ==null || this.fileInputHouses.nativeElement.value ===''
    || this.fileInputHouses.nativeElement.value===undefined  || this.SelectedStreetId===''){
      this.messageService.add({severity:'error', summary: 'add file and select', detail:'please add streets csv and select postal code '});  
    }
    else{
      let formData = new FormData();  
      var data =this.fileInputHouses.nativeElement.files[0];

      formData.append('file',data)  
      this.apiService.UploadHousesCsv(formData,this.SelectedStreetId).subscribe(res => {
        this.fileInputHouses.nativeElement.value='';
        this.messageService.add({severity:'success', summary:res+' '+ 'records are uploaded '});  
         },
       error =>{

        console.log('internal error');
    });
    }
  }


}
