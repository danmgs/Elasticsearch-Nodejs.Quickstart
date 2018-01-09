import { Component, OnInit } from '@angular/core';

import { ProductService } from './services/product.service';
import { Product } from './Shared/Product';
import { ProductSearchQuery } from './Shared/ProductSearchQuery';
import { ProductServiceConfig } from './Shared/ProductServiceConfig';
import { ProductServiceStatsConfig } from './Shared/ProductServiceStatsConfig';
import { EnumSearchOptions } from './Shared/EnumSearchOptions';
import { reject } from 'q';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  productServiceConfigResponse: ProductServiceConfig;
  priceStatsResponse: ProductServiceStatsConfig;

  q: ProductSearchQuery;
  productResponse: Product[] = [];

  sliderMinPrice: number;
  sliderMaxPrice: number;
  sliderFromPrice: number;
  sliderToPrice: number;
  wasClicked = false;

  serverHealthResponse: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.q = new ProductSearchQuery(true, false, false);
    this.q.searchText = 'big loster';
    this.q.options = EnumSearchOptions.isSearchNone;

    this.checkServerStatus();
    this.getConfig();

    this.sliderMinPrice = 0;
    this.sliderMaxPrice = 1000;
    this.sliderFromPrice = 0;
    this.sliderToPrice = 1000;

    this.initSliderPriceRange();
  }

  checkServerStatus() {
    this.productService.checkServerStatus()
      .subscribe(
      (response: Product[]) => {
        console.log('serverHealthResponse =', response);
        this.serverHealthResponse = response;
      },
      (error) => console.log(error)
      );
  }

  getConfig() {
    this.productService.getConfig()
      .subscribe(
      (response: ProductServiceConfig) => {
        this.productServiceConfigResponse = response;
      }
      );
  }

  initSliderPriceRange() {
    return this.productService.getStatsConfig('price')
      .subscribe(
      (response: ProductServiceStatsConfig) => {
        this.priceStatsResponse = response;
        this.updateSliderConfig(response.stats.aggregations.agg_stats_price.max);
      });
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

  myOnFinish(e) {
    this.q.rangePrices = [ e.from, e.to ];
  }

  onAdvSearchClick() {
      this.wasClicked = !this.wasClicked;
      console.log('click');
  }

  updateSliderConfig(allProductMaxPrice: number) {
    this.sliderMaxPrice = allProductMaxPrice < 100 ? allProductMaxPrice : 100;
    this.sliderToPrice = this.sliderMaxPrice * 0.9;
    this.sliderFromPrice = this.sliderMaxPrice * 0.1;
  }
}
