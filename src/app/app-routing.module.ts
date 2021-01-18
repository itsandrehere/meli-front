import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListResultComponent } from './list-result/list-result.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: 'items', component: ListResultComponent, },
  { path: 'items/:id', component: DetailComponent },
  { path: '',
    redirectTo: '/items',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
