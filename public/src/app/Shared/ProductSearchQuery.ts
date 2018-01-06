export class ProductSearchQuery {
    public searchText: String;
    public description: String;
    public minPrice: Number;
    public maxPrice: Number;   
    public rangePrices: Number[]; 
    public options : any;
    constructor(
        public isInStock: Boolean,
        public isActive: Boolean,
        public isBestSeller: Boolean,
    ) { 
        this.options = {};
    }
}
