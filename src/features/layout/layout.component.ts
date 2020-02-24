import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { User } from '@app/features/login/models/user';
import { LoginService } from '@app/features/login/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private authService: LoginService) {}

  public ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
