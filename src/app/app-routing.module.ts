import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren:()=>
     import('./components/movie-list/movie-list.module').then(m=>m.MovieListModule) 
  },
  { path: 'movie/:title', loadChildren:()=> 
     import('./components/movie-details/movie-details.module').then(m=>m.MovieDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
