import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(private http: HttpClient) { }

  searchGifs(query: string): Observable<any> {
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=5c8VDYIOugIRfbo9AdvvguKeTJf9qSFL&q=${query}&limit=25&offset=0&rating=g&lang=en`) 
      .pipe(
        map(res => res['data']),
        map(res => res.map(gif => {
          return {
            id: gif.id,
            title: gif.title,
            url: gif.images.orginial.url,
          }
        }))
      )
  }
}