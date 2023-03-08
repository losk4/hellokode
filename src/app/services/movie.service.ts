import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  private readonly API_KEY = "22ff991962592b38a6f4c9f05d748c3e";
  private readonly API_URL = "https://api.themoviedb.org/3"

  getMovies(query: string, page: number = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'es-ES')
      .set('query', query)
      .set('page', page);

    return this.http.get(`${this.API_URL}/search/movie`, { params })
      .pipe(map((data: any) => {
        data.results = data.results.map((element: any) => {
          return {
            id: element.id,
            title: element.title
          }
        });
        return data.results;
      }));
  }

  getMovieById(id: number) {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'es-ES');
      
      return this.http.get(`${this.API_URL}/movie/${id}`, { params })
        .pipe(map((data:any) => {
          data['poster_path'] = data['poster_path'] ? 
          `https://image.tmdb.org/t/p/w300${data['poster_path']}` : `https://place-hold.it/300x500`;
          data['backdrop_path'] = data['backdrop_path'] ? 
          `https://image.tmdb.org/t/p/original${data['backdrop_path']}` : `https://place-hold.it/900x600`
          return {
            id: data['id'],
            title: data['title'],
            release_date: data['release_date'],
            original_language: data['original_language'],
            overview: data['overview'],
            poster_path: data['poster_path'],
            backdrop_path: data['backdrop_path']
          }
        }));
  }

}
