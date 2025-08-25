import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.sass'
})
export class ForgotPassword {
  forgotPasswordForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.initForm();
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.toastr.success('Password reset link sent to your email', 'Success', {
      progressBar: true,
      progressAnimation: 'increasing'
    });
    // this.authService.forgotPassword({ email_id: this.forgotPasswordForm.value.email }).subscribe({
    //   next: (response: any) => {
    //     this.toastr.success(response.message || 'Password reset link sent to your email', 'Success', {
    //       progressBar: true,
    //       progressAnimation: 'increasing'
    //     });
    //     this.router.navigate(['/login']);
    //   },
    //   error: (error: any) => {
    //     const { message } = error.error;
    //     this.toastr.error(message || 'Failed to send password reset link', 'Error', {
    //       disableTimeOut: true,
    //       closeButton: true,
    //       tapToDismiss: false
    //     });
    //   }
    // });
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
