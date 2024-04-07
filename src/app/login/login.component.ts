import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup<any>;
  hidepassword: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.LoginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    const userName = this.LoginForm.get('email').value;
    const password = this.LoginForm.get('password').value;
    console.log(userName, password);
    this.authService.login(userName, password).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Login success', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Invalid Credentials', 'Close', { duration: 3000 });
      }
    );
  }

  togglePasswordVisibility() {
    this.hidepassword = !this.hidepassword;
  }
}
