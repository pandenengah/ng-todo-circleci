import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isSubmitting = false

  constructor(
    private authSrv: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  async submit() {
    if (this.loginForm.invalid) {
      return
    }

    this.isSubmitting = true
    await this.authSrv.login(this.loginForm.value)
    this.isSubmitting = false
  }
}
