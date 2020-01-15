import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor() { }

  public getSavedStockSymbols() {
    const symbols = localStorage.getItem("stock_symbols");
    if (symbols === null)
      return [];
    return JSON.parse(symbols);
  }
  
  public saveStockSymbols(symbols: string[]) {
    localStorage.setItem("stock_symbols", JSON.stringify(symbols));
  }
}
