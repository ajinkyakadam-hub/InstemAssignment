import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;

  const mockMovie: Movie = {
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
}

  beforeEach(() => {
    mockMovieService = jasmine.createSpyObj('MovieService', ['getMovie']);

    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'Hamlet' } }
          }
        },
        {
          provide: MovieService,
          useValue: mockMovieService
        }
      ]
    });

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie by title from route', () => {
    mockMovieService.getMovie.and.returnValue(of(mockMovie)); 

    fixture.detectChanges(); // triggers ngOnInit()

    expect(mockMovieService.getMovie).toHaveBeenCalledWith('Hamlet');
    expect(component.movie?.Title).toBe('Hamlet');
  });
});