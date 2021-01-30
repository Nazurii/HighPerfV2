import { Component, OnInit } from '@angular/core';

import {Employee} from "../Employee";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  private subscriber:any;


  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    console.log("employee.component.ts - ngOnInit")
    //this.getEmployees();
    this.subscriber= this.route.params.subscribe(params => {
      this.http.get('/api/v1/ohrm/employees').subscribe((data:any) => {
        this.employees = data;
      });
    });
  }

  Employees(): void{
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

}
