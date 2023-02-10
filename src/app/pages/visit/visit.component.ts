import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisDocsByExpeditor } from '../tasks/tasks.component';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {
  visitData: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.visitData = history.state.data;
    console.log(this.visitData);
  }

  mouse(){
    this.router.navigate(["/tasks"]);
  }

}
