import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Stock } from './shared/stock.model';
import { StockService } from './shared/stock.service';
import { SaveService } from './shared/save.service';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'portfolio',
  styleUrls: ['portfolio.css'],
  templateUrl: 'portfolio.html',
})
export class TableSortingExample implements OnInit {
  displayedColumns: string[] = ['symbol', 'price', 'size', 'time', 'delete'];
  dataSource: MatTableDataSource<Stock> = new MatTableDataSource([]);
  searchStockSymbol: string = '';
  stocks: Stock[] = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private stockService: StockService, private saveService: SaveService) {}

  ngOnInit() {
    this.stockService.getStocks(this.saveService.getSavedStockSymbols()).subscribe((data: Array<any>) => {
      this.appendData(data);
    }, err => console.log(err));
  }

  appendData(data: Array<any>) {
    data.forEach((elem: any) => {
      const found = this.stocks.find(stock => stock.symbol === elem.symbol);
      if (found)
        console.log('already exists');
      else
        this.stocks.push(new Stock(elem));
    });
    this.updateTable();
    this.updateDatabase();
  }

  updateTable() {
    this.dataSource = new MatTableDataSource(this.stocks);
    this.dataSource.sort = this.sort;
  }

  updateDatabase() {
    this.saveService.saveStockSymbols(this.stocks.map((stock: Stock) => stock.symbol));
  }

  onSearch() {
    if (this.searchStockSymbol.length === 0) return;

    const symbols = this.searchStockSymbol.split(/[,.\s]/);

    this.stockService.getStocks(symbols).subscribe((data: Array<any>) => {
      this.appendData(data);
    }, err => console.log(err));
  }

  onDelete(symbol: string) {
    this.stocks = this.stocks.filter((stock: Stock) => stock.symbol !== symbol);
    this.updateTable();
    this.updateDatabase();
  }
}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */