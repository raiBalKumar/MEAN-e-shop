import { DataService } from './../data.service';
import { RestApiService } from './../rest-api.service';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;

  constructor(private activatedRoute: ActivatedRoute,
              private data: DataService,
              private rest: RestApiService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.rest.get(`http://localhost:3030/api/product/${res['id']}`)
          .then(data => {
            data['success']
              ? (this.product = data['product'])
              : this.router.navigate(['/']);
          })
          .catch(err => this.data.error(err['message']));
    });
  }

}
