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
    if(this.bookId){
      this.buttonName="Edit"
      this.crudService.GetBook(this.bookId).subscribe(res => {
        this.bookForm.setValue({
          name: res['name'],
          price: res['price'],
          description: res['description']
        });
      });
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

