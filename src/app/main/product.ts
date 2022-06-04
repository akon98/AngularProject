export interface ProductInterface {
    name: string;
    price: number;
    url: string;
}
export class Product implements ProductInterface {
    name: string;
    price: number;
    url: string;
    constructor(name: string, price: number, url: string) {
        this.name = name;
        this.price = price;
        this.url = url;
    }
}