import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { AuthService } from '../../services';
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

  // user: IUser | null = { username: '' };

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
    //this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  backToMain(){
    // console.log(this.router.url);
    // console.log(this.router.parseUrl(this.router.url));
    this.router.navigate(["/home"]);
  }

  back(){
    // console.log("LOCA " + );
    // console.log(this.router.setUpLocationChangeListener());
    // console.log(this.router.parseUrl(this.router.url));
    // console.log(this.router);
    // this.location.back();


//     const currentURL = this.router.url;
    // const parts = currentURL.split('/');
    // parts.pop();
    // if(parts.lastIndexOf('orders') === parts.length - 1){
    //   parts.pop();
    // }
    // const newURL = new URL(parts.join('/'));
    // console.log(newURL);
    // newURL.searchParams.append("Ddate", parts[0]);
    // newURL.searchParams.append("Acc", parts[1]);
    
    // this.router.navigate([`${newURL}`]);
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
