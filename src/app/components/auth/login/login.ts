import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  styleUrl: './login.sass',
})
export class Login {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login({
        email_id: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (response: any) => {
          this.sessionService.startSession(response.data);
          this.toastr.success(response.message || 'Login successful', 'Success', {
            progressBar: true,
            progressAnimation: 'increasing'
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          const { message } = error.error;
          this.toastr.error(message || 'Login failed', 'Error', {
            disableTimeOut: true,
            closeButton: true,
          });
        },
      });
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
