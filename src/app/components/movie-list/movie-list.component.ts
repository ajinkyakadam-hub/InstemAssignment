import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = '';

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data.sort((a, b) => b.Year - a.Year);
      this.filteredMovies = this.movies;
    });
  }

  searchMovies(): void {
    debugger
    const term = this.searchTerm.toLowerCase();
    this.filteredMovies = this.movies.filter(movie =>
      movie.Title.toString().toLowerCase().includes(term)
    );
  }

  goToDetail(title: string): void {
    this.router.navigate(['/movie', title]);
  }

  getRatingClass(rating: number): string {
    if (rating < 6) return 'red';
    if (rating < 7) return 'orange';
    if (rating < 8) return 'green';
    if (rating < 9) return 'blue';
    return 'purple';
  }
  
  getBorderColorClass(rating: number): string {
    return `border-${this.getRatingClass(rating)}`;
  }
  
}

