import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  }

  orders(){
    this.router.navigate(["/orders"]);
  }

}
