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

  createClick(){
    var val = {
      DepartmentName: this.DepartmentName
    }
    this.http.post(environment.API_URL + "department", val)
    .subscribe(res => {
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick(){
    var val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    }
    this.http.put(environment.API_URL + "department", val)
    .subscribe(res => {
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if (confirm('Are you sure?')){
      this.http.delete(environment.API_URL + "department/" + id)
      .subscribe(res => {
          alert(res.toString());
          this.refreshList();
        }
      );
    }    
  }
}