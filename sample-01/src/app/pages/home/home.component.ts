import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  nick: any;
  profileJson: string = null;
  back: string;

  constructor(public auth: AuthService, private client: HttpClient) {}

  ngOnInit(): void {
    this.nick = this.auth.user$.subscribe((profile) => (this.profileJson = JSON.stringify(profile, null, 2)));
  }
  sendLoggedUser(user: string) {
      this.client.get('http://localhost:8093/getTestString?name=Test').subscribe(data => {
      this.back = data[0];
    });
  }
}
