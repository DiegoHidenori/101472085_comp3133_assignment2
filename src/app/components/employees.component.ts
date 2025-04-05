import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CommonModule } from '@angular/common';

const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEES
    }).valueChanges.subscribe(({ data }) => {
      this.employees = data.employees;
    });
  }
}
