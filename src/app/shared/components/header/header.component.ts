import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  @Input() 
  goToPreviousPage: () => void = ()=>{};

  user: IUser | null = { email: '' };

  userMenuItems = [
  {
    text: 'გამოსვლა',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  backToMain(){
    this.router.navigate(["/home"]);
  }

  back(){
    this.location.back();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
