import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export interface ITransaction{
  AccountName: string;
  AccountNumber: string;
  TransactionType: string;
  TransactionTypeNumber: string;
  Amount: number;
  TransactionDate: Date;
}