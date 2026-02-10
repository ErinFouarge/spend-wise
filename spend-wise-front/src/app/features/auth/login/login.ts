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
  selector: 'app-login',
  imports: [
    MatCard,
    MatFormField,
    MatLabel,
    MatError,
    MatButton,
    ReactiveFormsModule,
    MatInput,
    RouterLink,
    MatIcon
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute)
  auth = inject(Auth);
  session = inject(SessionService)
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe({
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
        this.errorMessage = err.error?.message || 'Email ou mot de passe incorrect';
        this.cdr.detectChanges();
      }
    });
  }
}

