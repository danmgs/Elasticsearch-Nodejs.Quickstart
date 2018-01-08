export class Product {
    constructor(
        public name: String,
        public description: String,
        public price: number,
        public inStock: number,
        public sold: number,
        public active: Boolean,
        public highlight: any,
      ) { }
  }
  