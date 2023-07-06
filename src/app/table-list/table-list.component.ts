import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'app/services/products/products.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  productData:any;

  tableData: any[]; // This will hold your table data
  filteredData: any[]; // This will hold the filtered data
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Number of items to show per page


  constructor(private productService:ProductsService) {

    this.productService.fetchProducts().subscribe(
      (data) => {
        this.productData = data;
        console.log("product data is ",data);
        this.filteredData = [...this.productData];
      },
      (error) => {
        // Handle the error here
        console.error('An error occurred:', error);
        // this._snackBar.open('An error occurred while fetching the data. Please try again later.' , 'Dismiss', {
        //   horizontalPosition: end,
        //   duration: 1500,
        // });
      }
    );
    
   }

  ngOnInit() {
    // this.tableData = [
    //   { id: 1, name: 'John Doe' },
    //   { id: 2, name: 'Jane Smith' },
    //   { id: 3, name: 'Jane Smith' },
    //   { id: 4, name: 'Jane Smith' },
    //   { id: 5, name: 'Jane Smith' },
    //   { id: 6, name: 'Jane Smith' },
    //   { id: 7, name: 'Jane Smith' },
    //   { id: 8, name: 'Jane Smith' },
    //   { id: 9, name: 'Jane Smith' },
    //   { id: 10, name: 'Jane Smith' },
    //   { id: 11, name: 'Jane Smith' },
    //   { id: 12, name: 'Jane Smith' },
    //   { id: 13, name: 'Jane Smith' },
    //   { id: 14, name: 'Jane Smith' },
    //   { id: 15, name: 'Jane Smith' },
    //   { id: 16, name: 'Jane Smith' },
    //   { id: 17, name: 'Jane Smith' },
    //   { id: 18, name: 'Jane Smith' },
    //   { id: 19, name: 'Jane Smith' },
    //   { id: 20, name: 'Jane Smith' },
    //   { id: 21, name: 'Jane Smith' },
    //   { id: 22, name: 'Jane Smith' },
    //   { id: 23, name: 'Jane Smith' },
    //   // Add more data as needed
    // ];

    // this.filteredData = [...this.tableData];
  }
  search(value: string) {
    this.filteredData = this.productData.filter(item => {
      // Perform search filtering based on your criteria
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    this.currentPage = 1; // Reset to the first page after search
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }
}
