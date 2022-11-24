import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() withAddButton = false
  @Input() withBackButton = false
  @Input() backUrl = '/'

  constructor(
    public authSrv: AuthService
  ) { }

  ngOnInit(): void {
  }

}
