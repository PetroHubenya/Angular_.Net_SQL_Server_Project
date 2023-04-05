import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  
  constructor(private http: HttpClient) {}

  departments: any=[]

  modalTitle = "";
  DepartmentId = 0;
  DepartmentName = "";

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL + 'department')
    .subscribe(data => {
      this.departments = data;
    });
  }

  addClick(){
    this.modalTitle = "Add Department";
    this.DepartmentId = 0;
    this.DepartmentName = "";
  }

  editClick(dep:any){
    this.modalTitle = "Edit Department";
    this.DepartmentId = dep.DepartmentId;
    this.DepartmentName = dep.DepartmentName;
  }

}
