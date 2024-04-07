import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

hidepassword:boolean= true;
signupForm!: FormGroup;

constructor(private fb: FormBuilder,private snackBar: MatSnackBar,
            private router: Router,
            private authService :AuthService) { }
            ngOnInit() {
              this.signupForm= this.fb.group({
                name: [null,[Validators.required]],
                email: [null,[Validators.required]],
                password: [null,[Validators.required]],
                confirmPassword: [null,[Validators.required]]
            });
            }
            onSubmit() {
              console.log("hi", this.signupForm.value);
              
              const password = this.signupForm.get('password')?.value;
              const confirmPassword = this.signupForm.get('confirmPassword')?.value;
              if (password !== confirmPassword) {
                this.snackBar.open('Password and Confirm Password do not match', 'Close',{ duration: 4000, panelClass: 'success-snackbar' });
                return;
              }
              this.authService.register(this.signupForm.value).subscribe((response) => {
                this.snackBar.open('Registration Successful', 'Close',{ duration: 4000, panelClass: 'success-snackbar' });
                this.router.navigate(['login']);
              }, (error) => {
                this.snackBar.open('Error in registering', 'Close',{ duration: 4000, panelClass: 'error-snackbar' });
              });
            }
            

togglePasswordVisibility() {
  this.hidepassword = !this.hidepassword;
}


}

