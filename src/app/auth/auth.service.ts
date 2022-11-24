import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../@helpers/backend/backend.service';
import { User } from './@objects/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userStringKey = 'ngTodoUser'

  get user(): User {
    const user = localStorage.getItem(this.userStringKey)
    return JSON.parse(user || '{}')
  }

  constructor(
    private be: BackendService,
    private router: Router,
  ) { }

  async login(user: User) {
    const res = await this.be.login(user.username || '', user.password || '')
    
    if (res.message) {
      alert(res.message)
      return
    }

    localStorage.setItem(this.userStringKey, JSON.stringify(res))

    this.router.navigate(['/'])
  }

  async logout() {
    localStorage.removeItem(this.userStringKey)
    location.reload()
  }
}
