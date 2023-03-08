import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies!: any[];
  query!: string;
  pages!: number;
  morePages!: boolean;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.movieService.getMovies(params.query).subscribe((response: any) => {
        this.movies = response;
        this.query = params.query;
        this.morePages = response.length == 20 ? true : false;
      });
    });

    this.pages = 1;
  }

  loadMore() {
    this.movieService.getMovies(this.query, ++this.pages).subscribe((response: any) => {
      this.movies = this.movies.concat(response);
      if(response.length < 20) 
        this.morePages = false;
    });
  }

}
