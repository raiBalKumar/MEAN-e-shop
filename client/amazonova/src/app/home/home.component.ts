import { RestApiService } from './../rest-api.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any;
  constructor(private data: DataService,
              private rest: RestApiService) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get('http://localhost:3030/api/products');
      data['success']
        ?  (this.products = data['products'])
        :   this.data.error('Could not find products.');
    } catch(err){
      this.data.error(err['message']);
    }
  }

}
