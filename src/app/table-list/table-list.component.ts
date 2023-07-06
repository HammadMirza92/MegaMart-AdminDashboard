import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'app/services/products/products.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  productData: any;
  filteredData: any[];
  currentPage: number = 1;
  itemsPerPage: number = 10;


  constructor(private productService: ProductsService) {
    this.productService.fetchProducts().subscribe(
      (data) => {
        this.productData = data;
        this.filteredData = [...this.productData];
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  ngOnInit() {}

  search(value: string) {
    if (this.productData) {
      this.filteredData = this.productData.filter(item => {
        if(item.productName && item.productName.toLowerCase().includes(value.toLowerCase())){
          return item.productName && item.productName.toLowerCase().includes(value.toLowerCase());
        }else{
          return item.id && item.id.toLowerCase().includes(value.toLowerCase());
        }    
      });
    } else {
      this.filteredData = [];
    }
    this.currentPage = 1;
  }
  

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }
}
