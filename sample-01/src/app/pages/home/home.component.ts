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
  public listFood: any;
  posteId: boolean;

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

  public getList(user: string): any {
    let params = new HttpParams();
    params = params.set('userName', user.toString());
    params = params.set('listName', 'Garlic2');

    return this.client.get('http://localhost:8093/getList', {params}).subscribe(data => {
      this.listFood = data;
    });
  }

  public getValFood(item): any {
    let body = new HttpParams();
    body = body.set('food', item.value);
    body = body.set('name', 'Onioin');

    alert('Send item ' + item.value + ' to shopping list');
    console.log(body.toString());
    this.client.post('http://localhost:8093/addFood', body).toPromise().then((data: any) => {
      console.log(data);
    });
  }

  public getValShoppingList(item, user: string): any {
    let body = new HttpParams();
    body = body.set('listName', item.value);
    body = body.set('userName', user.toString());

    alert('Creating new Shopping List ' + item.value + ' user:' );
    console.log(body.toString());
    this.client.post('http://localhost:8093/addShoppingList', body).toPromise().then((data: any) => {
      console.log(data);
    });
  }

}
