import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};
  
  
  constructor(private authService: AuthService, private router: Router) { }
  
  onSubmit(e: Event) {
    e.preventDefault();
    const { username, password } = this.formData;
    this.loading = true;

    this.authService.logIn(username, password).subscribe(result => {
      if (!result.isOk) {
        notify(result.data, 'error', 2000);
        this.loading = false;
        this.formData.password = "";
      } else {
        this.router.navigate(["/home"]);
      }
    });
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ LoginFormComponent ],
  exports: [ LoginFormComponent ]
})
export class LoginFormModule { }
