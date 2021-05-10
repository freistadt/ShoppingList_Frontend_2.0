import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-testcomponent-connection-spring-boot',
  templateUrl: './testcomponent-connection-spring-boot.component.html',
  styleUrls: ['./testcomponent-connection-spring-boot.component.css']
})
export class TestcomponentConnectionSpringBootComponent implements OnInit {
  lastname: string;
  firstname: string;

  constructor(private client: HttpClient) {
  }


  ngOnInit(): void {

    this.client.get('http://localhost:8093/test').subscribe(data => {
      this.firstname = data[0]['firstname'];
      this.lastname = data[0]['lastName'];
      console.log(data);
    });
  }

}
