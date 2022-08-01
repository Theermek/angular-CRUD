import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { CompanyModel } from './company-dashboard.model';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

  formValue !: FormGroup;
  companyModelObj : CompanyModel = new CompanyModel();
  companyData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formBuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      fullName : [''],
      shortName : [''],
      INN : [''],
      KPP : [''],
      founder : [''],
      address : [''],
      phone : [''],
    })
    this.getAllCompanies();
  }

  clickAddCompany() {
    this.formValue.reset()
    this.showAdd = true;
    this.showUpdate = false;
  }

  postCompanyDetails() {
    this.companyModelObj.fullName = this.formValue.value.fullName;
    this.companyModelObj.shortName = this.formValue.value.shortName;
    this.companyModelObj.INN = this.formValue.value.INN;
    this.companyModelObj.KPP = this.formValue.value.KPP;
    this.companyModelObj.founder = this.formValue.value.founder;
    this.companyModelObj.address = this.formValue.value.address;
    this.companyModelObj.phone = this.formValue.value.phone;

    this.api.postCompany(this.companyModelObj)
    .subscribe(res =>{
      console.log(res);
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCompanies();
    },
    err => {
      alert('Something went wong')
    })
  }

  getAllCompanies() {
    this.api.getCompany()
    .subscribe(res => {
      this.companyData = res;
    })
  }

  deleteCompany(row : any) {
    this.api.deleteCompany(row.id)
    .subscribe(res => {
      this.getAllCompanies();
    })
  }

  editCompany(row : any) {
    this.companyModelObj.id = row.id;
    this.formValue.controls['fullname'].setValue(row.fullName)
    this.formValue.controls['shortName'].setValue(row.shortName)
    this.formValue.controls['INN'].setValue(row.INN)
    this.formValue.controls['KPP'].setValue(row.KPP)
    this.formValue.controls['founder'].setValue(row.founder)
    this.formValue.controls['address'].setValue(row.address)
    this.formValue.controls['phone'].setValue(row.phone)
    this.showAdd = false;
    this.showUpdate = true;
  }

  updateCompanyDetails() {
    this.companyModelObj.fullName = this.formValue.value.fullName;
    this.companyModelObj.shortName = this.formValue.value.shortName;
    this.companyModelObj.INN = this.formValue.value.INN;
    this.companyModelObj.KPP = this.formValue.value.KPP;
    this.companyModelObj.founder = this.formValue.value.founder;
    this.companyModelObj.address = this.formValue.value.address;
    this.companyModelObj.phone = this.formValue.value.phone;
    this.api.updateCompany(this.companyModelObj)
    .subscribe(res => {
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCompanies();
    })

  }

}
