import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  private readonly API_KEY = "22ff991962592b38a6f4c9f05d748c3e";

  getMovies(query: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'es-ES')
      .set('query', query)
      .set('page', page);

    return this.http.get(`https://api.themoviedb.org/3/search/movie`, { params })
      .pipe(map((data: any) => {
        data.results = data.results.map((element: any) => {
          element.poster_path = element.poster_path ?
            `https://image.tmdb.org/t/p/w300${element.poster_path}` : `https://place-hold.it/300x500`;
          element.backdrop_path = element.backdrop_path ?
            `https://image.tmdb.org/t/p/original${element.backdrop_path}` : `https://place-hold.it/900x600`
          return element;
        });
        return data.results;
      }));
  }

  getMovieById(id: number) {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'es-ES');
      
      return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, { params })
        .pipe(map((data:any) => {
          data['poster_path'] = data['poster_path'] ? 
          `https://image.tmdb.org/t/p/w300${data['poster_path']}` : `https://place-hold.it/300x500`;
          data['backdrop_path'] = data['backdrop_path'] ? 
          `https://image.tmdb.org/t/p/original${data['backdrop_path']}` : `https://place-hold.it/900x600`
          return data;
        }));
  }

}
