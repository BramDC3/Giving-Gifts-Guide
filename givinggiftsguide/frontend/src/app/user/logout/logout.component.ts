import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private mobile: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.logout();

    if (window.screen.width === 360) {
      this.mobile = true;
    }
  }

}
