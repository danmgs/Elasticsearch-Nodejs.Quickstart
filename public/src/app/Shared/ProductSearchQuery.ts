export class ProductSearchQuery {
    public searchText: String;
    public description: String;  
    public rangePrices: number[]; 
    public options : any;
    constructor(
        public isInStock: Boolean,
        public isActive: Boolean,
        public isBestSeller: Boolean,
    ) { 
        this.options = {};
    }
}
