import {ChangeDetectorRef, Component, OnInit, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Auth} from '../auth';
import {SessionService} from '../../../core/session';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatError,
    MatButton,
    RouterLink,
    MatInput,
    MatIcon
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  errorMessage = '';
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  auth = inject(Auth);
  session = inject(SessionService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  submit() {
    if (this.registerForm.invalid) return;
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.session.setSession({
          token: res.token,
          firstName: res.firstName,
          lastName: res.lastName
        });

        const redirect = this.route.snapshot.queryParamMap.get('redirect');
        this.router.navigateByUrl(redirect || '/', { replaceUrl: true });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue lors de l\'inscription';
        this.cdr.detectChanges();
      }
    });
  }
}
