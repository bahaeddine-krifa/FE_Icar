import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../shared/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl= "http://localhost:8080";
  constructor(private http: HttpClient) { }

  public getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/allEmployee`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/addEmployee`,employee);
  }

  public deleteEmployee(employeeId: Number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteEmployee/${employeeId}`);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/updateEmployee`,employee);
  }
}
