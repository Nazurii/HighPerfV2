import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Employee } from './Employee';
import { EMPLOYEES } from './mock-employees';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private employeesUrl = 'http://localhost:3000/api/v1/ohrm/employees'

  constructor(private messageService: MessageService, private http: HttpClient, private router:Router) {

  }

  getEmployees(): any {
    // TODO: send the message _after_ fetching the heroes
    //this.messageService.add('EmployeeService: fetched employee');
    //return of(EMPLOYEES);
    console.log("employee.service.ts")

    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  getEmployee(code: number): Observable<Employee> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`EmployeeService: fetched employee with code ${code}`);
    return of(EMPLOYEES.find(employee => employee.code === code));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
