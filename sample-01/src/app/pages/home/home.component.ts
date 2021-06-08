import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {ToastrModule, ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  nick: any;
  profileJson: string = null;
  back: any;
  public list: any;
  public listFood: any;
  map: Map<string, any> = new Map<string, any>();
  currentList: string;

  posteId: boolean;

  // TODO write function to get Value from map with key
  foodInCategory(test: any) {
    for (const key of this.listFood.keys()) {
      const value = this.listFood[key];
      // Use `key` and `value`
    }
  }

  constructor(public auth: AuthService, private client: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.nick = this.auth.user$.subscribe((profile) => (this.profileJson = JSON.stringify(profile, null, 2)));
  }
  sendLoggedUser(user: string) {
    let params = new HttpParams();
    params = params.set('userName', user.toString());
    this.client.get('http://localhost:8093/getShoppingLists', {params}).subscribe(data => {
      this.back = data;
    });
  }

  public getPersonsList(): any{
    this.client.get('http://localhost:8093/getTestString?name=Test').subscribe( data => {
      this.list = data;
    });
  }

  public getList(user: string, shoppingList: string): any {
    let params = new HttpParams();
    params = params.set('userName', user.toString());
    params = params.set('listName', shoppingList);
    this.currentList = shoppingList;

    return this.client.get('http://localhost:8093/getList', {params}).subscribe(data => {
      this.listFood = data;
      this.map = new Map(Object.entries(data));
      // console.log(this.map);
    });
  }

  // TODO würde hier nicht Liste wählen lassen sondern die aufgemachte Liste mitgeben
  public getValFood(item, foodList: HTMLInputElement): any {
    let body = new HttpParams();
    body = body.set('food', item.value);
    body = body.set('name', this.currentList);
    this.client.post('http://localhost:8093/addFood', body).toPromise().then((data: any) => {
      this.toastr.success('Erfolgreich eingefügt', 'Success');
    });
  }
  showToatr() {
    this.toastr.success('Erfolgreich eingefügt', 'Success');
  }
  public getValShoppingList(item, user: string): any {
    let body = new HttpParams();
    body = body.set('listName', item.value);
    body = body.set('userName', user.toString());

    alert('Creating new Shopping List ' + item.value + ' for user ' + user.toString());
    this.client.post('http://localhost:8093/addShoppingList', body).toPromise().then((data: any) => {
      this.toastr.success('Erfolgreich eingefügt', 'Success');
    });
  }


}
