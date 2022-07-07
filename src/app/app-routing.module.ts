import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router'; // import premodule
import { GuardGuard } from './service/guard.guard';
import { PreloadService } from './service/preload.service';
const routes: Routes = [
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((m) => m.BooksModule),
      data:{preload:false},
      canLoad:[GuardGuard]
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
      data:{preload:true}
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadService }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
