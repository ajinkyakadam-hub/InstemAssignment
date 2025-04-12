import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}
  
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:3000/movies').pipe(
      catchError(error => {
        console.error('API error:', error);
        return throwError(() => new Error('Failed to load movies.'));
      })
    );
  }

  getMovie(title: string): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:3000/movies?Title=${encodeURIComponent(title)}`);
  }
}