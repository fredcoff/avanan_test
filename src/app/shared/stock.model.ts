import * as moment from 'moment';

export class Stock {
    symbol: string;
    price: number;
    size: number;
    time: string;

    constructor(obj: any) {
        this.symbol = obj.symbol;
        this.price = obj.price;
        this.size = obj.size;
        this.time = moment(obj.time).utc().format("MM/DD/YYYY HH/mm/ss");
    }
}
