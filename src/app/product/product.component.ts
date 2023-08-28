import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'app/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productData: any;
  categoryData: any;
  selectedCategory:any;
  selectedCatName:string="Electronics";
  filteredData: any[];
  currentPage: number = 1;
  itemsPerPage: number = 10;


  constructor(private productService: ProductsService) {
    
  }

  ngOnInit() {
    this.getCatgeory();
    this.getProduct();

   
  }


  search(value: string) {
    if (this.productData) {
      this.filteredData = this.selectedCategory.products.filter(item => {
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

  getProduct(){
    this.productService.fetchProducts().subscribe(
      (data) => {
        this.productData = data;
       // 
        console.log("product data is ",this.productData)
        
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  getCatgeory(){
    this.productService.fetchCategory().subscribe(
      (data) => {
        this.categoryData = data;
        console.log("category data is ",this.categoryData);
        console.log("asdasdasda data is ",this.categoryData[0].products);

        this.filteredData = [...this.categoryData[0].products];
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  selectCategory(data:any){
    this.selectedCategory = data;

    this.filteredData = [...this.selectedCategory.products];
    
  }
  
}
