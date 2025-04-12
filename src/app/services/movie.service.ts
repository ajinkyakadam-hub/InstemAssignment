import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:3000/movies');
  }

  getMovie(title: string): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:3000/movies?Title=${encodeURIComponent(title)}`);
  }
}