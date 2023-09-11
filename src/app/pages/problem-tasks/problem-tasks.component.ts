import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';
import { IProblemDocs } from 'src/app/shared/services/Dtos';

@Component({
  selector: 'app-problem-tasks',
  templateUrl: './problem-tasks.component.html',
  styleUrls: ['./problem-tasks.component.scss']
})
export class ProblemTasksComponent implements OnInit {
  data: any[] = [];
  loading: boolean = true;
  constructor(private http: HttpClient,private authService: AuthService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true;
    this.http.get<any>(`http://10.10.0.85:82/Crm/GetProblemDocs/${AuthService.userName}`)
      .subscribe({
        next: (e) => {
          this.data = e.Result;
          this.formatDate(this.data);
          this.loading = false;
          console.log(this.data);
        },
        error: (err)=>{
          this.loading = false;
          if(err.status == 401){
            alert('სესიის ვადა ამოიწურა!');
            this.authService.logOut();
          }
          else
            alert('დაფიქსირდა შეცდომა!');
        }
      })
  }

  formatDate(arr: IProblemDocs[]){
    arr.forEach(i => {
      if(i.DueDate){
        const match = i.DueDate!.toString().match(/\/Date\((\d+)(-\d+)?\)\/$/);
        if (match) {
          const timestamp = parseInt(match[1], 10);
          i.DueDate = new Date(timestamp);
          
          i.DateString = formatDate(i.DueDate, "MMM/dd","en");
        }
      }
    })
  }

}




