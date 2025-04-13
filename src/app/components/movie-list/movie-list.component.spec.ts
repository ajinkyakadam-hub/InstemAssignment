import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.model';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockMovies: Movie[] = [
    {
      "Title": "Hamlet",
      "Year": 1996,
      "Directors": "Kenneth Branagh",
      "Release Date": "1996-12-25T00:00:00Z",
      "Rating": 7.7,
      "Genres": "Crime, Drama, Romance, Thriller",
      "Image URL": "https://ia.media-imdb.com/images/M/MV5BMjA4OTM4NzMxOF5BMl5BanBnXkFtZTcwMDY1OTM2MQ@@._V1_SX400_.jpg",
      "Plot": "Hamlet, Prince of Denmark, returns home to find his father murdered and his mother remarrying the murderer, his uncle. Meanwhile, war is brewing.",
      "Rank": 2702,
      "Running Time (secs)": 14520,
      "Actors": "Kenneth Branagh, Julie Christie, Derek Jacobi"
  },
  {
      "Title": "Once Upon a Time in America",
      "Year": 1984,
      "Directors": "Sergio Leone",
      "Release Date": "1984-02-17T00:00:00Z",
      "Rating": 8.4,
      "Genres": "Crime, Drama",
      "Image URL": "https://ia.media-imdb.com/images/M/MV5BNDMwMDcyODkzOV5BMl5BanBnXkFtZTcwNTQ1Njg3OA@@._V1_SX400_.jpg",
      "Plot": "A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.",
      "Rank": 857,
      "Running Time (secs)": 13740,
      "Actors": "Robert De Niro, James Woods, Elizabeth McGovern"
  }
  ];

  beforeEach(() => {
    mockMovieService = jasmine.createSpyObj('MovieService', ['getMovies']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to movie detail on goToDetail', () => {
    const title = 'Hamlet';
    component.goToDetail(title);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movie', title]);
  });

  it('should return correct rating class', () => {
    expect(component.getRatingClass(5.5)).toBe('red');
    expect(component.getRatingClass(6.5)).toBe('orange');
    expect(component.getRatingClass(7.5)).toBe('green');
    expect(component.getRatingClass(8.5)).toBe('blue');
    expect(component.getRatingClass(9.2)).toBe('purple');
  });

  it('should return correct border class from rating', () => {
    expect(component.getBorderColorClass(8.2)).toBe('border-blue');
  });
});
