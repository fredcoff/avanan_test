import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  API_URL: string = `https://api.iextrading.com/1.0/tops/last?symbols=`;
  constructor(private http: HttpClient) { }

  public getStocks(symbols: string[]) {
    return this.http.get(`${this.API_URL}${symbols.join(',')}`);
  }
}
