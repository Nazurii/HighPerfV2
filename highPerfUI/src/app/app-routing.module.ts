import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";
import {EmployeesComponent} from "./employees/employees.component";

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full'},
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'salesmen', component: EmployeesComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
