export class Product {
    constructor(
        public name: String,
        public description: String,
        public price: Number,
        public inStock: Number,
        public sold: Number,
        public active: Boolean,
        public highlight: any,
      ) { }
  }
  