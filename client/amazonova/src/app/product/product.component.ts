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

  myReview = {
    title: '',
    description: '',
    rating: 0
  };

  btnDisabled = false;

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

  async postReview(){
    this.btnDisabled = true;
    try {
          const data = await this.rest.post('http://localhost:3030/api/review',
        {
          productId: this.product._id,
          title:  this.myReview.title,
          description: this.myReview.description,
          rating: this.myReview.rating
        });
        data['success']
          ? this.data.success(data['message'])
          : this.data.error(data['message']);
    } catch(err){
      this.data.error(err['message']);
    }
    this.btnDisabled = false;
  }

}
