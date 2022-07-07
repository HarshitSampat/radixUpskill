import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup'
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  Books:any = [];
  errormsg:any
  constructor(private crudService: CrudService, private router : Router , private toast :NgToastService) { }
  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      this.Books =res;
    },(error)=>{
      if(error){
        alert("Something went Wrong "+error.statusText)
        this.toast.error({detail:"Fail" ,summary:error.message,duration :5000})
      this.errormsg=error
      console.log(error)
    }
    });    
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
    this.router.navigate(['/books/add-book', { id: data}]);
  }
  
  

}
