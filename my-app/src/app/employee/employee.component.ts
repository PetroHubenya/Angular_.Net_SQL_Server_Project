import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  constructor(private http: HttpClient) {}

  departments: any=[]
  employees: any=[]

  modalTitle = "";
  EmployeeId = 0;
  EmployeeName = "";
  Department = "";
  DateOfJoining = "";
  PhotoFileName = "anonymous.png";
  PhotoPath = environment.PHOTO_URL;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL + 'department')
    .subscribe(data => {
      this.departments = data;
    });

    this.http.get<any>(environment.API_URL + 'employees')
    .subscribe(data => {
      this.employees = data;
    });
  }

  addClick(){
    this.modalTitle = "Add Employee";
    this.EmployeeId = 0;
    this.EmployeeName = "";
    this.Department = "";
    this.DateOfJoining = "";
    this.PhotoFileName = "anonymous.png";
  }

  editClick(emp:any){
    this.modalTitle = "Edit Employee";
    this.EmployeeId = emp.EmployeeId;
    this.EmployeeName = emp.EmployeeName;
    this.Department = emp.Department;
    this.DateOfJoining = emp.DateOfJoining;
    this.PhotoFileName = emp.PhotoFileName;
  }

  createClick(){
    var val = {
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    }
    this.http.post(environment.API_URL + "employee", val)
    .subscribe(res => {
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick(){
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    }
    this.http.put(environment.API_URL + "employee", val)
    .subscribe(res => {
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if (confirm('Are you sure?')){
      this.http.delete(environment.API_URL + "employee/" + id)
      .subscribe(res => {
          alert(res.toString());
          this.refreshList();
        }
      );
    }    
  }
}
