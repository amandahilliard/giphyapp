import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiphyComponent } from './giphy/giphy.component';

const routes: Routes = [
  {path: 'search', component: GiphyComponent},
  {path: '**', redirectTo: './search'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
