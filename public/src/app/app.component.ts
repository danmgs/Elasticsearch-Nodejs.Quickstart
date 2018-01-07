import { Component, OnInit } from '@angular/core';

import { ProductService } from './services/product.service';
import { Product } from './Shared/Product';
import { ProductSearchQuery } from './Shared/ProductSearchQuery';
import { ProductServiceConfig } from './Shared/ProductServiceConfig';

import { EnumSearchOptions } from './Shared/EnumSearchOptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  productServiceConfigResponse: ProductServiceConfig;

  q: ProductSearchQuery;
  productResponse: Product[] = [];

  sliderRangeconfig: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.q = new ProductSearchQuery(true, false, false);
    this.q.searchText = 'lobster';
    this.q.rangePrices = [0, 500];
    // this.q.options.isFuzzySearch = false;
    // this.q.options.isExactMatchSearch = false;
    // this.q.options.isProximitySearch = false;

    this.q.options = EnumSearchOptions.isSearchNone;
    
    this.sliderRangeconfig = {
      behaviour: 'drag',
      connect: true,
      margin: 1,
      range: {
        min: 0,
        max: 1000
      },
      pips: {
        mode: 'steps',
        density: 5
      }
    };

    this.getConfig();
  }

  getConfig() {
    this.productService.getConfig()
      .subscribe(
      (response: ProductServiceConfig) => {
        this.productServiceConfigResponse = response;
      }
      );
  }

  search() {
    console.log('this.q', JSON.stringify(this.q, undefined, 2));
    this.productService.search(this.q)
      .subscribe(
      (response: Product[]) => {
        console.log('response =', response);
        this.productResponse = response;
      },
      (error) => console.log(error)
      );
  }
}
