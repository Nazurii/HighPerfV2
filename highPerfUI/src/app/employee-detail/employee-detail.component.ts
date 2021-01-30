import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Employee} from "../Employee";
import {EmployeeService} from "../employee.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: [ './employee-detail.component.css' ]
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee;
  private subscriber:any;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log("employee-detail.component.ts - ngOnInit")
    this.getEmployee();
  }

  getEmployee(): void {
    console.log("employee-detail.component.ts - getEmployee")

    const id = +this.route.snapshot.paramMap.get('id');
    /*
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);

     */

    this.subscriber= this.route.params.subscribe(params => {
      this.http.get( `/api/v1/ohrm/employees/${id}`).subscribe((data:any) => {
        console.log(data);
        this.employee = data;
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
}
