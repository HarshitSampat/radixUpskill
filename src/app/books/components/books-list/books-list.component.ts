import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  Books:any = [];
  constructor(private crudService: CrudService, private router : Router) { }
  ngOnInit(): void {
    // this.crudService.GetBooks().subscribe(res => {
    //   console.log(res)
    //   this.Books =res;
    // });    
  }
  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      })
    }
  }

  editBook(data:any) {
    // const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['/books/add-book', { id: data}]);
  }
  
  

}
