import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  buttonName:String ="Add"
  bookId:any
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { 
    this.bookForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }
  ngOnInit() {
     this.bookId = this.route.snapshot.paramMap.get('id');
    console.log(this.bookId);
    if(this.bookId){
      this.buttonName="Edit"
      
      // this.formBuilder.group({
      //   name: [''],
      //   price: [''],
      //   description: ['']
      // })
    }
   }
  onSubmit(): any {
    if(this.bookId){
      this.crudService.updateBook(this.bookId,this.bookForm.value).subscribe(() => {
        console.log('Data Updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('books/book-list'))
      }, (err) => {
        console.log(err);
    });
    }
    else{
    this.crudService.AddBook(this.bookForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('books/book-list'))
      }, (err) => {
        console.log(err);
    });
  }
  }
}

