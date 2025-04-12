import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Movie } from '../models/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

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
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies', () => {
    service.getMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('http://localhost:3000/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should handle errors on getMovies', () => {
    service.getMovies().subscribe({
      next: () => fail('should have failed with error'),
      error: err => {
        expect(err.message).toBe('Failed to load movies.');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/movies');
    req.flush('Error loading movies', { status: 500, statusText: 'Server Error' });
  });
});