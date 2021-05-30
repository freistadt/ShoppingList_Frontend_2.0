import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  nick: any;
  profileJson: string = null;
  back: string;
  public list: any;
  posteId: boolean;

  postData = {
    test: 'test',
  };

  url = 'http://localhost:8093/addFood';

  constructor(public auth: AuthService, private client: HttpClient) {}

  ngOnInit(): void {
    this.nick = this.auth.user$.subscribe((profile) => (this.profileJson = JSON.stringify(profile, null, 2)));
  }
  sendLoggedUser(user: string) {
      this.client.get('http://localhost:8093/getTestString?name=Test').subscribe(data => {
      this.back = data[0][3];
    });
  }
  public getPersonsList(): any{
    this.client.get('http://localhost:8093/getTestString?name=Test').subscribe( data => {
      this.list = data;
    });
  }

  // Test delte maybe
  public getList(): any {
    return this.client.get('http://localhost:8093/getList?name=Onioin').subscribe(data => {
      this.list = data;
    });
  }


    /*
        this.client.post<any>('http://localhost:8093/addFood', { name: 'Onion', food: 'Test' }).subscribe(data => {
      this.posteId = data;
    });
        console.log('There was an error!');
    return this.client.post<any>('http://localhost:8093/getList?name=Onioin&food=Test').subscribe(data => {
      this.posteId = data;
    });

     this.client.post('http://localhost:8093/getList', {body}).subscribe(data => {
        alert('ok');
    });
  }
  */

  public postTest(): any{
    let body = new HttpParams();
    body = body.set('food', 'Test');
    body = body.set('name', 'Onioin');

    console.log(body.toString());
    this.client.post(this.url, body).toPromise().then((data: any) => {
      console.log(data);
    });
  }

}
